import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the photos state domain
 */

const selectPhotosDomain = state => state.get('photos', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Photos
 */

const makeSelectPhotos = () =>
  createSelector(selectPhotosDomain, substate => substate.toJS());

export default makeSelectPhotos;
export { selectPhotosDomain };
