import { fromJS } from 'immutable';
import blogPostItemReducer from '../reducer';

describe('blogPostItemReducer', () => {
  it('returns the initial state', () => {
    expect(blogPostItemReducer(undefined, {})).toEqual(fromJS({}));
  });
});
