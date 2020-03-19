import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Container,
  TitleContainer,
  Title,
  DetailsContainer,
  Detail,
  Subtitle,
  DetailInfo,
  LinkStyled,
  ProgressContainer,
  StatusDot,
  ProgressName,
  StatusName,
  DeliveryLink,
} from './styles';

import formattedDate from '~/utils/formattedDate';

export default function Delivery({ data, navigation }) {
  const startDateParsed = useMemo(() => {
    return data.start_date ? formattedDate(data.start_date) : null;
  }, [data.start_date]);

  const endDateParsed = useMemo(() => {
    return data.end_date ? formattedDate(data.end_date) : null;
  }, [data.end_date]);

  return (
    <Container>
      <TitleContainer>
        <Icon name="local-shipping" color="#7D40E7" size={22} />
        <Title>Encomenda {data.id}</Title>
      </TitleContainer>

      <ProgressContainer>
        <StatusDot active />
        <StatusDot active={startDateParsed} />
        <StatusDot active={endDateParsed} />
      </ProgressContainer>
      <ProgressName>
        <StatusName>Aguardando Retirada</StatusName>
        <StatusName>Retirada</StatusName>
        <StatusName>Entregue</StatusName>
      </ProgressName>

      <DetailsContainer>
        <Detail>
          <Subtitle>Data</Subtitle>
          <DetailInfo>{data.start_date ? startDateParsed : '-'}</DetailInfo>
        </Detail>
        <Detail>
          <Subtitle>Cidade</Subtitle>
          <DetailInfo>{data.recipient.city}</DetailInfo>
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

Delivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }),
  }),
};

Delivery.defaultProps = {
  data: null,
};
