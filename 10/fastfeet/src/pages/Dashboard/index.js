import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Container,
  Header,
  HeaderContent,
  Avatar,
  Welcome,
  TitleWelcomeBack,
  Name,
  TitleDelivery,
  Logout,
  LogoutButton,
  Actions,
  StatusButton,
  StatusText,
  DeliveriesList,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import Delivery from '~/components/Delivery';

function Dashboard({ isFocused, navigation }) {
  const dispatch = useDispatch();
  const [profile] = useState(useSelector(state => state.auth.id));

  const [pendingActived, setPendingActived] = useState(true);
  const [deliveredActived, setDeliveredActived] = useState(false);
  const [pending, setPending] = useState([]);
  const [delivered, setDelivered] = useState([]);

  async function loadPending(id) {
    const response = await api.get(`deliveryman/${id}/progress`);
    setPending(response.data);
  }

  async function loadDelivered(id) {
    const response = await api.get(`deliveryman/${id}/deliveries`);
    setDelivered(response.data);
  }

  function handleDelivered() {
    setPendingActived(false);
    loadDelivered(profile.id);
    setDeliveredActived(true);
  }

  const handlePending = useCallback(() => {
    loadPending(profile.id);
    setDeliveredActived(false);
    setPendingActived(true);
  }, [profile.id]);

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
      handlePending();
    }
  }, [handlePending, isFocused]);

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Avatar
            source={{
              uri: profile.avatar.url,
            }}
          />
          <Welcome>
            <TitleWelcomeBack>Bem vindo de volta,</TitleWelcomeBack>
            <Name>{profile.name}</Name>
          </Welcome>
        </HeaderContent>

        <Logout>
          <LogoutButton onPress={handleLogout}>
            <Icon name="exit-to-app" size={30} color="#E74040" />
          </LogoutButton>
        </Logout>
      </Header>

      <Header>
        <TitleDelivery>Entregas</TitleDelivery>
        <Actions>
          <StatusButton onPress={handlePending}>
            <StatusText active={pendingActived}>Pendentes</StatusText>
          </StatusButton>

          <StatusButton onPress={handleDelivered}>
            <StatusText active={deliveredActived}>Entregues</StatusText>
          </StatusButton>
        </Actions>
      </Header>

      <DeliveriesList
        data={pendingActived ? pending : delivered}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Delivery data={item} navigation={navigation} />
        )}
      />
    </Container>
  );
}

Dashboard.navigationOptions = {
  headerShown: false,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigationFocus(Dashboard);
