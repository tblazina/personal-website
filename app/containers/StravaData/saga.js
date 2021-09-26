import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_ACTIVTIES, LOAD_STATS } from './constants';
import { apiSuccess, apiError } from './actions';

localStorage.STRAVA_TOKEN = process.env.STRAVA_TOKEN;
localStorage.STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;
localStorage.STRAVA_AUTH_CODE = process.env.STRAVA_AUTH_CODE;

axios.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !error.config.isRetryRequest) {
      /* eslint-disable no-param-reassign */
      error.config.isRetryRequest = true;
      return axios
        .post('https://www.strava.com/api/v3/oauth/token', {
          refresh_token: localStorage.STRAVA_REFRESH_TOKEN,
          // grant_type: 'refresh_token',
          client_id: process.env.STRAVA_CLIENT_ID,
          client_secret: process.env.STRAVA_CLIENT_SECRET,
          code: process.env.STRAVA_AUTH_CODE,
          // scope: 'activity:read_all',
        })
        .then(response => {
          localStorage.STRAVA_TOKEN = response.data.access_token;
          localStorage.STRAVA_REFRESH_TOKEN = response.data.refresh_token;
          originalRequest.headers.Authorization = `Bearer ${
            localStorage.STRAVA_TOKEN
          }`;
          return axios(originalRequest);
        });
    } else if (error.response.status === 400) {
      console.log(error.config);
    }
    return Promise.reject(error);
  },
);

const fetchStats = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.STRAVA_TOKEN}`,
    },
  };
  return axios
    .get('https://www.strava.com/api/v3/athletes/319507/stats', config)
    .then(response => response);
};

const fetchActivties = payload => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.STRAVA_TOKEN}`,
    },
    params: {
      page: payload.page,
      per_page: payload.rowsPerPage,
    },
  };
  console.log(config);
  return axios
    .get(`https://www.strava.com/api/v3/athlete/activities`, config)
    .then(response => response);
};

export function* getActivties(payload) {
  try {
    const activities = yield call(fetchActivties, payload);
    activities.data.flag = 'activities';
    yield put(apiSuccess(activities.data));
  } catch (e) {
    console.log(e);
    yield put(apiError(e));
  }
}

export function* getStats(payload) {
  try {
    const stats = yield call(fetchStats, payload);
    stats.data.flag = 'stats';
    yield put(apiSuccess(stats.data));
  } catch (e) {
    console.log(e);
    yield put(apiError(e));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_ACTIVTIES, getActivties);
  yield takeLatest(LOAD_STATS, getStats);
}
