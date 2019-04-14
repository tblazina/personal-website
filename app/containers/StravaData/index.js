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
import { Emoji } from 'emoji-mart';
import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment/moment.js'; /*eslint-disable-line */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStravaData from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import reduceCollection from '../../utils/helper_functions/lodash';

/* eslint-disable react/prefer-stateless-function */
const PageDiv = styled.div`
  margin-left: 5vw;
`;

const emojiMap = {
  Run: 'runner',
  BackcountrySki: 'ski',
  Hike: 'footprints',
  Ride: 'bike',
};
export class StravaData extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  handleChangePage(event, page) {
    this.setState({ page });
    this.props.dispatch(
      actions.loadActivties(page + 1, this.state.rowsPerPage),
    );
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
    this.props.dispatch(
      actions.loadActivties(this.state.page + 1, event.target.value),
    );
  }

  componentWillMount() {
    this.props.dispatch(actions.loadActivties(1, this.state.rowsPerPage));
    this.props.dispatch(actions.loadStats());
  }

  rowFormater(row, key) {
    if (key === 'type') {
      return (
        <TableCell>
          <Emoji
            emoji={{ id: emojiMap[row[key]] }}
            key={Math.random()}
            size={26}
          />
        </TableCell>
      );
    } else if (key === 'start_date_local') {
      const dateFormated = new Date(row[key]).toLocaleDateString();
      return <TableCell key={Math.random()}>{dateFormated}</TableCell>;
    } else if (key === 'distance') {
      // Round to two decimal places
      const distanceFormated = `${(row[key] / 1000).toFixed(2)} km`;
      return <TableCell key={Math.random()}>{distanceFormated}</TableCell>;
    } else if (key === 'moving_time') {
      // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
      const movingTimeFormated = moment()
        .startOf('day')
        .seconds(row[key])
        .format('HH:mm:ss');
      return <TableCell key={Math.random()}>{movingTimeFormated}</TableCell>;
    } else if (key === 'total_elevation_gain') {
      return <TableCell key={Math.random()}>{`${row[key]} m`}</TableCell>;
    }
    return <TableCell key={Math.random()}>{row[key]}</TableCell>;
  }

  render() {
    const { activities, totalActivties } = this.props.stravadata;
    const keys = [
      'type',
      'moving_time',
      'distance',
      'name',
      'start_date_local',
      'total_elevation_gain',
    ];
    let table = reduceCollection(activities, keys);
    table = table.slice(0, this.state.rowsPerPage);
    return (
      <div>
        <Helmet>
          <title>My Strava Data</title>
          <meta name="description" content="My Strava Data" />
        </Helmet>
        <PageDiv>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  {keys.map(key => (
                    <TableCell key={Math.random()}>
                      {_.startCase(key)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map(row => (
                  <TableRow>
                    {keys.map(key => this.rowFormater(row, key))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalActivties}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </PageDiv>
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
