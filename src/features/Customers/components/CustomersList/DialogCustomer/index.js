import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectors } from 'store/selectors';
import { actions } from 'store/actions';
import * as constants from 'common/constants';
import * as utils from 'common/utils';

export class DialogCustomer extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      id: this.props.customer.id || '',
      name: this.props.customer.name,
      phone: this.props.customer.phone,
      email: this.props.customer.email,
      favoriteServices: this.props.customer.favoriteServices,
      nameError: '',
      phoneError: '',
      emailError: ''
    };
  }

  nameChange = ev => {
    this.setState( {
      name: ev.target.value
    } );
  };

  phoneChange = ev => {
    this.setState( {
      phone: ev.target.value
    } );
  };

  emailChange = ev => {
    this.setState( {
      email: ev.target.value
    } );
  };

  favoriteServicesChange = ids => {
    this.setState( {
      favoriteServices: ids
    } );
  };

  preSubmit = () => {
    this.setState( {
      name: this.state.name.trim(),
      phone: this.state.phone.trim(),
      email: this.state.email.trim().toLowerCase(),
      nameError: '',
      phoneError: '',
      emailError: ''
    }, () => {
      if (
        !this.state.name
      ) {
        this.setState( {
          nameError: 'Name is required field'
        } );
      } else if (
        this.state.phone &&
        !utils.isValidPhone( this.state.phone )
      ) {
        this.setState( {
          phoneError: 'Bad phone number'
        } );
      } else if (
        this.state.email &&
        !utils.isValidEmail( this.state.email )
      ) {
        this.setState( {
          emailError: 'Bad email'
        } );
      } else if (
        !this.state.phone &&
        !this.state.email
      ) {
        this.setState( {
          phoneError: 'Either phone or email required!'
        } );
      } else {
        this.props.submit( {
          id: this.state.id,
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email,
          favoriteServices: this.state.favoriteServices
        } );
        this.props.close();
      }
    } );
  };

  delete = () => {
    this.props.delete( this.state.id );
    this.props.close();
  };

  componentDidMount() {
    this.nameInput.focus();
    document.addEventListener( 'keydown', this.onKeyPress, true );

    /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    shore-super-select do not responds to react onChange event.
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

    const superSelect = document.getElementById( 'superSelect' );
    superSelect.onChange = value => {
      this.favoriteServicesChange( value.detail[ 0 ].map( item => item.value ) );
    };

    /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    cross button is hidden in styled component and do not expose any events
    It can not be found using document.getElementsByClassName( 'sc-1krHM' )
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

  }

  componentWillUnmount() {
    document.removeEventListener( 'keydown', this.onKeyPress, true );
  }

  onKeyPress = ev => {
    ev.keyCode === 27 &&
    this.props.customer &&
    this.props.close();
    ev.keyCode === 13 &&
    this.props.customer &&
    this.preSubmit();
  };

  getAllServices = () => {
    return '[' + this.props.allServices.map( service => `{"value":"${service.id}","label":"${service.name}"}` )
      .join( ',' ) + ']';
  };

  getSelectedServices = () => {
    return this.state.favoriteServices.join( ',' );
  };

  render() {
    if ( !this.props.customer ) return '';
    return <div className="overlay">
      <div className="popup-overlay">
        <div className="popup">
          <shore-modal>
            <div slot="header"><h2>Customer info</h2></div>
            <div slot="content">
              <div>
                <shore-input-wrapper
                  class="fullWidth"
                  { ...( this.state.nameError && { error: this.state.nameError } ) }
                >
                  <input
                    type="text"
                    placeholder="Required"
                    value={ this.state.name }
                    onChange={ this.nameChange }
                    ref={ ( input ) => { this.nameInput = input; } }
                  />
                  <label>Name</label>
                </shore-input-wrapper>
              </div>
              <div>
                <shore-input-wrapper
                  class="fullWidth"
                  { ...( this.state.phoneError && { error: this.state.phoneError } ) }
                >
                  <input
                    type="text"
                    value={ this.state.phone }
                    onChange={ this.phoneChange }
                  />
                  <label>Phone</label>
                </shore-input-wrapper>
              </div>
              <div>
                <shore-input-wrapper
                  class="fullWidth"
                  { ...( this.state.emailError && { error: this.state.emailError } ) }
                >
                  <input
                    type="text"
                    value={ this.state.email }
                    onChange={ this.emailChange }
                  />
                  <label>Email</label>
                </shore-input-wrapper>
              </div>
            </div>
            <div slot="footer">
              <shore-super-select
                id="superSelect"
                class="fullWidth"
                options={ this.getAllServices() }
                label="Customer favorite services"
                searchable
                multi
                value={ this.getSelectedServices() }
              ></shore-super-select>
              <br />
              <shore-button variant="primary" onClick={ this.preSubmit }>Save</shore-button>
              {
                this.state.id &&
                <shore-button variant="cta" class="paddingLeft20" onClick={ this.delete }>Delete</shore-button>
              }
              <shore-button class="paddingLeft20" onClick={this.props.close}>Cancel</shore-button>
            </div>
          </shore-modal>
        </div>
      </div>
    </div>;
  }
}

DialogCustomer.propTypes = {
  allServices: PropTypes.array.isRequired,
  customer: PropTypes.any,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired
};

const mapStateToProps = state => ( {
  customer: selectors.getCustomerById( state, selectors.getEditCustomerId( state ) )
} );

const mapDispatchToProps = dispatch => ( {
  submit: customer => dispatch( actions.submitCustomer( customer ) ),
  delete: id => dispatch( actions.deleteCustomer( id ) ),
  close: () => dispatch( actions.editCustomerId( constants.IDLE ) )
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( DialogCustomer );
