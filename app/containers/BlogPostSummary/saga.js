/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import * as contentful from 'contentful';

import { LOAD_POSTS } from './constants';
import { apiSuccess, apiError } from './actions';

// import request from 'utils/request';
// import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */

const client = contentful.createClient({
  space: 'ful6an5guvso',
  accessToken:
    '1c6f7860f901a4802da316efa8d12f20d8243198e70ad2edd222d1c45c594424',
});

const fetchPosts = () =>
  client.getEntries({
    content_type: 'blogpost',
    order: 'fields.publishDatetime',
  });

export function* getRepos() {
  try {
    const posts = yield call(fetchPosts);

    yield put(apiSuccess(posts.items));
  } catch (e) {
    console.log(e);
    yield put(apiError(e));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_POSTS, getRepos);
}
