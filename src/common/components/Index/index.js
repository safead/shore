import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from 'store/actions';
import { Navigation, Content } from 'common/components';
import { selectors } from 'store/selectors';
import { BrowserRouter as Router } from 'react-router-dom';

export class Index extends Component {

  componentDidMount() {
    this.props.initApp();
  }

  render() {
    return <Router>
      <div className="contentDiv">
        <shore-overlay-layout class="mainOverlay">
          <div slot="header">
            <h2 className="noMargin">
              Moomin Hair Salon
              {
                this.props.networkActivity &&
                <shore-spinner class="loadingSpinner paddingLeft20"> </shore-spinner>
              }
            </h2>
          </div>
          <div slot="navigation">
            <Navigation />
          </div>
          <Content />
          <div slot="footer">&copy; 2019 Shore GmbH</div>
        </shore-overlay-layout>
      </div>
    </Router>;
  }
}

Index.propTypes = {
  networkActivity: PropTypes.bool.isRequired,
  isOnline: PropTypes.bool.isRequired,
  initApp: PropTypes.func.isRequired
};

const mapStateToProps = state => ( {
  networkActivity: selectors.getNetworkActivity( state ),
  isOnline: selectors.isOnline( state )
} );

const mapDispatchToProps = dispatch => ( {
  initApp: payload => dispatch( actions.initApp() )
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Index );
