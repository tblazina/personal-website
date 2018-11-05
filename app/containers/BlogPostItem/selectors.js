import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blogPostItem state domain
 */

const selectBlogPostItemDomain = state =>
  state.get('blogPostItem', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlogPostItem
 */

const makeSelectBlogPostItem = () =>
  createSelector(selectBlogPostItemDomain, substate => substate.toJS());

export default makeSelectBlogPostItem;
export { selectBlogPostItemDomain };
