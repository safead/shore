import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as constants from 'common/constants';

export class Navigation extends Component {

  renderItems = () => {
    return constants.NAV.map( ( item, index ) => {
      return <Link to={ item.path } key={ index }>
        <shore-navigation-item
          title={ item.title }
          { ...( window.location.pathname === item.path && { isactive: true } ) }
        > </shore-navigation-item>
      </Link>;
    } );
  };

  render() {
    return <shore-navigation>
      { this.renderItems() }
    </shore-navigation>;
  }
}
export default Navigation;
