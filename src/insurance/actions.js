import * as types from './types';

export const createSprintPurchase = (params) => ({
  type: types.CREATE_SPRINT_PURCHASE,
  payload: params
});

export const createAttPurchase = (params) => ({
  type: types.CREATE_ATT_PURCHASE,
  payload: params
});
