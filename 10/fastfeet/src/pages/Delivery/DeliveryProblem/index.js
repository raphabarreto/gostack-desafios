import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Container,
  Background,
  DeliveryContainer,
  Form,
  FormInput,
  SubmitButton,
} from './styles';

export default function DeliveryProblem({ navigation }) {
  const [problem, setProblem] = useState('');

  const delivery = navigation.getParam('data');

  async function handleSubmit() {
    try {
      await api.post(`deliveries/${delivery.id}/problems`, {
        description: problem,
      });
      Alert.alert('Sucesso', 'Problema informado com sucesso!');
    } catch (error) {
      Alert.alert('Falha', 'Erro ao informar problema, tente mais tarde.');
    } finally {
      setProblem('');
    }
  }

  return (
    <Container>
      <Background />
      <DeliveryContainer>
        <Form>
          <FormInput
            placeholder="Inclua aqui o problema que aconteceu na entrega"
            onSubmitEditing={handleSubmit}
            multiline
            numberOfLines={15}
            value={problem}
            onChangeText={setProblem}
            textAlignVertical="top"
          />
        </Form>
        <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
      </DeliveryContainer>
    </Container>
  );
}

DeliveryProblem.navigationOptions = ({ navigation }) => ({
  title: 'Informar Problema',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});

DeliveryProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
