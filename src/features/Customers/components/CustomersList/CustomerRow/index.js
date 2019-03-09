import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from 'common/utils';

export class CustomersRow extends Component {

  renderServices = serviceIds => {
    return serviceIds.map( id => {
      const service = this.props.allServices.find( service => service.id === id );
      return service ? service.name : '';
    } ).join( ', ' );
  };

  render() {
    const [ first, last ] = utils.splitName( this.props.name );
    return <div onClick={ this.props.onClick }>
      <shore-table-row class="cursorPointer">
        <shore-table-cell>
          <shore-initials first={ first } last={ last } bgcolor="#00d0be" style={{ width: '40px' }}>
          </shore-initials>
          <span className="paddingLeft20">
            { this.props.name }
          </span>
        </shore-table-cell>
        <shore-table-cell>{ this.props.phone }</shore-table-cell>
        <shore-table-cell>{ this.props.email }</shore-table-cell>
        <shore-table-cell>
          { this.renderServices( this.props.favoriteServices ) }
        </shore-table-cell>
      </shore-table-row>
    </div>;
  }
}

CustomersRow.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  favoriteServices: PropTypes.array.isRequired,
  allServices: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CustomersRow;
