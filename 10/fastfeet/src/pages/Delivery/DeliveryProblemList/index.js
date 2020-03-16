import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import {
  Container,
  Background,
  DeliveryName,
  ProblemsList,
  Problem,
  Description,
  Created,
} from './styles';

import api from '~/services/api';
import formattedDate from '~/utils/formattedDate';

export default function DeliveryProblemList({ navigation }) {
  const [problems, setProblems] = useState([]);

  const delivery = navigation.getParam('data');

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`problems-list/${delivery.id}`);

      setProblems(response.data);
    }

    loadProblems();
  }, [delivery.id]);
  return (
    <Container>
      <Background />
      <DeliveryName>Encomenda {delivery.id}</DeliveryName>
      <ProblemsList
        data={problems}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Problem>
            <Description>{item.description}</Description>
            <Created>{formattedDate(item.created_at)}</Created>
          </Problem>
        )}
      />
    </Container>
  );
}

DeliveryProblemList.navigationOptions = ({ navigation }) => ({
  title: 'Visualizar problemas',
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

DeliveryProblemList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
