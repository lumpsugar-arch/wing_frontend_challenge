import { connect, } from 'react-redux';
import InsuranceConfirm from './InsuranceConfirm';
import { getInsurancePlan } from 'reducers'
import { find } from '../../insurance/insurancePlans/actions';
import { createSprintPurchase as createPurchase } from '../../insurance/actions';

const mapStateToProps = (state, ownProps) => {
  const plan = state.routing.params.insPlanId;
  const insurancePlan = getInsurancePlan(state, plan);
  return {
    subId: ownProps.subId,
    type: 'sprint',
    plan,
    insurancePlan
}};

const mapDispatchToProps = {
  find,
  createPurchase
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsuranceConfirm);
