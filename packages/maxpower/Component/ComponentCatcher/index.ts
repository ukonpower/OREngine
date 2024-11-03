import * as MXP from 'maxpower';

type ComponentCatcherDestructor = ( component: MXP.Component, entity: MXP.Entity ) => void;
type ComponentCatcherCallBack<T extends typeof MXP.Component> = ( component: InstanceType<T>, entity: MXP.Entity ) => ( ComponentCatcherDestructor | void )

export class ComponentCatcher<T extends typeof MXP.Component> extends MXP.Component {

	private target: T;
	private callback: ComponentCatcherCallBack<T>;


	constructor( target:T, callback: ComponentCatcherCallBack<T> ) {

		super();

		this.target = target;
		this.callback = callback;

	}

	protected setEntityImpl( entity: MXP.Entity ): void {

		const onAddComponent = ( addedComponent: MXP.Component ) => {

			if ( addedComponent.resourceId == this.target.resourceId ) {

				const cbcb = this.callback( addedComponent as InstanceType<T>, entity );

				if ( cbcb ) {

					const onRemoveComponent = ( component: MXP.Component ) => {

						if ( component.resourceId == addedComponent.resourceId ) {

							cbcb( addedComponent, entity );

							entity.off( "component/remove", onRemoveComponent );

						}

					};

					entity.on( "component/remove", onRemoveComponent );

					entity.once( "unsetEntity", () => {

						entity.off( "component/remove", onRemoveComponent );

					} );

				}

			}

		};

		entity.on( "component/add", onAddComponent );

		this.once( "unsetEntity", () => {

			entity.off( "component/add", onAddComponent );

		} );

		const target = entity.getComponent( this.target );

		if ( target ) {

			onAddComponent( target );

		}

	}

	protected unsetEntityImpl( prevEntity: MXP.Entity ): void {

		this.emit( "unsetEntity", [ prevEntity ] );

	}

}
