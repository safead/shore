'use strict';
import React from 'react';
import { shallow } from 'enzyme';
import CustomersList from '.';

describe( 'CustomersList', () => {

  let component;

  it( 'mount without crashing', () => {
    component = shallow(
      <CustomersList />
    );
    component.unmount();
  } );

} );
