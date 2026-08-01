import type { Backend, BackendProgram } from '../../../Backend';

export class ProgramManager {

	private backend: Backend;
	private pool: Map<string, BackendProgram>;

	constructor( backend: Backend ) {

		this.backend = backend;
		this.pool = new Map();

	}

	public get( vertexShader: string, fragmentShader: string, name?: string ) {

		const id = vertexShader + fragmentShader;

		const programCache = this.pool.get( id );

		if ( programCache !== undefined && programCache.program ) {

			return programCache;

		}

		const program = this.backend.createProgram();

		if ( name ) program.name = name;

		program.setShader( vertexShader, fragmentShader );

		this.pool.set( id, program );

		return program;

	}

}
