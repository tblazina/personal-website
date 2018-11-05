/**
 *
 * AboutMe
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const content = require('./text.md');

function AboutMe() {
  return (
    <div>
      <ReactMarkdown source={content} />
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AboutMe.propTypes = {};

export default AboutMe;
