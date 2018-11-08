/*
 *
 * BlogPostSummary reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';

import { FILTER_POSTS, API_ERROR, API_SUCCESS } from './constants';

export const initialState = fromJS({
  posts: [],
  filteredPosts: [],
});

function blogPostSummaryReducer(state = initialState, action) {
  switch (action.type) {
    case API_SUCCESS: {
      const orderedPosts = _.orderBy(
        action.payload,
        d => d.fields.publishDatetime,
        'desc',
      );
      return state.merge({
        posts: orderedPosts,
        filteredPosts: orderedPosts,
      });
    }

    case API_ERROR: {
      return state;
    }

    case FILTER_POSTS: {
      if (action.value === '') {
        return state.set('filteredPosts', state.toJS().posts);
      }
      const filteredPosts = _.filter(state.toJS().posts, d =>
        d.fields.tags.includes(action.value),
      );
      return state.set('filteredPosts', filteredPosts);
    }

    default:
      return state;
  }
}

export default blogPostSummaryReducer;
