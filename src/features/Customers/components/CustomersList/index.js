import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectors } from 'store/selectors';
import { actions } from 'store/actions';
import * as constants from 'common/constants';
import { DialogCustomer, CustomerRow } from 'features';

export class CustomersList extends Component {

  renderBody = () => {
    return (
      <shore-table-body>
        { this.props.customers.map( customer =>
          <CustomerRow
            key={ customer.id }
            name={ customer.name }
            phone={ customer.phone }
            email={ customer.email }
            favoriteServices={ customer.favoriteServices }
            allServices={ this.props.services }
            onClick={ () => { this.props.editCustomerId( customer.id ); } }
          />
        ) }
      </shore-table-body>
    );
  };
  renderHeader = () => {
    return <shore-table-head>
      <shore-table-row>
        <shore-table-cell>Name</shore-table-cell>
        <shore-table-cell>Phone</shore-table-cell>
        <shore-table-cell>Email</shore-table-cell>
        <shore-table-cell>Favorite Services</shore-table-cell>
      </shore-table-row>
    </shore-table-head>;
  };

  render() {
    return <div className="margin-21">
      <shore-table>
        {this.renderHeader()}
        {this.renderBody()}
      </shore-table>
      <br />
      <span className="box" onClick={ () => { this.props.editCustomerId( constants.NEW_ITEM ); } }>
        <shore-icon name="new-customer"> </shore-icon>
        New customer
      </span>
      { this.props.customerEdit !== constants.IDLE && <DialogCustomer allServices={ this.props.services } /> }
    </div>;
  }
}

CustomersList.propTypes = {
  customers: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  editCustomerId: PropTypes.func.isRequired,
  customerEdit: PropTypes.any
};

const mapStateToProps = state => ( {
  customers: selectors.getAllCustomers( state ),
  services: selectors.getAllServices( state ),
  customerEdit: selectors.getEditCustomerId( state )
} );

const mapDispatchToProps = dispatch => ( {
  editCustomerId: id => dispatch( actions.editCustomerId( id ) )
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( CustomersList );
