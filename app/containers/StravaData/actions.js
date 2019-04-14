/*
 *
 * StravaData actions
 *
 */

import {
  API_SUCCESS,
  API_ERROR,
  LOAD_ACTIVTIES,
  LOAD_STATS,
} from './constants';

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

export function loadActivties(page, rowsPerPage) {
  return {
    type: LOAD_ACTIVTIES,
    page,
    rowsPerPage,
  };
}

export function loadStats() {
  return {
    type: LOAD_STATS,
  };
}
