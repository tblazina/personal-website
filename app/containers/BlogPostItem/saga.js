/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import { LOAD_POST } from './constants';
import { apiSuccess, apiError } from './actions';
import contentfulClient from '../../utils/helper_functions/contentful';

/**
 * Github repos request/response handler
 */

const fetchPosts = id => contentfulClient.getEntry(id);

export function* getPost(payload) {
  try {
    const post = yield call(fetchPosts, payload.id);

    yield put(apiSuccess(post));
  } catch (e) {
    console.log(e);
    yield put(apiError(e));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* blogPostData() {
  // Watches for LOAD_REPOS actions and calls getPost when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_POST, getPost);
}
