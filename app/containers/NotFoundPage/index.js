/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid } from '@material-ui/core';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item sm={2} />
          <Grid item sm={8}>
            <h1 style={{ textAlign: 'center' }}>
              <FormattedMessage {...messages.header} />
            </h1>
          </Grid>
        </Grid>
      </div>
    );
  }
}
