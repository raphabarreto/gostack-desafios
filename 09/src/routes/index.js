import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Deliveries from '../pages/Deliveries';

import Deliverymen from '../pages/Deliverymen';
import DeliverymanRegister from '../pages/Deliverymen/Register';

import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" component={Deliveries} isPrivate />

      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route
        path="/deliveryman/register"
        component={DeliverymanRegister}
        isPrivate
      />

      <Route path="/recipients" component={Recipients} isPrivate />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
