import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFiltered as fetchFilteredInsuranceContracts } from 'insurance/insuranceContracts/actions';
import { getFilteredInsuranceContracts, getSprintSubscription } from 'reducers';
import SubscriptionSwitcher from 'subscriptions/SubscriptionSwitcher';
import Box from 'common/Box';
import Link from 'common/Link';
import * as routes from 'app/routes';
import add_green_circle from 'common/img/add_green_circle.svg';
import styles from './Subscription.module.css';

export const SubscriptionScreen = (props) => {
  const [showInsuranceLink, setShowInsuranceLink] = useState(false);
  const [sku, setSku] = useState('');
  const { subId, fetchFilteredInsuranceContracts, contracts, subscription } = props;

  useEffect(() => {
    subId && fetchFilteredInsuranceContracts({subscription: subId});
  }, []);

  useEffect(() => {
    if (!contracts || !subscription) return;

    setSku(subscription.device_specs);
    const subStatus = subscription.att_status || subscription.sprint_status;

    if (contracts.length > 0) {
      setShowInsuranceLink(false)
    } else if (subStatus === 'active') {
      setShowInsuranceLink(true)
    }

  }, [contracts, subscription]);

  return (
    <div className="Subscription">
      <SubscriptionSwitcher sprintSubId={subId} sprintRoute={routes.sprintSubscription} attRoute={routes.attSubscription} />
      <div className={styles.linkList}>
        {
          showInsuranceLink ?
            <Link className={styles.subscriptionLink} to={routes.sprintInsurancePlan(subId, sku)}>
              <Box>
                <img src={add_green_circle} />
                Insurance
              </Box>
            </Link>
            : null
        }
      </div>
    </div>
  )
};

const mapStateToProps = (state, { subId }) => ({
  subscription: getSprintSubscription(state, subId),
  contracts: getFilteredInsuranceContracts(state, {subscription: subId})
});

const mapDispatchToProps = {
  fetchFilteredInsuranceContracts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionScreen)

