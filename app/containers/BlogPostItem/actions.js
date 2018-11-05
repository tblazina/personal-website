/*
 *
 * BlogPostItem actions
 *
 */

import { LOAD_POST, API_ERROR, API_SUCCESS } from './constants';

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

export function loadPost(id) {
  return {
    type: LOAD_POST,
    id,
  };
}
