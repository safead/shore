import React, { Component } from 'react';
import * as utils from 'common/utils';
import * as constants from 'common/constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectors } from 'store/selectors';

export class Info extends Component {
  render() {
    const [ first, last ] = utils.splitName( constants.AUTHOR );
    return (
      <div>
        <div className="red-border">
          <shore-app-wrapper notopmargin>
            <div className="example-content divFlex">
              <shore-initials first={ first } last={ last } bgcolor="#97c60b" class="about">
              </shore-initials>
              { constants.AUTHOR } challenge<br />
              {
                this.props.isOnline ? 'App is now: online ' : ' App is now: offline '
              }
            </div>
          </shore-app-wrapper>
        </div>
      </div>
    );
  }
}

Info.propTypes = {
  isOnline: PropTypes.bool.isRequired
};

const mapStateToProps = state => ( {
  isOnline: selectors.isOnline( state )
} );

export default connect(
  mapStateToProps
)( Info );
