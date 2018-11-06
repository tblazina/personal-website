/**
 *
 * AboutMe
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Grid, Card, CardMedia } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';

import EmojiSupport from '../../utils/markdown_styles/EmojiSupport';

const image = require('../../images/me.png');
const source = require('./aboutme.md');

const StyledImage = styled.img`
  height: 30em;
  max-width: auto;
`;
const StyledMarkdown = styled(ReactMarkdown)`
  margin-top: 20px;
  text-align: justify;

  & p {
    padding-bottom: 10px;
  }
`;

function AboutMe() {
  return (
    <div>
      <Grid container>
        <Grid item sm={3} />
        <Grid item sm={6}>
          <Card style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0, 0)' }}>
            <CardMedia src={image} component="a">
              <StyledImage src={image} alt="me" />
            </CardMedia>
            {/* <StyledImage src={image} alt="me" /> */}
            <StyledMarkdown
              source={source}
              renderers={{ text: EmojiSupport }}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

AboutMe.propTypes = {};

export default AboutMe;
