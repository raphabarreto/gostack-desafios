import React, { useEffect, useMemo } from 'react';
import { StatusBar, TouchableOpacity, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import formattedDate from '~/utils/formattedDate';

import api from '~/services/api';

import {
  Container,
  Background,
  DeliveryContainer,
  DeliveryInfo,
  Header,
  HeaderText,
  Title,
  Info,
  Status,
  DateContainer,
  ActionsContainer,
  Action,
  ActionText,
} from './styles';

function DeliveryDetails({ isFocused, navigation }) {
  const data = navigation.getParam('data');

  const startDateParsed = useMemo(() => {
    return formattedDate(data.start_date);
  }, [data.start_date]);

  const endDateParsed = useMemo(() => {
    return formattedDate(data.end_date);
  }, [data.end_date]);

  if (data.end_date) {
    data.status = 'Entregue';
  } else if (data.canceled_at) {
    data.status = 'Cancelada';
  } else if (data.start_date) {
    data.status = 'Retirada';
  } else {
    data.status = 'Pendente';
  }

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#7d40e7');
    }
  }, [isFocused]);

  async function handleDeliveryWithdrawal() {
    try {
      await api.put(
        `deliverymen/${data.deliveryman.id}/withdrawals/${data.id}`,
        {
          start_date: new Date(),
        }
      );
    } catch (error) {
      Alert.alert(
        'Falha na retirada',
        'Horário de retirada somente das 08:00 até às 18:00'
      );
    } finally {
      navigation.navigate('Dashboard');
      console.tron.log(new Date());
    }
  }

  function handleDeliveryAlreadyCompleted() {
    Alert.alert('Erro', 'Esta encomenda já foi confirmada!');
  }

  return (
    <Container>
      <Background />
      <DeliveryContainer>
        <DeliveryInfo>
          <Header>
            <Icon name="local-shipping" color="#7D40E7" size={30} />
            <HeaderText>Informações da entrega</HeaderText>
          </Header>
          <Title>Destinatário</Title>
          <Info>{data.recipient.name}</Info>
          <Title>Endereço de entrega</Title>
          <Info>
            {data.recipient.street}, {data.recipient.number},
            {data.recipient.complement && ` - ${data.recipient.complement} `}{' '}
            {data.recipient.city} - {data.recipient.state}
            {data.recipient.zipCode}
          </Info>
          <Title>Produto</Title>
          <Info>{data.product}</Info>
        </DeliveryInfo>

        <DeliveryInfo>
          <Header>
            <Icon name="event" color="#7D40E7" size={30} />
            <HeaderText>Situação da entrega</HeaderText>
          </Header>
          <Title>Status</Title>
          <Status>{data.status}</Status>
          <DateContainer>
            <Title>Data de retirada</Title>
            <Title>Data de entrega</Title>
          </DateContainer>
          <DateContainer>
            <Info>{data.start_date ? startDateParsed : '--/--/--'}</Info>
            <Info>{data.end_date ? endDateParsed : '--/--/--'}</Info>
          </DateContainer>
        </DeliveryInfo>
      </DeliveryContainer>
      <ActionsContainer>
        <Action
          onPress={() => {
            navigation.navigate('DeliveryProblem', { data });
          }}
        >
          <Icon name="highlight-off" size={24} color="#E74040" />
          <ActionText>Informar Problema</ActionText>
        </Action>
        <Action
          onPress={() => {
            navigation.navigate('DeliveryProblemList', { data });
          }}
        >
          <Icon name="info-outline" size={24} color="#E7BA40" />
          <ActionText>Visualizar Problemas</ActionText>
        </Action>
        {!data.start_date && !data.end_date ? (
          <Action onPress={handleDeliveryWithdrawal}>
            <Icon name="check" size={24} color="#82BF18" />
            <ActionText>Fazer a retirada</ActionText>
          </Action>
        ) : (
          <Action
            onPress={() => {
              if (!data.end_date) {
                navigation.navigate('DeliveryCompletion', { data });
              } else {
                handleDeliveryAlreadyCompleted();
              }
            }}
          >
            <Icon name="alarm-on" size={24} color="#7D40E7" />
            <ActionText>Confirmar Entrega</ActionText>
          </Action>
        )}
      </ActionsContainer>
    </Container>
  );
}

DeliveryDetails.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes da encomenda',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});

DeliveryDetails.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigationFocus(DeliveryDetails);
