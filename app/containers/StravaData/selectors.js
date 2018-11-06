import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the stravaData state domain
 */

const selectStravaDataDomain = state => state.get('stravaData', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StravaData
 */

const makeSelectStravaData = () =>
  createSelector(selectStravaDataDomain, substate => substate.toJS());

export default makeSelectStravaData;
export { selectStravaDataDomain };
