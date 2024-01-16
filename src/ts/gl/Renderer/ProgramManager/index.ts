import * as GLP from 'glpower';

export class ProgramManager {

	private gl: WebGL2RenderingContext;
	private pool: Map<string, GLP.GLPowerProgram>;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this.pool = new Map();

	}

	public get( vertexShader: string, fragmentShader: string ) {

		const id = vertexShader + fragmentShader;

		const programCache = this.pool.get( id );

		if ( programCache !== undefined && programCache.program ) {

			return programCache;

		}

		const program = new GLP.GLPowerProgram( this.gl );

		program.setShader( vertexShader, fragmentShader );

		this.pool.set( id, program );

		return program;

	}


}
