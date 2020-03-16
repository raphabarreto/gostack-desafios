import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  ContentHeader,
  Avatar,
  Welcome,
  Title,
  Name,
  Logout,
  LogoutButton,
  Actions,
  StatusButton,
  StatusText,
  DeliveriesList,
} from './styles';

import api from '~/services/api';

import { signOut } from '~/store/modules/auth/actions';
import Delivery from '~/components/Delivery';

function Dashboard({ isFocused, navigation }) {
  const dispatch = useDispatch();
  const [profile] = useState(useSelector(state => state.auth.id));

  const [pendingActived, setPendingActived] = useState(true);
  const [deliveredActived, setDeliveredActived] = useState();
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

  function handleFinished() {
    loadDelivered(profile.id);
    setDeliveredActived(true);
    setPendingActived(false);
  }

  const handlePending = useCallback(() => {
    loadPending(profile.id);
    setDeliveredActived(false);
    setPendingActived(true);
  }, [profile.id]);

  useEffect(() => {
    if (isFocused) {
      handlePending();
    }
  }, [handlePending, isFocused]);

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Header>
        <ContentHeader>
          <Avatar
            source={{
              uri: profile.avatar.url,
            }}
          />
          <Welcome>
            <Title>Bem vindo de volta,</Title>
            <Name>{profile.name}</Name>
          </Welcome>
        </ContentHeader>

        <Logout>
          <LogoutButton onPress={handleLogout}>
            <Icon name="exit-to-app" size={30} color="#E74040" />
          </LogoutButton>
        </Logout>
      </Header>

      <Header>
        <Name>Entregas</Name>
        <Actions>
          <StatusButton onPress={handlePending}>
            <StatusText active={pendingActived}>Pendentes</StatusText>
          </StatusButton>

          <StatusButton onPress={handleFinished}>
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
