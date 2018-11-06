import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_ACTIVTIES } from './constants';
import { apiSuccess, apiError } from './actions';

localStorage.STRAVA_TOKEN = process.env.STRAVA_TOKEN;
localStorage.STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

axios.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      return axios
        .post('https://www.strava.com/oauth/token', {
          refresh_token: localStorage.STRAVA_REFRESH_TOKEN,
          grant_type: 'refresh_token',
          client_id: process.env.STRAVA_CLIENT_ID,
          client_secret: process.env.STRAVA_CLIENT_SECRET,
        })
        .then(response => {
          localStorage.STRAVA_TOKEN = response.data.access_token;
          localStorage.STRAVA_REFRESH_TOKEN = response.data.refresh_token;
          return axios(originalRequest);
        });
    }
    return null;
  },
);

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.STRAVA_TOKEN}`,
  },
  params: {
    per_page: 100,
  },
};

const fetchActivties = () =>
  axios
    .get('https://www.strava.com/api/v3/athlete/activities', config)
    .then(response => response);

export function* getActivties() {
  try {
    const activities = yield call(fetchActivties);
    yield put(apiSuccess(activities.data));
  } catch (e) {
    console.log(e);
    yield put(apiError(e));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_ACTIVTIES, getActivties);
}
