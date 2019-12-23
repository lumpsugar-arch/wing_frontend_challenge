import { all, call, put, takeEvery } from 'redux-saga/effects';
import { navigate } from 'redux-saga-first-router';
import { create as createContract } from './insuranceContracts/actions';
import { activate as activateContract } from './insuranceContracts/actions';
import { create as createDevices } from './insuredDevices/actions';
import * as types from './types';

export function* create({ payload }) {
  const { subscription, sku, plan_type, contract, device_specs } = payload;
  const redirectDomain = subscription ? 'SPRINT_SUBSCRIPTION' : 'ATT_SUBSCRIPTION';
  yield put(createContract({ subscription }));
  yield put(createDevices({
    contract,
    plan_type,
    device_specs
  }));
  yield put(activateContract(subscription));
  yield put(navigate(redirectDomain, { subId: subscription }));
}

export function* watchInsurance() {
  yield all([
    call(watchCreateSprintPurchase)
  ]);
}

export function* watchCreateSprintPurchase() {
  yield takeEvery(types.CREATE_SPRINT_PURCHASE, create)
}
