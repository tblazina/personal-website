/*
 *
 * BlogPostSummary reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';

import { API_ERROR, API_SUCCESS } from './constants';

export const initialState = fromJS({
  posts: [],
});

function blogPostSummaryReducer(state = initialState, action) {
  switch (action.type) {
    case API_SUCCESS: {
      const orderedPosts = _.orderBy(
        action.payload,
        d => d.fields.publishDatetime,
        'desc',
      );

      return state.set('posts', orderedPosts);
    }

    case API_ERROR: {
      return state;
    }

    default:
      return state;
  }
}

export default blogPostSummaryReducer;
