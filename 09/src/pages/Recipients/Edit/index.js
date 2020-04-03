import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { MdChevronLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

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
  name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('O endereço é obrigatório'),
  number: Yup.string().required('O número é obrigatório'),
  complement: Yup.string().notRequired(),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigatório'),
  zipCode: Yup.string().required('O CEP é obrigatório'),
});

export default function RecipientEdit({ location }) {
  const [recipient] = useState(location.state.recipient);
  async function handleSubmit({
    name,
    street,
    number,
    complement,
    city,
    state,
    zipCode,
  }) {
    try {
      await api.put(`/recipients/${recipient.id}`, {
        name,
        street,
        number,
        complement,
        city,
        state,
        zipCode,
      });
    } catch (err) {
      toast.error('Falha no cadastro do destinatário!');
    } finally {
      history.push('/recipients');
      toast.success('Destinatário salvo com sucesso!');
    }
  }

  return (
    <Container>
      <Header>
        <h1>Edição de Destinatários</h1>
        <BackButton type="submit" onClick={() => history.push('/recipients')}>
          <MdChevronLeft size={24} className="react-icons" color="#fff" />
          VOLTAR
        </BackButton>
        <SaveButton type="submit" form="form-register">
          <MdDone size={24} className="react-icons" color="#fff" />
          SALVAR
        </SaveButton>
      </Header>
      <FormContainer>
        <Form
          initialData={recipient}
          schema={schema}
          onSubmit={handleSubmit}
          id="form-register"
        >
          <div className="inputs">
            <span>
              <Input className="name" name="name" label="Nome" />
            </span>
            <div className="secondLine">
              <span>
                <Input className="street" name="street" label="Rua" />
              </span>
              <span>
                <Input className="number" name="number" label="Número" />
              </span>
              <span>
                <Input
                  className="complement"
                  name="complement"
                  label="Complemento"
                />
              </span>
            </div>

            <div className="thirdLine">
              <span>
                <Input className="city" name="city" label="Cidade" />
              </span>
              <span>
                <Input className="state" name="state" label="Estado" />
              </span>
              <span>
                <Input className="zipCode" name="zipCode" label="CEP" />
              </span>
            </div>
          </div>
        </Form>
      </FormContainer>
    </Container>
  );
}

RecipientEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      recipient: PropTypes.object,
    }),
  }).isRequired,
};
