import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SubscriptionSwitcher from 'subscriptions/SubscriptionSwitcher';
import Box from 'common/Box';
import Link from 'common/Link';
import Button from 'forms/Button';
import * as routes from 'app/routes';
import cn from 'classnames';
import add_green_circle from 'common/img/add_green_circle.svg';
import styles from './Subscription.module.css';
import { fetchFiltered } from '../../insurance/insuranceContracts/api';
import { getAttSubscription } from 'reducers';

export const SubscriptionScreen = ({ subId, subscription }) => {
  const [showInsuranceLink, setShowInsuranceLink] = useState(false);
  const [showPlanLink, setShowPlanLink] = useState(false);
  const [sku, setSku] = useState('');

  useEffect(() => {
    fetchFiltered({subscription: subId}).then(res => {
      if (res.data && res.data.count > 0) {
        setShowInsuranceLink(false);
        setShowPlanLink(false)
      } else {
        setShowInsuranceLink(true);
      }
    });
  }, [subId]);

  useEffect(() => {
    if (!subscription) return;

    setSku(subscription.device_specs);

    const subStatus = subscription.att_status || subscription.sprint_status;

    if (subStatus === 'active') {
      setShowPlanLink(false);
    } else {
      setShowPlanLink(true)
    }
  }, [subscription]);

  return (
    <div className="Subscription">
      <SubscriptionSwitcher attSubId={subId} attRoute={routes.attSubscription} sprintRoute={routes.sprintSubscription} />
      <div className={styles.linkList}>
        <Link
          className={cn(
            styles.subscriptionLink,
            showInsuranceLink ? '' : styles.hidden
          )}
          to={routes.attInsurance(subId)}
        >
          <Box>
            <img src={add_green_circle} />
            Insurance
          </Box>
        </Link>
        <Link
          className={cn(showPlanLink ? '' : styles.hidden)}
          to={routes.attInsurancePlan(subId, sku)}
        >
          <div className={styles.buttonChoose}>
            <Button>Choose insurance plan</Button>
          </div>
        </Link>
      </div>
    </div>
  )
};

const mapStateToProps = (state, { subId }) => ({
  subscription: getAttSubscription(state, subId)
});

export default connect(
  mapStateToProps
)(SubscriptionScreen)
