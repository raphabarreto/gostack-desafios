import React, { useState, useMemo } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, formatRelative, parseISO } from 'date-fns';

import pt from 'date-fns/locale/pt';
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

import api from '~/services/api';

export default function DeliveryDetails({ navigation }) {
  const data = navigation.getParam('data');

  if (data.end_date) {
    data.status = 'Entregue';
  } else if (data.canceled_at) {
    data.status = 'Cancelada';
  } else if (data.start_date) {
    data.status = 'Retirada';
  } else {
    data.status = 'Pendente';
  }

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
            <Info>
              {data.start_date
                ? format(new Date(data.start_date), 'dd/MM/yyyy')
                : '--/--/--'}
            </Info>
            <Info>
              {data.end_date
                ? format(new Date(data.end_date), 'dd/MM/yyyy')
                : '--/--/--'}
            </Info>
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
                navigation.navigate('DeliveryCompletion', { data });
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
