'use strict';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Index } from 'common/components';
import { Provider } from 'react-redux';
import { store } from 'store';

describe( 'Index <shallow>', () => {

  let component;

  it( 'mount without crashing', () => {
    component = shallow( <Index /> );
    component.unmount();
  } );

} );

describe( 'Index <mount>', () => {

  let component;

  it( 'mount without crashing', () => {
    component = mount( <Provider store={ store }><Index /></Provider> );
    component.unmount();
  } );

} );
