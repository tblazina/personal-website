/**
 *
 * BlogPostSummary
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import {
  Avatar,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  InputLabel,
  CircularProgress,
  Slide,
  Select,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import _ from 'lodash';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectBlogPostSummary from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import EmojiSupport from '../../utils/markdown_styles/EmojiSupport';

const StyledPaper = styled(Paper)`
  margin-bottom: 30px;
`;

const StyledHeader2 = styled.h3`
  color: #209cee;
  margin-left: 24px;
`;

const StyledHeader3 = styled.h4`
  color: #209cee;
  margin-left: 24px;
`;

const StyledBody = styled.p`
  padding: 24px;
`;

const StyledAvatar = styled(Avatar)`
  margin-left: 24px;
  margin-top: 1.5em;
`;

const StyledReactMarkdown = styled(ReactMarkdown)`
  margin-left: 24px;
  margin-right: 24px;
  text-align: justify;
  text-justify: inter-word;
`;

const StyledGrid = styled(Grid)`
  color: gray;
  text-align: right;
`;

const StyledSelect = styled(Select)`
  width: 100px;
  font-size: 18px;
`;

/* eslint-disable react/prefer-stateless-function */
export class BlogPostSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: 'tags',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    if (_.isEmpty(this.props.posts)) {
      this.props.dispatch(actions.loadPosts());
    }
  }

  handleSelect(value) {
    this.props.dispatch(actions.filterPosts(value.target.value));
    this.state.tag = value.target.value;

    return value;
  }

  render() {
    const { posts, filteredPosts } = this.props.blogpostsummary;
    if (_.isEmpty(posts)) {
      return <CircularProgress />;
    }
    let tags = [];
    if (!_.isEmpty(posts)) {
      posts.map(d => tags.push(d.fields.tags));
      tags = _.uniq(_.flatten(tags));
    }

    return (
      <div>
        <Helmet>
          <title> Posts </title>
          <meta name="Blog post summary" content="Blog posts summary" />
        </Helmet>
        <Grid container>
          <Grid item sm={1} />
          <Grid item sm={10}>
            <FormControl>
              <InputLabel style={{ fontSize: '18px' }} htmlFor="tags-simple">
                Tags
              </InputLabel>
              <StyledSelect value={this.state.tag} onChange={this.handleSelect}>
                <MenuItem style={{ fontSize: '15px' }} value="">
                  <em> All Posts </em>
                </MenuItem>
                {tags.map(d => (
                  <MenuItem style={{ fontSize: '15px' }} value={d} key={d}>
                    {d}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
            <br />
            {filteredPosts.map(d => (
              <div key={d.sys.id}>
                <Slide in direction="right" timeout={500}>
                  <StyledPaper>
                    <Grid container>
                      <Grid>
                        <StyledAvatar
                          alt="Cover photo"
                          src={d.fields.coverPhoto.fields.file.url}
                        />
                      </Grid>
                      <Grid>
                        <StyledHeader2>
                          {d.fields.publishDatetime.slice(0, 10)}
                        </StyledHeader2>
                      </Grid>
                      <StyledGrid item sm={10}>
                        {d.fields.tags.join(', ')}
                      </StyledGrid>
                    </Grid>
                    <StyledHeader3>{d.fields.title}</StyledHeader3>
                    <StyledReactMarkdown
                      source={`${d.fields.content
                        .split(' ')
                        .slice(0, 100)
                        .join(' ')}...`} // Split the content to first 100 words and add ...
                      renderers={{
                        code: () => null, // Don't render code in summary
                        image: () => null, // Don't render images in the summary
                        heading: () => null, // Don't render headings in summary
                        text: EmojiSupport,
                      }}
                    />

                    <StyledBody>
                      <Link to={`/posts/${d.sys.id}`} href="/posts/id">
                        Read more
                      </Link>
                    </StyledBody>
                  </StyledPaper>
                </Slide>
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

BlogPostSummary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  blogpostsummary: PropTypes.object,
  posts: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  blogpostsummary: makeSelectBlogPostSummary(),
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

const withReducer = injectReducer({ key: 'blogPostSummary', reducer });
const withSaga = injectSaga({ key: 'blogPostSummary', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogPostSummary);
