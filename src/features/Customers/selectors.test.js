'use strict';
import * as selectors from './selectors';
import * as constants from 'common/constants';

describe( 'Customers selectors', () => {

  const state = {
    customers: {
      items: [
        { id: 'id1', name: 'name1' },
        { id: 'id2', name: 'name2' },
        { id: 'id3', name: 'name3' },
        { id: 'id4', name: 'name4' }
      ]
    }
  };

  it( '[getCustomerById] with id', () => {
    const actual = selectors.getCustomerById( state, 'id3' );
    expect( actual ).toEqual( { id: 'id3', name: 'name3' } );
  } );

  it( '[getCustomerById] with constants.IDLE', () => {
    const actual = selectors.getCustomerById( state, constants.IDLE );
    expect( actual ).toBe( null );
  } );

  it( '[getCustomerById] with constants.NEW_ITEM', () => {
    const actual = selectors.getCustomerById( state, constants.NEW_ITEM );
    expect( actual ).toEqual( {
      name: '',
      email: '',
      phone: '',
      favoriteServices: []
    } );
  } );

} );
