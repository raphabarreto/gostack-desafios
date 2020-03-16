import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Avatar, Title, Info, LogoutButton } from './styles';
import formattedDate from '~/utils/formattedDate';

export default function Profile() {
  const dispatch = useDispatch();

  const [profile] = useState(useSelector(state => state.auth.id));

  const dateParsed = useMemo(() => {
    return formattedDate(profile.created_at);
  }, [profile.created_at]);

  function handleLogout() {
    dispatch(signOut());
  }

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
  return <Icon name="person" size={20} color={tintColor} />;
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string,
};

tabBarIcon.defaultProps = {
  tintColor: '#fff',
};
