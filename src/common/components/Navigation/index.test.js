'use strict';
import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '.';
import { BrowserRouter as Router } from 'react-router-dom';

describe( 'Navigation', () => {

  let component;

  it( 'mount without crashing', () => {
    component = shallow(
      <Router>
        <Navigation />
      </Router>
    );
    component.unmount();
  } );

} );
