import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blogPostSummary state domain
 */

const selectBlogPostSummaryDomain = state =>
  state.get('blogPostSummary', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlogPostSummary
 */

const makeSelectBlogPostSummary = () =>
  createSelector(selectBlogPostSummaryDomain, substate => substate.toJS());

export default makeSelectBlogPostSummary;
export { selectBlogPostSummaryDomain };
