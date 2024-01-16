import { FolderApi, Pane } from "tweakpane";

/*-------------------------------
	Pane
-------------------------------*/

export const pane = new Pane();

pane.hidden = true;

window.addEventListener( 'keydown', ( e ) => {

	if ( e.key == "n" ) {

		pane.hidden = ! pane.hidden;

	}

} );

export const paneRegister = ( folder: FolderApi, o: any ) => {

	const keys = Object.keys( o );

	for ( let i = 0; i < keys.length; i ++ ) {

		const key = keys[ i ];
		const prop = o[ key ];

		if ( typeof prop == "object" ) {

			if ( prop.value !== undefined ) {

				if ( typeof prop.value == "number" ) {

					folder.addBinding( prop, "value", { ...prop, label: key } );

				}

			} else {

				paneRegister( folder.addFolder( { title: key } ), prop );

			}

			continue;

		}

	}

};
