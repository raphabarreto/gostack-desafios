import React, { useState, useEffect } from 'react';

import { Form, Input, Select } from '@rocketseat/unform';

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
  product: Yup.string().required('O nome do produto é obrigatório'),
  recipient: Yup.string().required('O destinatário é obrigatório'),
  deliveryman: Yup.string().required('O entregador é obrigatório'),
});

export default function DeliveryRegister() {
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);
  const [qRecipients] = useState('');
  const [qDeliverymen] = useState('');

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients', {
        params: { q: qRecipients },
      });

      const data = response.data.map(recipient => {
        const { id } = recipient;
        const title = recipient.name;

        return { id, title };
      });

      setRecipients(data);
    }

    loadRecipients();
  }, [qRecipients]);

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get('deliverymen', {
        params: { q: qDeliverymen },
      });

      const data = response.data.map(deliveryman => {
        const { id } = deliveryman;
        const title = deliveryman.name;

        return { id, title };
      });

      setDeliverymen(data);
    }

    loadDeliverymen();
  }, [qDeliverymen]);

  async function handleSubmit(data) {
    try {
      await api.post(`/deliveries`, {
        recipient_id: data.recipient,
        deliveryman_id: data.deliveryman,
        product: data.product,
      });
    } catch (err) {
      toast.error('Falha no cadastro da encomenda!');
    } finally {
      history.push('/deliveries');
      toast.success('Encomenda salva com sucesso!');
    }
  }
  return (
    <Container>
      <Header>
        <h1>Cadastro de Encomendas</h1>
        <BackButton type="submit" onClick={() => history.push('/deliveries')}>
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
          <div className="firstLine">
            <span className="span-form">
              Destinatário
              <Select name="recipient" options={recipients} />
            </span>
            <span className="span-form">
              Entregador
              <Select name="deliveryman" options={deliverymen} />
            </span>
          </div>

          <span>
            <p>Nome do produto</p>
            <Input name="product" />
          </span>
        </Form>
      </FormContainer>
    </Container>
  );
}
