import { put, call } from 'redux-saga/effects';
import { authenticateUser } from 'auth/sagas';
import { sprintInsuranceConfirm, attInsurancePlan } from 'app/routes';
import { setRedirect } from 'auth/actions';

export function* sprintInsuranceConfirmNavigate({insPlanId}) {
  yield put(setRedirect(sprintInsuranceConfirm(insPlanId)));
  yield call(authenticateUser);
};

export function* attInsuranceConfirmNavigate() {
  yield call(authenticateUser);
};

