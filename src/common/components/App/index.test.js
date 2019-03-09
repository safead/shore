'use strict';
import React from 'react';
import App from '.';
import { mount } from 'enzyme';

describe( 'App', () => {

  let app;

  it( 'mount without crashing', () => {
    app = mount(
      <App />
    );
    app.unmount();
  } );

} );
