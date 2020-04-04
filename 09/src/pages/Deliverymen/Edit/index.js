import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { MdChevronLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import AvatarInput from '~/components/AvatarInput';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Header,
  BackButton,
  SaveButton,
  FormContainer,
} from './styles';

const schema = Yup.object().shape({
  avatar_id: Yup.string().notRequired(),
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function DeliverymanEdit({ location }) {
  const [deliveryman] = useState(location.state.deliveryman);

  async function handleSubmit({ name, email, avatar_id }) {
    try {
      await api.put(`/deliverymen/${deliveryman.id}`, {
        name,
        email,
        avatar_id,
      });
    } catch (err) {
      toast.error('Falha no cadastro do entregador!');
    } finally {
      history.push('/deliverymen');
      toast.success('Entregador salvo com sucesso!');
    }
  }

  return (
    <Container>
      <Header>
        <h1>Edição de Entregadores</h1>
        <BackButton type="submit" onClick={() => history.push('/deliverymen')}>
          <MdChevronLeft size={24} className="react-icons" color="#fff" />
          VOLTAR
        </BackButton>
        <SaveButton type="submit" form="form-edit">
          <MdDone size={24} className="react-icons" color="#fff" />
          SALVAR
        </SaveButton>
      </Header>
      <FormContainer>
        <Form
          initialData={deliveryman}
          schema={schema}
          onSubmit={handleSubmit}
          id="form-edit"
        >
          <AvatarInput name="avatar_id" />
          <Input name="name" label="Nome" />
          <Input name="email" label="Email" />
        </Form>
      </FormContainer>
    </Container>
  );
}

DeliverymanEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      deliveryman: PropTypes.object,
    }),
  }).isRequired,
};
