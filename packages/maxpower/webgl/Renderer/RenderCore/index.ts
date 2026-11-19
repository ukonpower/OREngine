import * as BSP from 'basepower';
import * as GLP from 'glpower';
import * as MTP from 'mathpower';

import { Camera } from '../../../core/Components/Camera';
import { Light, LightType } from '../../../core/Components/Light';
import { MaterialOverride } from '../../../core/Components/MaterialOverride';
import { Mesh } from '../../../core/Components/Mesh';
import { Entity, EntityUpdateEvent } from '../../../core/Entity';
import { PlaneGeometry } from '../../../core/Geometries/PlaneGeometry';
import { Geometry } from '../../../core/Geometry';
import { Serializable } from '../../../core/Serializable';
import { GL, GLBackend } from '../../backend/GLBackend';
import { shaderParse } from "../../backend/ShaderParser";
import { MaterialDrawPass, Material } from '../../Material';
import { PostProcess } from '../../PostProcess';
import { TexProcedural } from '../../TexProcedural';
import { ProgramManager } from '../ProgramManager';

import type { RenderViewContract } from '../../../core/Contracts/RenderViewContract';
import type { TexProceduralParam } from '../../../core/Contracts/TexProceduralContract';

// WebGL のレンダラー（Renderer・LiteRenderer）が継承する描画の土台。描画対象の振り分け・ライトの収集・1回分の描画（プログラム・uniform・VAO）を受け持つ。
// どのパスをどの順で描くか（deferred・後処理など）は持たず、継承したレンダラーが prepareScene / render で決める。
// deferred・後処理・環境マップに繋がるモジュールはここから import しない（LiteRenderer だけを使うバンドルに入れないため）

// render stack

export type RenderStack = {
	light: Entity[];
	envMap: Entity[];
	shadowMap: Entity[];
	deferred: Entity[];
	// forward のうち不透明のもの。透明のものは transparent に分ける
	forward: Entity[];
	transparent: Entity[];
	ui: Entity[];
}

// forwardPrepass で書く gBuffer のアタッチメント（位置・法線・速度）。frag_h.part.glsl の IS_PREPASS の出力位置と一致させる
const FORWARD_PREPASS_DRAW_BUFFERS = [ 0, 1, 4 ];

// forward の描画先（シーン色 / gBuffer の position / velocity）のうち色だけ
const FORWARD_COLOR_DRAW_BUFFERS = [ 0 ];

// light

// Lightはデータのみを持ち、シャドウマップのGPUリソースはレンダラーがLightごとにここで所有する
type LightInfo = {
	position: MTP.Vector;
	direction: MTP.Vector;
	color: MTP.Vector;
	renderTarget: GLP.GLPowerFrameBuffer | null;
	component: Light;
}

export type CollectedLights = {[K in LightType]: LightInfo[]}

// drawParam

export interface RenderOption {
	cameraOverride?: CameraParam,
	uniformOverride?: BSP.Uniforms,
	disableClear?: boolean,
}

export interface CameraParam {
	viewMatrix?: MTP.Matrix;
	viewMatrixPrev?: MTP.Matrix;
	projectionMatrix?: MTP.Matrix;
	projectionMatrixPrev?: MTP.Matrix;
	cameraMatrixWorld?: MTP.Matrix;
	cameraNear?: number,
	cameraFar?:number,
}

export interface DrawParam extends CameraParam {
	// DEV のタイマー計測（GLBackend の queryName）で描画を見分ける名前。player では入れない
	label?: string;
	modelMatrixWorld?: MTP.Matrix;
	modelMatrixWorldPrev?: MTP.Matrix;
	renderTarget?: GLP.GLPowerFrameBuffer | null;
	uniformOverride?: BSP.Uniforms,
}

// compile draw param

interface CompileDrawParam {
	drawId: string;
	renderType: MaterialDrawPass;
	geometry: Geometry;
	material: Material;
	param: DrawParam;
}

// Renderer所有のGeometry用GPUリソース。versionがGeometry.updateVersionと一致する間は再利用する
type GeometryBufferRecord = {
	buffers: Map<string, GLP.GLPowerBuffer>,
	version: number,
}

// VAO が今どの GPU バッファを指しているか。
// VAO は描画ごと（drawId × program）に1つで、Mesh.geometry を付け替えると別のジオメトリのバッファを指し直す必要がある。
// ジオメトリ側に「この VAO は結び付け済み」と持たせると、A → B → A と前のジオメトリへ戻したときに B を指したままになるため、VAO 側に持つ。
// record で比べるのは、reset() で record ごと作り直したとき（ジオメトリと版が同じでもバッファは新しい）にも結び付け直すため
type VaoBinding = {
	record: GeometryBufferRecord,
	version: number,
}

// default material

// mesh.materialはバックエンド不透明型なので、webgl側でMaterialへ絞る（未設定時は既定マテリアル）
const _defaultMaterial = new Material();

export const getMaterial = ( mesh: Mesh ) => ( mesh.material || _defaultMaterial ) as Material;

// texture unit

export let TextureUnitCounter = 0;

// clear color

const _clearColorWhite = new MTP.Vector( 1.0, 1.0, 1.0, 1.0 );
const _clearColorBlack = new MTP.Vector( 0.0, 0.0, 0.0, 1.0 );

// light uniform names
// draw毎の文字列連結を避けるため、ライトインデックスごとにuniform名をキャッシュする
// 名前は light.module.glsl の宣言と一致させる（WebGL は存在しない uniform への代入を黙って無視するので、食い違ってもエラーにならない）

const _dirLightNames: { [key: string]: string }[] = [];
const _spotLightNames: { [key: string]: string }[] = [];

const getDirLightNames = ( i: number ) => _dirLightNames[ i ] || ( _dirLightNames[ i ] = {
	direction: `directionalLight[${i}].direction`,
	color: `directionalLight[${i}].color`,
	camNear: `uDirectionalLightCamera[${i}].near`,
	camFar: `uDirectionalLightCamera[${i}].far`,
	camViewMatrix: `uDirectionalLightCamera[${i}].uViewMatrix`,
	camProjectionMatrix: `uDirectionalLightCamera[${i}].uProjectionMatrix`,
	camResolution: `uDirectionalLightCamera[${i}].resolution`,
	shadowMap: `directionalLightShadowMap[${i}]`,
} );

const getSpotLightNames = ( i: number ) => _spotLightNames[ i ] || ( _spotLightNames[ i ] = {
	position: `uSpotLight[${i}].position`,
	direction: `uSpotLight[${i}].direction`,
	color: `uSpotLight[${i}].color`,
	angle: `uSpotLight[${i}].angle`,
	blend: `uSpotLight[${i}].blend`,
	camNear: `uSpotLightCamera[${i}].near`,
	camFar: `uSpotLightCamera[${i}].far`,
	camViewMatrix: `uSpotLightCamera[${i}].uViewMatrix`,
	camProjectionMatrix: `uSpotLightCamera[${i}].uProjectionMatrix`,
	camResolution: `uSpotLightCamera[${i}].resolution`,
	shadowMap: `uSpotLightShadowMap[${i}]`,
} );

export abstract class RenderCore extends Serializable {

	public readonly backend: GLBackend;
	public readonly canvas: HTMLCanvasElement;
	public resolution: MTP.Vector;
	public programManager: ProgramManager;
	public globalUniforms: BSP.Uniforms;

	// geometry

	private _geometryBuffers: Map<Geometry, GeometryBufferRecord>;
	private _vaoBindings: WeakMap<GLP.GLPowerVAO, VaoBinding>;

	// lights

	protected _lights: CollectedLights;
	private _lightsUpdated: boolean;
	private _lightInfoCache: Map<Light, LightInfo>;

	// collectRenderStack が見つけた displayOut のカメラ

	protected _sceneCamera: Entity | null;

	// quad

	private _quad: Geometry;

	// compile

	private _isCorrentCompiles: boolean;
	private _compileDrawParams: CompileDrawParam[];

	// tmp

	private _tmpNormalMatrix: MTP.Matrix;
	private _tmpModelViewMatrix: MTP.Matrix;
	private _tmpViewMatrixInverseMatrix: MTP.Matrix;
	private _tmpLightDirection: MTP.Vector;
	private _tmpModelMatrixInverse: MTP.Matrix;
	private _tmpProjectionMatrixInverse: MTP.Matrix;
	private _tmpResolution: MTP.Vector;
	private _tmpResolutionUniform: BSP.Uniforms[string];
	private _tmpUniformOverride: BSP.Uniforms;
	private _tmpDrawParam: DrawParam;

	constructor( backend: GLBackend ) {

		super();

		this.backend = backend;
		this.canvas = backend.canvas;
		this.resolution = new MTP.Vector();
		this.globalUniforms = {};

		this._isCorrentCompiles = false;
		this._compileDrawParams = [];
		this.programManager = new ProgramManager( backend );
		this._geometryBuffers = new Map();
		this._vaoBindings = new WeakMap();
		this._sceneCamera = null;

		// lights

		this._lights = {
			directional: [],
			spot: [],
		};

		this._lightsUpdated = false;
		this._lightInfoCache = new Map();

		// quad

		this._quad = new PlaneGeometry( { width: 2.0, height: 2.0 } );

		// tmp

		this._tmpLightDirection = new MTP.Vector();
		this._tmpModelMatrixInverse = new MTP.Matrix();
		this._tmpViewMatrixInverseMatrix = new MTP.Matrix();
		this._tmpProjectionMatrixInverse = new MTP.Matrix();
		this._tmpModelViewMatrix = new MTP.Matrix();
		this._tmpNormalMatrix = new MTP.Matrix();
		this._tmpResolution = new MTP.Vector();
		this._tmpResolutionUniform = { value: this._tmpResolution, type: '2fv' };
		this._tmpUniformOverride = {};
		this._tmpDrawParam = {};

	}

	/*-------------------------------
		RenderStack
	-------------------------------*/

	protected _createRenderStack(): RenderStack {


		return {
			light: [],
			deferred: [],
			forward: [],
			transparent: [],
			ui: [],
			shadowMap: [],
			envMap: [],
		};

	}

	// entity以下を再帰的に走査してRenderStackへ振り分ける。displayOut なカメラも同じ走査で拾う
	protected _collectRenderStack( entity: Entity, parentVisibility: boolean, stack: RenderStack ) {


		const visibility = parentVisibility && entity.visible && ! entity.renderHidden;
		const mesh = entity.getComponent( Mesh );

		if ( mesh && visibility ) {

			const material = getMaterial( mesh );

			if ( material.visibilityFlag.deferred ) stack.deferred.push( entity );
			if ( material.visibilityFlag.shadowMap ) stack.shadowMap.push( entity );
			if ( material.visibilityFlag.forward ) {

				if ( material.transparent ) {

					stack.transparent.push( entity );

				} else {

					stack.forward.push( entity );

				}

			}

			if ( material.visibilityFlag.ui ) stack.ui.push( entity );
			if ( material.visibilityFlag.envMap ) stack.envMap.push( entity );

		}

		const light = entity.getComponent( Light );

		if ( light && light.enabled && visibility ) {

			stack.light.push( entity );

		}

		if ( ! this._sceneCamera ) {

			const cameras = entity.getComponentsByTag<Camera>( "camera" );

			for ( let i = 0; i < cameras.length; i ++ ) {

				if ( cameras[ i ].displayOut ) this._sceneCamera = entity;

			}

		}

		for ( let i = 0; i < entity.children.length; i ++ ) {

			this._collectRenderStack( entity.children[ i ], visibility, stack );

		}

	}

	/*-------------------------------
		Lights
	-------------------------------*/

	// 振り分けたライトから、シェーダーへ渡す値を集め直す。
	// 影を落とすライトのうち、視点に依らず1フレームに1回描けばよいもの（directional 以外）を返す
	protected _collectLights( lightEntities: Entity[] ): LightInfo[] {

		const shadowMapLightList: LightInfo[] = [];
		const prevLightsNum: {[key:string]: number} = {};

		const lightKeys = Object.keys( this._lights );


		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as LightType;
			prevLightsNum[ l ] = this._lights[ l ].length;
			this._lights[ l ] = [];

		}

		for ( let i = 0; i < lightEntities.length; i ++ ) {

			const lightEntity = lightEntities[ i ];
			const lightComponent = lightEntity.getComponent( Light );

			if ( lightComponent ) {

				const info = this._collectLight( lightEntity, lightComponent );

				// directional は描くビューのカメラ基準で範囲が変わるので、render でビューごとに描く
				if ( lightComponent.castShadow && info.renderTarget && lightComponent.lightType !== 'directional' ) {

					shadowMapLightList.push( info );

				}

			}

		}

		this._lights.directional.sort( ( a, b ) => ( a.component.castShadow ? 0 : 1 ) - ( b.component.castShadow ? 0 : 1 ) );
		this._lights.spot.sort( ( a, b ) => ( a.component.castShadow ? 0 : 1 ) - ( b.component.castShadow ? 0 : 1 ) );

		this._lightsUpdated = false;

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as LightType;

			if ( prevLightsNum[ l ] != this._lights[ l ].length ) {

				this._lightsUpdated = true;

				break;

			}

		}

		return shadowMapLightList;

	}

	// directional のシャドウマップを、描くビューのカメラに範囲を合わせて描く（レンダーターゲットはビュー間で共有し、ビューごとに描き直す）
	protected _renderDirectionalShadowMaps( cameraComponent: Camera, shadowMapEntities: Entity[], canvasSize: MTP.Vector ) {

		for ( let i = 0; i < this._lights.directional.length; i ++ ) {

			const info = this._lights.directional[ i ];

			if ( ! info.component.castShadow || ! info.renderTarget ) continue;

			info.component.fitShadowToCamera( cameraComponent, info.component.shadowMapSize.x );

			this.renderCamera( "shadowMap", info.component.entity, shadowMapEntities, info.renderTarget, canvasSize );

		}

	}

	/*-------------------------------
		Draw
	-------------------------------*/

	public renderCamera( renderType: MaterialDrawPass, cameraEntity: Entity, entities: Entity[], renderTarget: GLP.GLPowerFrameBuffer | null, canvasSize: MTP.Vector, renderOption?: RenderOption ) {

		const camera = cameraEntity.getComponentsByTag<Camera>( "camera" )[ 0 ] || cameraEntity.getComponent( Light )!;

		renderOption = renderOption || {};

		const drawParam = this._tmpDrawParam;

		drawParam.viewMatrix = camera.viewMatrix;
		drawParam.viewMatrixPrev = camera.viewMatrixPrev;
		drawParam.projectionMatrix = camera.projectionMatrix;
		drawParam.projectionMatrixPrev = camera.projectionMatrixPrev;
		drawParam.cameraMatrixWorld = cameraEntity.matrixWorld;
		drawParam.cameraNear = camera.near;
		drawParam.cameraFar = camera.far;
		drawParam.renderTarget = renderTarget;
		drawParam.uniformOverride = renderOption.uniformOverride || this._tmpUniformOverride;

		if ( renderOption.cameraOverride ) {

			Object.assign( drawParam, renderOption.cameraOverride );

		}

		this.backend.bindRenderTarget( renderTarget, camera.viewPort, canvasSize );

		if ( renderTarget ) {

			this._tmpResolution.set( renderTarget.size.x, renderTarget.size.y );

		} else {

			this._tmpResolution.set( canvasSize.x, canvasSize.y );

		}

		drawParam.uniformOverride.uResolution = this._tmpResolutionUniform;

		// clear

		if ( ! renderOption.disableClear ) {

			this.backend.clear( renderType == "shadowMap" ? _clearColorWhite : _clearColorBlack, 1.0 );

		}

		// render

		for ( let i = 0; i < entities.length; i ++ ) {

			const entity = entities[ i ];

			const materialOverride = entity.getComponentsByTag<MaterialOverride>( "materialOverride" )[ 0 ];

			const mesh = entity.getComponent( Mesh )!;
			const material = ( materialOverride && materialOverride.material as Material ) || getMaterial( mesh );
			const geometry = mesh.geometry;

			drawParam.modelMatrixWorld = entity.matrixWorld;
			drawParam.modelMatrixWorldPrev = entity.matrixWorldPrev;

			if ( import.meta.env.DEV ) {

				drawParam.label = `cam[${camera.uuid}]/${entity.name || material.name || "-"}`;

			}

			this.draw( entity.uuid, renderType, geometry, material, drawParam );

		}

		if ( import.meta.env.DEV ) {

			this.emit( "drawPass", [ renderTarget, "camera/" + renderType ] );

		}

	}

	private _collectLight( lightEntity: Entity, lightComponent: Light ): LightInfo {

		const type = lightComponent.lightType;

		// LightInfoはライトごとに使い回してフレーム毎のVector生成を避ける
		let info = this._lightInfoCache.get( lightComponent );

		if ( ! info ) {

			info = {
				position: new MTP.Vector(),
				direction: new MTP.Vector(),
				color: new MTP.Vector(),
				renderTarget: null,
				component: lightComponent,
			};

			this._lightInfoCache.set( lightComponent, info );

		}

		info.position.set( 0.0, 0.0, 0.0, 1.0 ).applyMatrix4( lightEntity.matrixWorld );
		info.direction.set( 0.0, 1.0, 0.0, 0.0 ).applyMatrix4( lightEntity.matrixWorld ).normalize();
		// directional は照度 W/m² をそのまま、spot は放射束 W を全方向の放射強度 W/sr（W / 4π）にして渡す。
		// spot の W がコーンに光を集めない（点光源と同じ明るさでコーンの外を切るだけ）のは Blender の約束に合わせている
		info.color.set( lightComponent.color.x, lightComponent.color.y, lightComponent.color.z ).multiply( lightComponent.intensity );

		if ( type == 'spot' ) info.color.multiply( 1 / ( 4 * Math.PI ) );

		if ( type == 'directional' ) {

			this._lights.directional.push( info );

		} else if ( type == 'spot' ) {

			this._lights.spot.push( info );

		}

		if ( lightComponent.castShadow && info.renderTarget == null ) {

			info.renderTarget = this.backend.createFrameBuffer().setTexture( [ this.backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ) ] );
			info.renderTarget.setSize( lightComponent.shadowMapSize );

		}

		return info;

	}

	public renderPostProcess( postprocess: PostProcess, input?: GLP.GLPowerFrameBuffer, canvasSize?: MTP.Vector, renderOption?: RenderOption ) {

		// render

		let backbuffers: GLP.GLPowerTexture[] | undefined = input ? input.textures : undefined;

		if ( ! postprocess.passes ) return;

		for ( let i = 0; i < postprocess.passes.length; i ++ ) {

			const pass = postprocess.passes[ i ];

			if ( pass.enabled === false ) continue;

			const renderTarget = pass.renderTarget;

			this.backend.bindRenderTarget( renderTarget, pass.viewPort, canvasSize );

			// clear

			this.backend.clear( pass.clearColor, pass.clearDepth );

			const backBuffer = pass.backBufferOverride || backbuffers || null;

			if ( backBuffer ) {

				for ( let i = 0; i < backBuffer.length; i ++ ) {

					pass.uniforms[ 'uBackBuffer' + i ] = {
						type: '1i',
						value: backBuffer[ i ]
					};

				}

			}

			const opt: DrawParam = renderOption && renderOption.cameraOverride || {};

			if ( import.meta.env.DEV ) {

				opt.label = pass.name;

			}

			opt.renderTarget = renderTarget;
			opt.uniformOverride = renderOption && renderOption.uniformOverride;

			this.draw( pass.uuid, "postprocess", this._quad, pass, opt );

			pass.onAfterRender();

			if ( ! pass.passThrough && pass.renderTarget ) {

				backbuffers = pass.renderTarget.textures;

			}

			if ( import.meta.env.DEV ) {

				this.emit( "drawPass", [ pass.renderTarget, pass.name ] );

			}

		}

	}

	public draw( drawId: string, renderType: MaterialDrawPass, geometry: Geometry, material: Material, param?: DrawParam ) {

		if ( this._isCorrentCompiles ) {

			this._compileDrawParams.push( { drawId, renderType, geometry, material, param: { ...param } } );

			return;

		}

		TextureUnitCounter = 0;

		this.backend.setMaterialState( material.cullFace, material.depthTest, material.depthWrite );

		// program

		let program = material.programCache[ renderType ];

		if ( ! program || this._lightsUpdated ) {

			const defines = { ...material.defines };

			if ( renderType == 'deferred' ) defines.IS_DEFERRED = "";
			else if ( renderType == 'forward' || renderType == 'envMap' ) defines.IS_FORWARD = "";
			else if ( renderType == 'shadowMap' ) defines.IS_DEPTH = "";
			else if ( renderType == 'forwardLit' ) defines.IS_FORWARD_LIT = "";

			// 不透明の forward の先描きは、forward のシェーダーを IS_FORWARD の分岐ごと位置・法線・速度の出力に差し替えてコンパイルする
			if ( renderType == 'forwardPrepass' ) {

				defines.IS_FORWARD = "";
				defines.IS_PREPASS = "";

			}

			const vert = shaderParse( material.vert, defines, this._lights );
			const frag = shaderParse( material.frag, defines, this._lights );

			program = this.programManager.get( vert, frag, material.name );

			material.programCache[ renderType ] = program;

		}

		if ( param ) {

			// modelMatrix

			if ( param.modelMatrixWorld ) {

				program.setUniform( 'uModelMatrix', 'Matrix4fv', param.modelMatrixWorld.elm );
				program.setUniform( 'uModelMatrixInverse', 'Matrix4fv', this._tmpModelMatrixInverse.copy( param.modelMatrixWorld ).inverse().elm );

				if ( param.modelMatrixWorldPrev ) {

					program.setUniform( 'uModelMatrixPrev', 'Matrix4fv', param.modelMatrixWorldPrev.elm );

				}

				if ( param.viewMatrix ) {

					this._tmpModelViewMatrix.copy( param.modelMatrixWorld ).preMultiply( param.viewMatrix );
					this._tmpNormalMatrix.copy( this._tmpModelViewMatrix );
					this._tmpNormalMatrix.inverse();
					this._tmpNormalMatrix.transpose();

					program.setUniform( 'uModelViewMatrix', 'Matrix4fv', this._tmpModelViewMatrix.elm );
					program.setUniform( 'uNormalMatrix', 'Matrix4fv', this._tmpNormalMatrix.elm );
					program.setUniform( 'uViewMatrixInverse', 'Matrix4fv', this._tmpViewMatrixInverseMatrix.copy( param.viewMatrix ).inverse().elm );

				}

			}

			// viewMatrix

			if ( param.viewMatrix ) {

				program.setUniform( 'uViewMatrix', 'Matrix4fv', param.viewMatrix.elm );

				if ( param.viewMatrixPrev ) {

					program.setUniform( 'uViewMatrixPrev', 'Matrix4fv', param.viewMatrixPrev.elm );

				}

			}

			// projectionMatrix

			if ( param.projectionMatrix ) {

				program.setUniform( 'uProjectionMatrix', 'Matrix4fv', param.projectionMatrix.elm );
				program.setUniform( 'uProjectionMatrixInverse', 'Matrix4fv', this._tmpProjectionMatrixInverse.copy( param.projectionMatrix ).inverse().elm );

				if ( param.projectionMatrixPrev ) {

					program.setUniform( 'uProjectionMatrixPrev', 'Matrix4fv', param.projectionMatrixPrev.elm );

				}

			}

			// cameraMatrix

			if ( param.cameraMatrixWorld ) {

				program.setUniform( 'uCameraMatrix', 'Matrix4fv', param.cameraMatrixWorld.elm );
				program.setUniform( 'uCameraPosition', '3f', [ param.cameraMatrixWorld.elm[ 12 ], param.cameraMatrixWorld.elm[ 13 ], param.cameraMatrixWorld.elm[ 14 ] ] );

			}

			if ( renderType != 'deferred' ) {

				if ( param.cameraNear ) {

					program.setUniform( 'uCameraNear', '1f', [ param.cameraNear ] );

				}

				if ( param.cameraFar ) {

					program.setUniform( 'uCameraFar', '1f', [ param.cameraFar ] );

				}

			}

		}

		if ( material.useLight && ( renderType !== 'deferred' && renderType !== 'shadowMap' ) ) {

			for ( let i = 0; i < this._lights.directional.length; i ++ ) {

				const dLight = this._lights.directional[ i ];
				const names = getDirLightNames( i );

				program.setUniform( names.direction, '3fv', dLight.direction.getElm( 'vec3' ) );
				program.setUniform( names.color, '3fv', dLight.color.getElm( 'vec3' ) );

				if ( dLight.renderTarget ) {

					const texture = dLight.renderTarget.textures[ 0 ].activate( TextureUnitCounter ++ );

					program.setUniform( names.camNear, '1fv', [ dLight.component.near ] );
					program.setUniform( names.camFar, '1fv', [ dLight.component.far ] );
					program.setUniform( names.camViewMatrix, 'Matrix4fv', dLight.component.viewMatrix.elm );
					program.setUniform( names.camProjectionMatrix, 'Matrix4fv', dLight.component.projectionMatrix.elm );
					program.setUniform( names.camResolution, '2fv', texture.size.getElm( "vec2" ) );
					program.setUniform( names.shadowMap, '1i', [ texture.unit ] );

				}

			}

			for ( let i = 0; i < this._lights.spot.length; i ++ ) {

				const sLight = this._lights.spot[ i ];
				const names = getSpotLightNames( i );

				if ( param && param.viewMatrix ) {

					this._tmpLightDirection.copy( sLight.direction ).applyMatrix3( param.viewMatrix );

				}

				program.setUniform( names.position, '3fv', sLight.position.getElm( 'vec3' ) );
				program.setUniform( names.direction, '3fv', sLight.direction.getElm( 'vec3' ) );
				program.setUniform( names.color, '3fv', sLight.color.getElm( 'vec3' ) );
				program.setUniform( names.angle, '1fv', [ Math.cos( sLight.component.angle / 2 ) ] );
				program.setUniform( names.blend, '1fv', [ sLight.component.blend ] );

				if ( sLight.renderTarget ) {

					const texture = sLight.renderTarget.textures[ 0 ].activate( TextureUnitCounter ++ );

					program.setUniform( names.camNear, '1fv', [ sLight.component.near ] );
					program.setUniform( names.camFar, '1fv', [ sLight.component.far ] );
					program.setUniform( names.camViewMatrix, 'Matrix4fv', sLight.component.viewMatrix.elm );
					program.setUniform( names.camProjectionMatrix, 'Matrix4fv', sLight.component.projectionMatrix.elm );
					program.setUniform( names.camResolution, '2fv', texture.size.getElm( "vec2" ) );
					program.setUniform( names.shadowMap, '1i', [ texture.unit ] );

				}

			}

		}

		setUniforms( program, this.globalUniforms, material.uniforms, param && param.uniformOverride );

		const vao = program.getVAO( drawId.toString() );

		if ( vao ) {

			const geometryBuffer = this._getGeometryBuffer( geometry );
			const binding = this._vaoBindings.get( vao );

			let bound = false;

			if ( binding !== undefined && binding.record === geometryBuffer && binding.version === geometryBuffer.version ) {

				bound = true;

			}

			if ( ! bound ) {

				geometry.attributes.forEach( ( attr, key ) => {

					const buffer = geometryBuffer.buffers.get( key );

					if ( buffer === undefined ) return;

					if ( key == 'index' ) {

						vao.setIndex( buffer );

					} else {

						vao.setAttribute( key, buffer, attr.size, attr.opt );

					}

				} );

				this._vaoBindings.set( vao, { record: geometryBuffer, version: geometryBuffer.version } );

			}

			let queryName: string | undefined = undefined;

			if ( import.meta.env.DEV ) {

				queryName = `${renderType}/${param && param.label || "_"}/ [${drawId}]`;

			}

			// 書くアタッチメントを絞る。forwardPrepass は gBuffer の位置・法線・速度だけ。
			// forward は不透明（gBuffer の段で書き終えている）と、writeGBuffer を切った透明が色だけを書く
			const renderTarget = param && param.renderTarget;
			let drawBuffers: number[] | null = null;

			if ( renderType == 'forwardPrepass' ) {

				drawBuffers = FORWARD_PREPASS_DRAW_BUFFERS;

			} else if ( renderType == 'forward' && ( ! material.transparent || ! material.writeGBuffer ) ) {

				drawBuffers = FORWARD_COLOR_DRAW_BUFFERS;

			}

			if ( renderTarget && drawBuffers ) this.backend.setDrawBuffers( renderTarget, drawBuffers );

			this.backend.draw( program, vao, material.drawType, material.blending, queryName );

			if ( renderTarget && drawBuffers ) this.backend.setDrawBuffers( renderTarget, null );

		}

	}

	// GeometryのGPUバッファを生成・保持する。updateVersionが変わっていたら作り直す
	private _getGeometryBuffer( geometry: Geometry ): GeometryBufferRecord {

		let record = this._geometryBuffers.get( geometry );

		if ( ! record ) {

			record = { buffers: new Map(), version: - 1 };

			this._geometryBuffers.set( geometry, record );

		}

		if ( record.version !== geometry.updateVersion ) {

			const buffers = record.buffers;

			buffers.forEach( ( buffer ) => buffer.dispose() );
			buffers.clear();

			geometry.attributes.forEach( ( attr, key ) => {

				buffers.set( key, new GLP.GLPowerBuffer( this.backend.gl ).setData( attr.array, key == 'index' ? 'ibo' : 'vbo', attr.opt && attr.opt.usage ) );

			} );

			record.version = geometry.updateVersion;

		}

		return record;

	}

	/*-------------------------------
		Scene
	-------------------------------*/

	// フレーム1回。シーン全体で共有する資源（ライト・シャドウなど）を更新する
	public abstract prepareScene( root: Entity, event: EntityUpdateEvent ): void;

	// view の視点でシーンを描く。prepareScene の後に呼ぶ
	public abstract render( view: RenderViewContract, event: EntityUpdateEvent ): void;

	/*-------------------------------
		Reset
	-------------------------------*/

	// シーンを丸ごと捨てる前提なので、生き残るジオメトリ（空・ギズモ等）の分も含めて
	// キャッシュを全部解放する。version 不一致で次の描画時に作り直される
	protected _resetCaches() {

		this._geometryBuffers.forEach( ( record ) => {

			record.buffers.forEach( ( buffer ) => buffer.dispose() );

		} );

		this._geometryBuffers.clear();

		this._lightInfoCache.forEach( ( info ) => {

			if ( ! info.renderTarget ) return;

			info.renderTarget.textures.forEach( ( texture ) => texture.dispose() );
			info.renderTarget.dispose();

		} );

		this._lightInfoCache.clear();

	}

	/*-------------------------------
		Compile
	-------------------------------*/

	public async compileShaders( root: Entity, view: RenderViewContract, event: EntityUpdateEvent, cb?: ( loaded: number, total: number ) => void ) {

		/*-------------------------------
			Correct Compiles
		-------------------------------*/
		this._isCorrentCompiles = true;

		this._compileDrawParams = [];

		this.prepareScene( root, event );
		this.render( view, event );

		this._isCorrentCompiles = false;

		/*-------------------------------
			Compile
		-------------------------------*/

		const total = this._compileDrawParams.length;
		let loaded = 0;

		for ( let i = 0; i < this._compileDrawParams.length; i ++ ) {

			const param = this._compileDrawParams[ i ];

			this.backend.bindRenderTarget( param.param.renderTarget || null );

			this.draw( param.drawId, param.renderType, param.geometry, param.material, param.param );

			await new Promise( r => {

				setTimeout( () => {

					r( null );

				}, 10 );

			} );

			if ( cb ) {

				loaded ++;

				cb( loaded, total );

			}

		}

	}

	/*-------------------------------
		TexProcedural
	-------------------------------*/

	// .tex の実体を組み立てる。依存テクスチャはサンプラー（'1i' uniform）としてぶら下げる
	public createTexProcedural( param: TexProceduralParam ): TexProcedural {

		const uniforms: BSP.Uniforms = {};
		const textures = param.textures || {};
		const keys = Object.keys( textures );

		for ( let i = 0; i < keys.length; i ++ ) {

			uniforms[ keys[ i ] ] = { value: textures[ keys[ i ] ], type: '1i' };

		}

		const tex = new TexProcedural( this, {
			frag: param.frag,
			resolution: param.resolution,
			uniforms,
		} );

		if ( param.filter === 'nearest' ) {

			tex.setting( {
				magFilter: GL.NEAREST,
				minFilter: GL.NEAREST,
			} );

			tex.render();

		}

		return tex;

	}

}

// uniform値の展開先を使い回してdraw毎の配列生成を避ける
// （GLPowerProgram.setUniformが値を内部配列へコピーする前提）
const _uniformArrayValue: ( number | boolean )[] = [];

const pushUniformValue = ( v: boolean | number | MTP.Vector | MTP.Matrix | GLP.GLPowerTexture, type: string ) => {

	if ( v == null ) return;

	if ( typeof v == 'number' || typeof v == 'boolean' ) {

		_uniformArrayValue.push( v );

	} else if ( 'isVector' in v ) {

		_uniformArrayValue.push( ...v.getElm( ( 'vec' + type.charAt( 0 ) ) as any ) );

	} else if ( 'isTexture' in v ) {

		v.activate( TextureUnitCounter ++ );

		_uniformArrayValue.push( v.unit );

	} else {

		_uniformArrayValue.push( ...v.elm );

	}

};

// 複数のuniformオブジェクトを順に走査して設定する（後のオブジェクトが同名キーを上書きする）
export const setUniforms = ( program: GLP.GLPowerProgram, ...uniformsList: ( BSP.Uniforms | undefined )[] ) => {

	for ( let ui = 0; ui < uniformsList.length; ui ++ ) {

		const uniforms = uniformsList[ ui ];

		if ( ! uniforms ) continue;

		const keys = Object.keys( uniforms );

		for ( let i = 0; i < keys.length; i ++ ) {

			const name = keys[ i ];
			const uni = uniforms[ name ];

			if ( ! uni ) continue;

			const type = uni.type;
			const value = uni.value;

			_uniformArrayValue.length = 0;

			if ( Array.isArray( value ) ) {

				for ( let j = 0; j < value.length; j ++ ) {

					pushUniformValue( value[ j ], type );

				}

			} else {

				pushUniformValue( value, type );

			}

			if ( _uniformArrayValue.length > 0 ) {

				program.setUniform( name, type, _uniformArrayValue );

			}

		}

	}

};
