import { connect, } from 'react-redux';
import InsuranceConfirm from './InsuranceConfirm';
import { getInsurancePlan, getDevice } from 'reducers'
import { find } from '../../insurance/insurancePlans/actions';
import { createSprintPurchase } from '../../insurance/actions';

const mapStateToProps = (state, ownProps) => {
  const plan = state.routing.params.insPlanId;
  const insurancePlan = getInsurancePlan(state, plan);
  return {
    subId: ownProps.subId,
    plan,
    insurancePlan
}};

const mapDispatchToProps = {
  find,
  createSprintPurchase
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsuranceConfirm);
