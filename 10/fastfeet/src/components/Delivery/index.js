import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, parseISO } from 'date-fns';

import {
  Container,
  TitleContainer,
  Title,
  DetailsContainer,
  Detail,
  Subtitle,
  DetailData,
  LinkStyled,
  ProgressContainer,
  StatusDot,
  ProgressName,
  StatusName,
  DeliveryLink,
} from './styles';

import formattedDate from '~/utils/formattedDate';

export default function Delivery({ data, navigation }) {
  const dateParsed = data.start_date
    ? format(parseISO(data.start_date), 'dd/MM/yyyy')
    : null;

  return (
    <Container>
      <TitleContainer>
        <Icon name="local-shipping" color="#7D40E7" size={22} />
        <Title>Encomenda {data.id}</Title>
      </TitleContainer>

      <ProgressContainer>
        <StatusDot active />
        <StatusDot active={dateParsed} />
        <StatusDot active={data.end_date} />
      </ProgressContainer>
      <ProgressName>
        <StatusName>Aguardando Retirada</StatusName>
        <StatusName>Retirada</StatusName>
        <StatusName>Entregue</StatusName>
      </ProgressName>

      <DetailsContainer>
        <Detail>
          <Subtitle>Data</Subtitle>
          <DetailData>{data.start_date ? dateParsed : '-'}</DetailData>
        </Detail>
        <Detail>
          <Subtitle>Cidade</Subtitle>
          <DetailData>{data.recipient.city}</DetailData>
        </Detail>
        <Detail>
          <DeliveryLink
            onPress={() => {
              navigation.navigate('DeliveryDetails', { data });
            }}
          >
            <LinkStyled>Ver detalhes</LinkStyled>
          </DeliveryLink>
        </Detail>
      </DetailsContainer>
    </Container>
  );
}
