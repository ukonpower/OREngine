import { EventEmitter } from 'glpower';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe( 'EventEmitter', () => {

	let emitter: EventEmitter;

	beforeEach( () => {

		emitter = new EventEmitter();

	} );

	describe( 'on / emit', () => {

		it( 'should call listener when event is emitted', () => {

			const cb = vi.fn();
			emitter.on( 'test', cb );
			emitter.emit( 'test' );
			expect( cb ).toHaveBeenCalledTimes( 1 );

		} );

		it( 'should pass arguments to listener', () => {

			const cb = vi.fn();
			emitter.on( 'test', cb );
			emitter.emit( 'test', [ 'arg1', 'arg2' ] );
			expect( cb ).toHaveBeenCalledWith( 'arg1', 'arg2' );

		} );

		it( 'should support multiple listeners', () => {

			const cb1 = vi.fn();
			const cb2 = vi.fn();
			emitter.on( 'test', cb1 );
			emitter.on( 'test', cb2 );
			emitter.emit( 'test' );
			expect( cb1 ).toHaveBeenCalledTimes( 1 );
			expect( cb2 ).toHaveBeenCalledTimes( 1 );

		} );

		it( 'should not call listener for different event', () => {

			const cb = vi.fn();
			emitter.on( 'test', cb );
			emitter.emit( 'other' );
			expect( cb ).not.toHaveBeenCalled();

		} );

	} );

	describe( 'once', () => {

		it( 'should call listener only once', () => {

			const cb = vi.fn();
			emitter.once( 'test', cb );
			emitter.emit( 'test' );
			emitter.emit( 'test' );
			expect( cb ).toHaveBeenCalledTimes( 1 );

		} );

		it( 'should pass arguments on once', () => {

			const cb = vi.fn();
			emitter.once( 'test', cb );
			emitter.emit( 'test', [ 42 ] );
			expect( cb ).toHaveBeenCalledWith( 42 );

		} );

	} );

	describe( 'off', () => {

		it( 'should remove specific listener', () => {

			const cb = vi.fn();
			emitter.on( 'test', cb );
			emitter.off( 'test', cb );
			emitter.emit( 'test' );
			expect( cb ).not.toHaveBeenCalled();

		} );

		it( 'should remove all listeners for event when no cb given', () => {

			const cb1 = vi.fn();
			const cb2 = vi.fn();
			emitter.on( 'test', cb1 );
			emitter.on( 'test', cb2 );
			emitter.off( 'test' );
			emitter.emit( 'test' );
			expect( cb1 ).not.toHaveBeenCalled();
			expect( cb2 ).not.toHaveBeenCalled();

		} );

		it( 'should not affect other events', () => {

			const cb1 = vi.fn();
			const cb2 = vi.fn();
			emitter.on( 'test', cb1 );
			emitter.on( 'other', cb2 );
			emitter.off( 'test' );
			emitter.emit( 'other' );
			expect( cb2 ).toHaveBeenCalledTimes( 1 );

		} );

	} );

	describe( 'hasEvent', () => {

		it( 'should return true when listener exists', () => {

			emitter.on( 'test', () => {} );
			expect( emitter.hasEvent( 'test' ) ).toBe( true );

		} );

		it( 'should return false when no listener', () => {

			expect( emitter.hasEvent( 'test' ) ).toBe( false );

		} );

		it( 'should return false after all listeners removed', () => {

			const cb = vi.fn();
			emitter.on( 'test', cb );
			emitter.off( 'test' );
			expect( emitter.hasEvent( 'test' ) ).toBe( false );

		} );

	} );

} );
