'use strict';
import React from 'react';
import { shallow } from 'enzyme';
import CustomerRow from '.';

describe( 'CustomerRow', () => {

  let component;

  it( 'mount without crashing', () => {
    component = shallow(
      <CustomerRow
        name='name'
        phone='11111111'
        email='email@domain.com'
        favoriteServices={ [ '1' ] }
        allServices={ [ '1', '2' ] }
        onClick={ () => {} }
      />
    );
    component.unmount();
  } );

} );
