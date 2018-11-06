/**
 *
 * StravaData
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStravaData from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class StravaData extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.loadActivties());
  }

  render() {
    const { activities } = this.props.stravadata;

    return (
      <div>
        <Helmet>
          <title>StravaData</title>
          <meta name="description" content="Description of StravaData" />
        </Helmet>
      </div>
    );
  }
}

StravaData.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activities: PropTypes.array,
  stravadata: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  stravadata: makeSelectStravaData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'stravaData', reducer });
const withSaga = injectSaga({ key: 'stravaData', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StravaData);
