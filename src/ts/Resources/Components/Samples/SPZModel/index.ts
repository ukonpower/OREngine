import * as MXP from 'maxpower';

import { gl } from '~/ts/Globals';

export class SPZModel extends MXP.Component {

	private isLoading: boolean;
	private spzEntity: MXP.Entity | null;
	private spzController: MXP.SPZController | null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.isLoading = false;
		this.spzEntity = null;
		this.spzController = null;

		// this.loadSPZ( '/train.splat' );
		// this.loadSPZ( '/cup.spz' );
		// this.loadSPZ( "/hornedlizard.spz" );
		this.loadSPZ( "/racoonfamily.spz" );

	}

	private async loadSPZ( path: string ) {

		if ( this.isLoading ) return;

		this.isLoading = true;

		try {

			const loader = new MXP.SPZLoader( gl );

			// SPZモデルをロード（非圧縮モードでもロードを試す）
			const result = await loader.load( path, {
				isCompressed: true,
				sourceCoordinateSystem: MXP.CoordinateSystem.RDF, // PLY形式から変換された場合
				antialias: true
			} );
			console.log( 'SPZ loaded:', result );

			// 既存のSPZエンティティがあれば削除
			if ( this.spzEntity ) {

				this.entity.remove( this.spzEntity );

			}

			// 新しいSPZエンティティを追加
			this.spzEntity = result.scene;
			this.entity.add( this.spzEntity );

			// SPZControllerコンポーネントを取得
			this.spzController = this.spzEntity.getComponent( MXP.SPZController ) || null;

			// 位置とスケールを設定（必要に応じて調整）
			this.spzEntity.position.set( 0.0, 0.0, - 3.0 ); // カメラから少し離す
			this.spzEntity.scale.set( 0.5, 0.5, 0.5 ); // 適切なサイズに調整

		} catch ( error ) {

			console.error( 'SPZ loading error:', error );

			// エラーが発生した場合は非圧縮モードで再度試す
			try {

				const loader = new MXP.SPZLoader( gl );
				const result = await loader.load( path, {
					isCompressed: false,
					sourceCoordinateSystem: MXP.CoordinateSystem.RDF,
					antialias: true
				} );

				if ( this.spzEntity ) {

					this.entity.remove( this.spzEntity );

				}

				this.spzEntity = result.scene;
				this.entity.add( this.spzEntity );

				// SPZControllerコンポーネントを取得
				this.spzController = this.spzEntity.getComponent( MXP.SPZController ) || null;

				// 位置とスケールを設定（必要に応じて調整）
				this.spzEntity.position.set( 0.0, 0.0, - 3.0 ); // カメラから少し離す
				this.spzEntity.scale.set( 0.5, 0.5, 0.5 ); // 適切なサイズに調整

			} catch ( fallbackError ) {

				console.error( 'SPZ loading failed completely:', fallbackError );

			}

		} finally {

			this.isLoading = false;

		}

	}

	public update( event: MXP.ComponentUpdateEvent ) {

		super.update( event );

		// SPZエンティティが存在する場合、アニメーションなどの更新処理を行う
		if ( this.spzEntity ) {

			// モデルを回転させる
			// this.spzEntity.euler.y += event.timeDelta * 0.5;

		}

	}

	public dispose() {

		// リソースの解放
		if ( this.spzEntity ) {

			this.entity.remove( this.spzEntity );
			this.spzEntity = null;
			this.spzController = null;

		}

		super.dispose();

	}

}
