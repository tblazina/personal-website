/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import { LOAD_PHOTOS } from './constants';
import { apiSuccess, apiError } from './actions';
import contentfulClient from '../../utils/helper_functions/contentful';
// import request from 'utils/request';
// import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */

const fetchPhotos = () =>
  contentfulClient.getEntries({ content_type: 'photo' });

export function* getPhotos() {
  try {
    const photos = yield call(fetchPhotos);
    yield put(apiSuccess(photos.items));
  } catch (e) {
    console.log(e);
    yield put(apiError(e));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* photoData() {
  // Watches for LOAD_REPOS actions and calls getPhotos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_PHOTOS, getPhotos);
}
