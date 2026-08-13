import type { EngineContract } from '../../core/Contracts/EngineContract';
import type { GLTF, GLTFLoaderContract } from '../../core/Contracts/GLTFLoaderContract';

// glbのジオメトリはバックエンドのMaterialが無いと組み立てられないため、
// headlessでは空のシーンだけ返してBLidgeの読み込みを成立させる
export class GLTFLoader implements GLTFLoaderContract {

	private _engine: EngineContract;

	constructor( engine: EngineContract ) {

		this._engine = engine;

	}

	public load(): Promise<GLTF> {

		return Promise.resolve( { scene: this._engine.createEntity( { name: "gltf" } ) } );

	}

}
