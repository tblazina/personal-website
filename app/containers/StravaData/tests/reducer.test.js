import { fromJS } from 'immutable';
import stravaDataReducer from '../reducer';

describe('stravaDataReducer', () => {
  it('returns the initial state', () => {
    expect(stravaDataReducer(undefined, {})).toEqual(fromJS({}));
  });
});
