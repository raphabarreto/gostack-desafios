import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Deliveries from '../pages/Deliveries';

import Deliverymen from '../pages/Deliverymen';
import DeliverymanRegister from '../pages/Deliverymen/Register';
import DeliverymanEdit from '../pages/Deliverymen/Edit';

import Recipients from '../pages/Recipients';
import RecipientRegister from '../pages/Recipients/Register';
import RecipientEdit from '../pages/Recipients/Edit';

import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" component={Deliveries} isPrivate />

      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route
        path="/deliverymen/register"
        component={DeliverymanRegister}
        isPrivate
      />
      <Route path="/deliverymen/edit" component={DeliverymanEdit} isPrivate />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route
        path="/recipients/register"
        component={RecipientRegister}
        isPrivate
      />
      <Route path="/recipients/edit" component={RecipientEdit} isPrivate />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
