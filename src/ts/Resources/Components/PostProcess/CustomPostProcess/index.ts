import * as MXP from 'maxpower';

import { Engine } from 'orengine';

import { Bloom } from '../Bloom';
import { ColorGrading } from '../ColorGrading';
import { FXAA } from '../FXAA';
import { Finalize } from '../Finalize';

import { gl } from '~/ts/Globals';

export class CustomPostProcess extends MXP.Component {

	constructor( param: MXP.ComponentParams ) {

		super( param );

		const pipeline = this._entity.addComponent( MXP.PostProcessPipeline );

		const engine = Engine.getInstance( gl );
		const rt = engine.renderer.renderTarget;

		const bloom = new Bloom( rt.shadingBuffer.textures[ 0 ] );
		bloom.threshold = 1.0;
		bloom.brightness = 1;

		pipeline.add( new FXAA() );
		pipeline.add( bloom );
		pipeline.add( new ColorGrading() );
		pipeline.add( new Finalize() );

		this.field( "postprocess",
			() => {

				return pipeline.postProcesses.map( ( pp ) => ( { name: pp.name, enabled: pp.enabled } ) );

			},
			( v ) => {

				v.forEach( ( item: { name: string, enabled: boolean } ) => {

					const pp = pipeline.postProcesses.find( ( p ) => p.name === item.name );

					if ( pp ) {

						pp.enabled = item.enabled;

					}

				} );

			}, {
				format: {
					type: "array",
					labels: ( _value, i ) => {

						const pp = pipeline.postProcesses[ i ];
						return pp ? pp.name : `PostProcess ${i}`;

					}
				}
			}
		);

		this.on( "dispose", () => {

			this._entity.removeComponent( MXP.PostProcessPipeline );

		} );

	}

}
