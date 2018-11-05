/*
 *
 * Photos actions
 *
 */

import { LOAD_PHOTOS, API_ERROR, API_SUCCESS } from './constants';

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

export function loadPhotos(id) {
  return {
    type: LOAD_PHOTOS,
    id,
  };
}
