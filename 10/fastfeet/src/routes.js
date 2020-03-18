import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import DeliveryDetails from './pages/Delivery/DeliveryDetails';
import DeliveryProblem from './pages/Delivery/DeliveryProblem';
import DeliveryProblemList from './pages/Delivery/DeliveryProblemList';
import DeliveryCompletion from './pages/Delivery/DeliveryCompletion';
import Profile from './pages/Profile';

function tabBarIcon({ tintColor }) {
  return <Icon name="reorder" size={25} color={tintColor} />;
}

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Delivery: {
              screen: createStackNavigator(
                {
                  Dashboard,
                  DeliveryDetails,
                  DeliveryProblem,
                  DeliveryProblemList,
                  DeliveryCompletion,
                },
                {
                  defaultNavigationOptions: {
                    headerTitleAlign: 'center',
                    headerTransparent: true,
                    headerStyle: {
                      backgroundColor: '#7159c1',
                    },
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                  navigationOptions: {
                    tabBarLabel: 'Entregas',
                    tabBarIcon,
                  },
                }
              ),
            },
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7D40E7',
              inactiveTintColor: '#999999',
              style: { height: 55 },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
