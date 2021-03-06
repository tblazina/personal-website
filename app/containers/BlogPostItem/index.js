/**
 *
 * BlogPostItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, CircularProgress } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import _ from 'lodash';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectBlogPostItem from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import CodeBlock from '../../utils/markdown_styles/CodeBlock';
import EmojiSupport from '../../utils/markdown_styles/EmojiSupport';

const StyledReactMarkdown = styled(ReactMarkdown)`
  padding: 25px;
`;

const StyledMarkdownImage = styled.img`
  display: block;
  margin: 0 auto;
`;

const StyleMarkdownHeading = styled.h3`
  text-align: left;
`;

const StyledMarkdownTable = styled.table`
  & th {
    text-align: center;
  }
  & td {
    padding: 7px;
    text-align: center;
  }
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

/* eslint-disable react/prefer-stateless-function */
export class BlogPostItem extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(actions.loadPost(id));
  }

  render() {
    const { post } = this.props.blogpostitem;

    if (_.isEmpty(post)) {
      return <CircularProgress />;
    }

    return (
      <div>
        <Helmet>
          <title>{post.fields.title}</title>
          <meta name="description" content={post.fields.title} />
        </Helmet>
        <Grid container>
          <Grid item sm={2} />
          <Grid item sm={8}>
            <h1 style={{ textAlign: 'center', color: '#209CEE' }}>
              {post.fields.title}
            </h1>
            <StyledReactMarkdown
              source={post.fields.content}
              escapeHtml={false}
              renderers={{
                code: CodeBlock,
                image: StyledMarkdownImage,
                heading: StyleMarkdownHeading,
                text: EmojiSupport,
                table: StyledMarkdownTable,
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

BlogPostItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string,
  post: PropTypes.object,
  blogpostitem: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  blogpostitem: makeSelectBlogPostItem(),
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

const withReducer = injectReducer({ key: 'blogPostItem', reducer });
const withSaga = injectSaga({ key: 'blogPostItem', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogPostItem);
