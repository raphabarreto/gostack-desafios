import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  function handleSumbmit() { }

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
        />

        <SubmitButton onPress={handleSumbmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
