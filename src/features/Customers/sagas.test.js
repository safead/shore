'use strict';
import { call, put, select } from 'redux-saga/effects';
import * as sagas from './sagas';
import actions from './redux';
import * as selectors from './selectors';
import * as emulator from 'common/api_mock';

describe( 'Customers * loadFromServer', () => {

  let generator = null;
  beforeAll( () => {
    generator = sagas.loadFromServer();
  } );

  it( 'Should get customers from server', () => {
    const expected = call( emulator.getCustomers );
    const actual = generator.next();
    expect( actual.value ).toEqual( expected );
  } );

  it( 'Should put customers to storage', () => {
    const expected = put( actions.loadCustomersSuccess( undefined ) );
    const actual = generator.next();
    expect( actual.value ).toEqual( expected );
  } );

} );

describe( 'Customers * saveToServer', () => {

  let generator = null;
  beforeAll( () => {
    generator = sagas.saveToServer();
  } );

  it( 'Should get all customers from redux store', () => {
    const expected = select( selectors.getAllCustomers );
    const actual = generator.next();
    expect( actual.value ).toEqual( expected );
  } );

} );

