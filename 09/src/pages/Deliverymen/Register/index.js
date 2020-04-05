import React from 'react';

import { Form, Input } from '@rocketseat/unform';

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

export default function DeliverymanRegister() {
  async function handleSubmit({ name, email, avatar_id }) {
    try {
      await api.post(`/deliverymen`, {
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
        <h1>Cadastro de Entregadores</h1>
        <BackButton type="submit" onClick={() => history.push('/deliverymen')}>
          <MdChevronLeft size={24} className="react-icons" color="#fff" />
          VOLTAR
        </BackButton>
        <SaveButton type="submit" form="form-register">
          <MdDone size={24} className="react-icons" color="#fff" />
          SALVAR
        </SaveButton>
      </Header>
      <FormContainer>
        <Form schema={schema} onSubmit={handleSubmit} id="form-register">
          <AvatarInput name="avatar_id" />
          <Input name="name" label="Nome" placeholder="Digite o seu nome" />
          <Input name="email" label="Email" placeholder="Digite o seu e-mail" />
        </Form>
      </FormContainer>
    </Container>
  );
}
