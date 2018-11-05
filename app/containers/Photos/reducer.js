/*
 *
 * Photos reducer
 *
 */

import { fromJS } from 'immutable';
import { API_ERROR, API_SUCCESS } from './constants';

export const initialState = fromJS({
  photos: [],
});
function photosReducer(state = initialState, action) {
  switch (action.type) {
    case API_SUCCESS: {
      return state.set('photos', action.payload);
    }

    case API_ERROR: {
      return state;
    }

    default:
      return state;
  }
}

export default photosReducer;
