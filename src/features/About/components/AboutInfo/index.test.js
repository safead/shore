'use strict';
import React from 'react';
import { shallow } from 'enzyme';
import AboutInfo from '.';

describe( 'AboutInfo', () => {

  let component;

  it( 'mount without crashing', () => {
    component = shallow(
      <AboutInfo />
    );
    component.unmount();
  } );

} );
