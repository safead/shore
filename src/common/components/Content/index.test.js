'use strict';
import React from 'react';
import { shallow } from 'enzyme';
import Content from '.';
import { BrowserRouter as Router } from 'react-router-dom';

describe( 'Content', () => {

  let component;

  it( 'mount without crashing', () => {
    component = shallow(
      <Router>
        <Content />
      </Router>
    );
    component.unmount();
  } );

} );
