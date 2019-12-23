import { put, call, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as types from './types';
import * as api from './api';
import * as actions from './actions';
import { setInsuranceContract as setSprintContract } from 'subscriptions/sprint/actions';
import { setInsuranceContract as setAttContract } from 'subscriptions/att/actions';

import { findGenerator, getAllGenerator, updateGenerator } from 'helpers/resourceSagas';

export function* create({payload}) {
  yield call(api.create, payload)
}

export function* activate({ payload }) {
  yield call(api.activate, payload.id)
}

export const find = findGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.find
});

export const fetchFiltered = getAllGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.fetchFiltered,
  endpointArgs: (payload) => [ payload.params ],
});

export function* watchFind() {
  yield takeEvery(types.FIND, find);
}

export function* watchFetchFiltered() {
  yield takeLatest(types.FETCH_FILTERED, fetchFiltered);
}

export function* watchCreate() {
  yield takeEvery(types.CREATE, create);
}

export function* watchActivate() {
  yield takeEvery(types.ACTIVATE, activate)
}

export function* watchInsuranceContracts() {
  yield all([
    call(watchFind),
    call(watchFetchFiltered),
    call(watchCreate),
    call(watchActivate)
  ]);
}
