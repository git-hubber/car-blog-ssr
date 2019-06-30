import { call, all, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { TryFetchPostItems, TryFetchUser, TryFetchPost } from "../actions";

function* fetchPostItems(action: TryFetchPostItems) {
  const { payload } = action;

  const results = yield call(() =>
    axios.get(
      `https://jsonplaceholder.typicode.com/posts?_start=${payload}&_limit=10`
    )
  );

  yield put({
    type: "FETCH_POST_ITEMS_SUCCESS",
    payload: results.data
  });
}

function* fetchPost(action: TryFetchPost) {
  const { payload } = action;

  const results = yield call(() =>
    axios.get(`https://jsonplaceholder.typicode.com/posts/${payload}`)
  );

  yield put({
    type: "FETCH_POST_SUCCESS",
    payload: results.data
  });
}

function* fetchUser(action: TryFetchUser) {
  const { payload } = action;
  const results = yield call(() =>
    axios.get(`https://jsonplaceholder.typicode.com/users/${payload}`)
  );
  const {
    id: userId,
    name,
    company: { name: companyName }
  } = results.data;

  yield put({
    type: "FETCH_USER_SUCCESS",
    payload: { userId, name, companyName }
  });
}

function* watchPostItems() {
  yield takeLatest("TRY_FETCH_POST_ITEMS", fetchPostItems);
  yield takeLatest("TRY_FETCH_MORE_POST_ITEMS", fetchPostItems);
}

function* watchPost() {
  yield takeLatest("TRY_FETCH_POST", fetchPost);
}

function* watchUser() {
  yield takeLatest("TRY_FETCH_USER", fetchUser);
}

export default function* rootSaga() {
  yield all([watchPostItems(), watchPost(), watchUser()]);
}
