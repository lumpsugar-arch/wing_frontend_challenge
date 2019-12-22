import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFiltered as fetchFilteredInsuranceContracts } from 'insurance/insuranceContracts/actions';
import { getFilteredInsuranceContracts, getAttSubscription } from 'reducers';
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
    subId && fetchFilteredInsuranceContracts({ subscription: subId });
  }, []);

  useEffect(() => {
    if (!contracts) return;
    if (contracts.length > 0) {
      setShowInsuranceLink(false)
    } else {
      setShowInsuranceLink(true)
    }

    if (!subscription) return;
    setSku(subscription.device_specs);

    const subStatus = subscription.att_status || subscription.sprint_status;

    if (subStatus === 'active') {
      setShowInsuranceLink(false)
    } else {
      setShowInsuranceLink(true)
    }
  }, [contracts]);

  return (
    <div className="Subscription">
      <SubscriptionSwitcher attSubId={subId} attRoute={routes.attSubscription} sprintRoute={routes.sprintSubscription} />
      <div className={styles.linkList}>
        {
          showInsuranceLink ?
            <Link className={styles.subscriptionLink} to={routes.attInsurancePlan(subId, sku)}>
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
  subscription: getAttSubscription(state, subId),
  contracts: getFilteredInsuranceContracts(state, {subscription: subId})
});

const mapDispatchToProps = {
  fetchFilteredInsuranceContracts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionScreen)
