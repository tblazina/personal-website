/*
 *
 * StravaData reducer
 *
 */

import { fromJS } from 'immutable';
import { API_ERROR, API_SUCCESS } from './constants';

export const initialState = fromJS({
  activities: [],
  totalActivies: 0,
  stats: [],
});

function stravaDataReducer(state = initialState, action) {
  switch (action.type) {
    case API_SUCCESS: {
      if (action.payload.flag === 'activities') {
        return state.set('activities', action.payload);
      } else if (action.payload.flag === 'stats') {
        const totalActivities =
          action.payload.all_ride_totals.count +
          action.payload.all_run_totals.count;
        return state
          .set('stats', action.payload)
          .set('totalActivties', totalActivities);
      }
      return state;
    }

    case API_ERROR: {
      return state;
    }

    default:
      return state;
  }
}

export default stravaDataReducer;
