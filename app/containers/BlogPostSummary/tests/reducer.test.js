import { fromJS } from 'immutable';
import blogPostSummaryReducer from '../reducer';

describe('blogPostSummaryReducer', () => {
  it('returns the initial state', () => {
    expect(blogPostSummaryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
