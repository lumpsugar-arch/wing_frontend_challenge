import { all, call, put, takeEvery } from 'redux-saga/effects';
import { navigate } from 'redux-saga-first-router';
import { create as createContract } from './insuranceContracts/actions';
import { activate as activateContract } from './insuranceContracts/actions';
import { create as createDevices } from './insuredDevices/actions';
import { info, error } from '../notifications/actions'
import * as types from './types';

export function* create({ payload }) {
  const { subscription, plan_type, contract, device_specs, att_subscription } = payload;
  const redirectTo = subscription ? 'SPRINT_SUBSCRIPTION' : 'ATT_SUBSCRIPTION';

  try {
    yield put(createContract({subscription, att_subscription}));
    yield put(createDevices({
      contract,
      plan_type,
      device_specs
    }));
    yield put(activateContract(subscription));
    yield put(navigate(redirectTo, { subId: subscription || att_subscription}));
    yield put(info(1, 'Your plan was confirmed successfully!'));
  } catch (e) {
    yield put(error(1, e));
  }
}

export function* watchInsurance() {
  yield all([
    call(watchCreateSprintPurchase)
  ]);
}

export function* watchCreateSprintPurchase() {
  yield takeEvery(types.CREATE_SPRINT_PURCHASE, create);
  yield takeEvery(types.CREATE_ATT_PURCHASE, create)
}
