/**
 *
 * Contact
 *
 */

import React from 'react';
import { Grid } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import EmojiSupport from '../../utils/markdown_styles/EmojiSupport';

const source = require('./contactme.md');

const StyledMarkdown = styled(ReactMarkdown)`
  text-align: center;
`;

function Contact() {
  return (
    <div>
      <Grid container>
        <Grid item sm={2} />
        <Grid item sm={7}>
          <StyledMarkdown
            source={source}
            renderers={{
              text: EmojiSupport,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Contact.propTypes = {};

export default Contact;
