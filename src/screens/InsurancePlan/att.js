import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as routes from 'app/routes';
import { fetchValue } from '../../insurance/insurancePlans/actions';
import Back from 'common/Back';
import Link from 'common/Link';
import checkmark from './checkmark.svg'
import styles from './InsurancePlan.module.css';

const AttInsurancePlan = (props) => {
  const [planList, setPlanList] = useState([]);
  const { plans, fetchValue, params, subId } = props;

  useEffect(() => {
    fetchValue('att')
  }, []);

  useEffect(() => {
    if (plans) {
      setPlanList(Object.values(plans));
    }
  }, [plans]);

  const List = (id) => {
    if (id.id === 10) {
      return (
        <ul className={styles.CardList}>
          <li><img src={checkmark} alt="checked"/>Malfunction (after the original manufacturer's warranty expires)</li>
        </ul>
      )
    } else {
      return (
        <ul className={styles.CardList}>
          <li><img src={checkmark} alt="checked"/>Accidental damage</li>
          <li><img src={checkmark} alt="checked"/>Loss and theft</li>
          <li><img src={checkmark} alt="checked"/>Malfunction</li>
          <li><img src={checkmark} alt="checked"/>Water damage</li>
          <li><img src={checkmark} alt="checked"/>Broken screens</li>
        </ul>
      )
    }
  };

  return (
    <div>
      <div className={styles.Back}>
        <Back to={routes.attSubscription(subId)} />
      </div>
      <h1>
        Select an insurance plan
      </h1>
      <div className={styles.Plans}>
        {planList.map(plan => (
          <div className={cn(
            styles.Card,
            plan.id === 2 ? styles.CardMain : null
          )}>
            <div className={styles.CardHeader}>
              <h2 className={styles.CardName}>{plan.name}</h2>
              <div className={styles.CardPrice}>
                Starting at <span className={styles.CardPriceValue}>{`$${plan.price}`}</span>
              </div>
              <a className={styles.CardTermsLink} href="#">Terms, fees and more info</a>
              <Link to={routes.attInsuranceConfirm(subId, params.sku, plan.id)}>
                <button className={styles.CardButton}>Select</button>
              </Link>
            </div>
            <div className={styles.CardBody}>
              Protects your device against
              <List id={plan.id}/>
            </div>
            <div className={styles.CardFooter}>
              <ul>
                <li>Repair deductible: ${plan.repair_deductible}</li>
                <li>Replacement deductible: ${plan.replacement_deductible}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const plans = state.insurancePlans.resources;
  const params = state.routing.params;
  return { plans, params }
};

const mapDispatchToProps = {
  fetchValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttInsurancePlan)