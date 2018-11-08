/*
 *
 * BlogPostSummary actions
 *
 */

import { FILTER_POSTS, LOAD_POSTS, API_ERROR, API_SUCCESS } from './constants';

export function apiSuccess(data) {
  return {
    type: API_SUCCESS,
    payload: data,
  };
}

export function apiError() {
  return {
    type: API_ERROR,
  };
}

export function loadPosts() {
  return {
    type: LOAD_POSTS,
  };
}

export function filterPosts(value) {
  return {
    type: FILTER_POSTS,
    value,
  };
}
