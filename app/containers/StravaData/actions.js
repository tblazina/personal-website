/*
 *
 * StravaData actions
 *
 */

import { API_SUCCESS, API_ERROR, LOAD_ACTIVTIES } from './constants';

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

export function loadActivties() {
  return {
    type: LOAD_ACTIVTIES,
  };
}
