/**
 *
 * Contact
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import { Grid, Paper } from '@material-ui/core';


const content = require('./text.md');




function Contact() {

  return (
    <div>
      <Grid container>
        <Grid item sm={3} />
        <Grid item sm={6}>
          <ReactMarkdown source={content} />

        </Grid>
      </Grid>

    </div>
  );
}

Contact.propTypes = {};

export default Contact;
