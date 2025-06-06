export class RenderQueryManager {

	private gl: WebGL2RenderingContext;
	private _extDisJointTimerQuery: any;
	private _queryList: WebGLQuery[];
	private _queryListQueued: {name: string, query: WebGLQuery}[];

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this._extDisJointTimerQuery = this.gl.getExtension( "EXT_disjoint_timer_query_webgl2" );

		if ( !this._extDisJointTimerQuery ) {
			console.warn("[RenderQueryManager] EXT_disjoint_timer_query_webgl2 extension is not supported. GPU timing features will be disabled.");
		}

		this._queryList = [];
		this._queryListQueued = [];

	}

	public get supported() {

		return !!this._extDisJointTimerQuery;

	}

	public checkAndProcessQueries() {

		if ( !import.meta.env.DEV || !this._extDisJointTimerQuery ) return [];

		const disjoint = this.gl.getParameter( this._extDisJointTimerQuery.GPU_DISJOINT_EXT );

		if ( disjoint ) {

			this._queryList.forEach( q => this.gl.deleteQuery( q ) );
			this._queryList.length = 0;
			return [];

		} else {

			const updatedList = [];

			if ( this._queryListQueued.length > 0 ) {

				const l = this._queryListQueued.length;

				for ( let i = l - 1; i >= 0; i -- ) {

					const q = this._queryListQueued[ i ];

					const resultAvailable = this.gl.getQueryParameter( q.query, this.gl.QUERY_RESULT_AVAILABLE );

					if ( resultAvailable ) {

						const result = this.gl.getQueryParameter( q.query, this.gl.QUERY_RESULT );

						updatedList.push( {
							name: q.name,
							duration: result / 1000 / 1000
						} );

						this._queryList.push( q.query );

						this._queryListQueued.splice( i, 1 );

					}

				}

			}

			return updatedList;

		}

	}

	public beginQuery(): WebGLQuery | null {

		if ( !import.meta.env.DEV || !this._extDisJointTimerQuery ) return null;

		let query = this._queryList.pop() || null;

		if ( query == null ) {

			query = this.gl.createQuery();

		}

		if ( query ) {

			this.gl.beginQuery( this._extDisJointTimerQuery.TIME_ELAPSED_EXT, query );

		}

		return query;

	}

	public endQuery( query: WebGLQuery | null, name: string ) {

		if ( !import.meta.env.DEV || !this._extDisJointTimerQuery || !query ) return;

		this.gl.endQuery( this._extDisJointTimerQuery.TIME_ELAPSED_EXT );

		this._queryListQueued.push( {
			name: name,
			query: query
		} );

	}

}
