import React, { useState, useEffect } from 'react';
import { StatusBar, Image } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

function SignIn({ isFocused }) {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSumbmit() {
    dispatch(signInRequest(id));
  }

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#7d40e7');
    }
  }, [isFocused]);

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          keyboardType="numeric"
          value={id}
          onChangeText={setId}
        />

        <SubmitButton loading={loading} onPress={handleSumbmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default withNavigationFocus(SignIn);

SignIn.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};
