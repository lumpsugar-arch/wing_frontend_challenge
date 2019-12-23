import React, {useEffect, useCallback} from 'react';
import * as routes from 'app/routes';
import Back from 'common/Back';
import DeviceInfo from 'devices/DeviceInfo';
import BottomButton from 'forms/BottomButton/link';
import Box from 'common/Box';
import PlanInfo from 'insurance/insurancePlans/PlanInfo';
import styles from '../../insurance/InsuranceInfo/InsuranceInfo.module.css';

const InsuranceConfirm = (props) => {
  const { insurancePlan, subId, sku, createSprintPurchase } = props;

  useEffect(() => {
    props.find(props.plan);
  }, [insurancePlan]);

  const onButtonClickHandler = useCallback(() => {
    createSprintPurchase({
      subscription: subId,
      sku,
      contract: subId,
      device_specs: sku,
      plan_type: 'sprint'
    })
  }, [props]);

  return (
    <div>
      <div>
        <Back to={routes.sprintInsurancePlan(subId, sku)} />
      </div>

      <h1>Confirm your plan selection</h1>

      <DeviceInfo deviceId={sku} />

      <Box className={styles.makeClaim}>
        <PlanInfo insurancePlan={insurancePlan} />
        <BottomButton onClick={onButtonClickHandler}>Confirm Plan Selection</BottomButton>
      </Box>
    </div>
  )
}

export default InsuranceConfirm;
