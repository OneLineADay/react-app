import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  EntryTypes,
  createEntryFail,
  editEntryFail,
  createEntrySuccess,
  editEntrySuccess,
  fetchEntriesFail,
  fetchEntriesSuccess
} from "./entries.actions";
import { createEntry, editEntry, fetchEntries } from "../api";

function* createEntryAsyc({ payload }) {
  try {
    const data = yield createEntry(payload);
    yield put(createEntrySuccess(data));
  } catch (error) {
    yield put(createEntryFail(error));
  }
}

function* watchCreateEntryRequest() {
  yield takeLatest(EntryTypes.CREATE_ENTRY_REQUEST, createEntryAsyc);
}

function* editEntryAsync({ payload }) {
  try {
    const data = yield editEntry(payload);
    yield put(editEntrySuccess(data));
  } catch (error) {
    yield editEntryFail(error);
  }
}

function* watchEditEntryRequest() {
  yield takeLatest(EntryTypes.EDIT_ENTRY_REQUEST, editEntryAsync);
}

function* fetchEntriesAsync({ payload }) {
  try {
    const data = yield fetchEntries(payload);
    yield put(fetchEntriesSuccess(data));
  } catch (error) {
    yield put(fetchEntriesFail(error));
  }
}

function* watchFetchEntriesRequest() {
  yield takeLatest(EntryTypes.FETCH_ENTRIES_REQUEST, fetchEntriesAsync);
}

export function* entrySagas() {
  yield all([call(watchCreateEntryRequest), call(watchEditEntryRequest)]);
}
