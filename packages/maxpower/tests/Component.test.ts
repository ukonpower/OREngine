import { Entity, Component } from 'maxpower';
import { describe, it, expect, vi } from 'vitest';

describe( 'Component', () => {

	it( 'should have entity reference', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		expect( c.entity ).toBe( e );

	} );

	it( 'should be enabled by default', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		expect( c.enabled ).toBe( true );

	} );

	it( 'should not call updateImpl when disabled', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		c.enabled = false;
		const spy = vi.spyOn( c as any, 'updateImpl' );
		c.update( {} as any );
		expect( spy ).not.toHaveBeenCalled();

	} );

	it( 'should call updateImpl when enabled', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		const spy = vi.spyOn( c as any, 'updateImpl' );
		c.update( {} as any );
		expect( spy ).toHaveBeenCalled();

	} );

	it( 'should not call postUpdateImpl when disabled', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		c.enabled = false;
		const spy = vi.spyOn( c as any, 'postUpdateImpl' );
		c.postUpdate( {} as any );
		expect( spy ).not.toHaveBeenCalled();

	} );

	it( 'should not call beforeRenderImpl when disabled', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		c.enabled = false;
		const spy = vi.spyOn( c as any, 'beforeRenderImpl' );
		c.beforeRender( {} as any );
		expect( spy ).not.toHaveBeenCalled();

	} );

	it( 'should not call afterRenderImpl when disabled', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		c.enabled = false;
		const spy = vi.spyOn( c as any, 'afterRenderImpl' );
		c.afterRender( {} as any );
		expect( spy ).not.toHaveBeenCalled();

	} );

	it( 'should set disposed flag on dispose', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		c.dispose();
		expect( ( c as any )._disposed ).toBe( true );

	} );

	it( 'should emit dispose event', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		const cb = vi.fn();
		c.on( 'dispose', cb );
		c.dispose();
		expect( cb ).toHaveBeenCalled();

	} );

	it( 'should have default order 0', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		expect( c.order ).toBe( 0 );

	} );

	it( 'should have empty tag by default', () => {

		const e = new Entity();
		const c = e.addComponent( Component );
		expect( c.tag ).toBe( '' );

	} );

} );
