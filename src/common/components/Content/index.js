import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as constants from 'common/constants';
import * as features from 'features';

export class Content extends Component {

  renderItems = () => {
    return constants.NAV.map( ( item, index ) => {
      return <Route
        path={ item.path }
        component={ features[ item.component ] }
        key={ index }
        exact
      />;
    } );
  };

  render() {
    return <div slot="content">
      { this.renderItems() }
    </div>;
  }
}

export default Content;
