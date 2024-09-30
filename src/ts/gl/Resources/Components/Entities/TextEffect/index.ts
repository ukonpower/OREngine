import * as MXP from 'maxpower';

import { Text } from '../../Utilities/Text';


export class TextEffect extends MXP.Component {

	private textEntityList: MXP.Entity[] = [];

	constructor() {

		super();

		const interval = window.setInterval( () => {

			const entity = this.entity;

			if ( entity ) {

				const tEntity = new MXP.Entity();
				const text = tEntity.addComponent( new Text() );

				const textList = [
					"this is sample text",
					"it does not have any special meaning",
					"It's now 7/2 1:07",
					"I'm a little sleepy",
					"Today's dinner was tuna bowl",
					"By the way, lunch is at Sukiya.",
					"Cheese beef bowl",
					"It was a miso soup set.",
					"It was delicious.",
					"What should I do for lunch tomorrow?",
					Math.random().toString(),
					new Date().toLocaleString(),
					"",
					"",
					"",
					"",
					"",
				];

				text.setText( textList[ Math.floor( Math.random() * textList.length ) ].toUpperCase() );

				entity.add( tEntity );

				const updatePos = () => {

					entity.children.forEach( ( c, i ) => {

						c.position.y = i * 0.2;

					} );

				};

				updatePos();

				setTimeout( () => {

					entity.remove( tEntity );
					tEntity.disposeRecursive();
					updatePos();

				}, 2000 );

			}

		}, 500 );

		this.once( "dispose", () => {

			window.clearInterval( interval );

		} );

	}

}
