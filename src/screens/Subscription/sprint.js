import React from 'react';
import SubscriptionSwitcher from 'subscriptions/SubscriptionSwitcher';
import Box from 'common/Box';
import Link from 'common/Link';
import * as routes from 'app/routes';
import add_green_circle from 'common/img/add_green_circle.svg';
import styles from './Subscription.module.css';
import { fetchFiltered } from '../../insurance/insuranceContracts/api';

export const SubscriptionScreen = ({ subId }) => {
  fetchFiltered({subscription: subId}).then(res => {
    console.log("hI", res.data);
  });

  return (
    <div className="Subscription">
      <SubscriptionSwitcher sprintSubId={subId} sprintRoute={routes.sprintSubscription} attRoute={routes.attSubscription} />
      <div className={styles.linkList}>
        <Link className={styles.subscriptionLink} to={routes.sprintInsurance(subId)}>
          <Box>
            <img src={add_green_circle} />
            Insurance
          </Box>
        </Link>
      </div>
    </div>
  )
};
export default SubscriptionScreen

