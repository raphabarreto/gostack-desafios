import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { signOut } from '~/store/modules/auth/actions';

import formattedDate from '~/utils/formattedDate';

import { Container, Avatar, Title, Info, LogoutButton } from './styles';

function Profile({ isFocused }) {
  const dispatch = useDispatch();

  const [profile] = useState(useSelector(state => state.auth.id));

  const dateParsed = useMemo(() => {
    return formattedDate(profile.created_at);
  }, [profile.created_at]);

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
    }
  }, [isFocused]);

  return (
    <Container>
      <Avatar
        source={{
          uri: profile.avatar.url,
        }}
      />
      <Title>Nome completo</Title>
      <Info>{profile.name}</Info>
      <Title>Email</Title>
      <Info>{profile.email}</Info>
      <Title>Data de cadastro</Title>
      <Info>{dateParsed}</Info>

      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}

function tabBarIcon({ tintColor }) {
  return <Icon name="person" size={25} color={tintColor} />;
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon,
};

Profile.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string,
};

tabBarIcon.defaultProps = {
  tintColor: '#fff',
};

export default withNavigationFocus(Profile);
