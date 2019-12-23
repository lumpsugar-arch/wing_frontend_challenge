import React, {useEffect, useCallback} from 'react';
import * as routes from 'app/routes';
import Back from 'common/Back';
import DeviceInfo from 'devices/DeviceInfo';
import BottomButton from 'forms/BottomButton/link';
import Box from 'common/Box';
import PlanInfo from 'insurance/insurancePlans/PlanInfo';
import styles from '../../insurance/InsuranceInfo/InsuranceInfo.module.css';

const InsuranceConfirm = (props) => {
  const { insurancePlan, subId, sku, createPurchase, type } = props;

  useEffect(() => {
    props.find(props.plan);
  }, [props.plan]);

  const onButtonClickHandler = useCallback(() => {
    const subKey = type === 'sprint' ? 'subscription' : 'att_subscription';
    createPurchase({
      [subKey]: subId,
      contract: subId,
      device_specs: sku,
      plan_type: type,
    })
  }, [props]);

  return (
    <div>
      <div>
        <Back to={type === 'sprint' ? routes.sprintInsurancePlan(subId, sku) : routes.attInsurancePlan(subId, sku)} />
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
