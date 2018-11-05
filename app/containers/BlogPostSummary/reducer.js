/*
 *
 * BlogPostSummary reducer
 *
 */

import { fromJS } from 'immutable';
import { API_ERROR, API_SUCCESS } from './constants';

export const initialState = fromJS({
  posts: [],
});

function blogPostSummaryReducer(state = initialState, action) {
  switch (action.type) {
    case API_SUCCESS: {
      return state.set('posts', action.payload);
    }

    case API_ERROR: {
      return state;
    }

    default:
      return state;
  }
}

export default blogPostSummaryReducer;
