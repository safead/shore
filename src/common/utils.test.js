'use strict';
import * as utils from './utils';
let value;

describe( 'Utilities [isValidEmail]', () => {

  it( '<should succeed>', () => {
    value = 'peter-jo.123@gmail.com';
    expect( utils.isValidEmail( value ) ).toBe( true );
  } );

  it( '<should failed>', () => {
    value = '-peter-jo.123@gmail.com';
    expect( utils.isValidEmail( value ) ).toBe( false );
  } );

  it( '<should failed>', () => {
    value = 'peter-jo.12.@gmail.com';
    expect( utils.isValidEmail( value ) ).toBe( false );
  } );

  it( '<should failed>', () => {
    value = 'peter-jo.123@gmail.com+';
    expect( utils.isValidEmail( value ) ).toBe( false );
  } );

} );

describe( 'Utilities [isValidPhone]', () => {

  it( '<should succeed>', () => {
    value = '+1-345-1212-12';
    expect( utils.isValidPhone( value ) ).toBe( true );
  } );

  it( '<should succedd>', () => {
    value = '+(34) 345-11-11';
    expect( utils.isValidPhone( value ) ).toBe( true );
  } );

  it( '<should failed>', () => {
    value = '+a(34) 345-11-11';
    expect( utils.isValidPhone( value ) ).toBe( false );
  } );

  it( '<should failed>', () => {
    value = '+34-z345-11-11';
    expect( utils.isValidPhone( value ) ).toBe( false );
  } );

} );

describe( 'Utilities [splitName]', () => {

  it( '<should succeed>', () => {
    value = 'Some Name';
    expect( utils.splitName( value ) ).toEqual( [ 'Some', 'Name' ] );
  } );

  it( '<should succeed>', () => {
    value = '  Some     Name     More     ';
    expect( utils.splitName( value ) ).toEqual( [ 'Some', 'Name', 'More' ] );
  } );

} );
