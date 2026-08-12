import type { GLBackend } from '../../../backend/GLBackend';
import type * as GLP from 'glpower';

export class ProgramManager {

	private backend: GLBackend;
	private pool: Map<string, GLP.GLPowerProgram>;

	constructor( backend: GLBackend ) {

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
