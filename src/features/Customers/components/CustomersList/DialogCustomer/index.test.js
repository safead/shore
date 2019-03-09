'use strict';
import React from 'react';
import { shallow } from 'enzyme';
import DialogCustomer from '.';

describe( 'DialogCustomer', () => {

  let component;

  it( 'mount without crashing', () => {
    component = shallow(
      <DialogCustomer />
    );
    component.unmount();
  } );

} );
