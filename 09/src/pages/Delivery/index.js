import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { FiPlus, FiMoreHorizontal } from 'react-icons/fi';
import { GoPrimitiveDot } from 'react-icons/go';

import InitialLetters from '~/components/Letters';

import api from '~/services/api';

import { Container, DeliveryTable, Status } from './styles';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries', {
        params: { q },
      });

      const { data } = response;

      setDeliveries(data);
    }
    loadDeliveries();
  }, [q]);

  return (
    <Container>
      <p>Gerenciando encomendas</p>
      <header>
        <Input
          name="encomendas"
          placeholder="🔍 Buscar por encomendas"
          onChange={e => setQ(e.target.value)}
        />
        <button type="button">
          <FiPlus size={24} className="react-icons" /> CADASTRAR
        </button>
      </header>

      <DeliveryTable>
        <thead>
          <th>ID</th>
          <th>Destinatário</th>
          <th>Entregador</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Status</th>
          <th>Ações</th>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td>#{delivery.id}</td>
              <td>{delivery.recipient.name}</td>
              <td>
                <InitialLetters
                  className="deliveryman-name"
                  name={delivery.deliveryman.name}
                />
                {delivery.deliveryman.name}
              </td>
              <td>{delivery.recipient.city}</td>
              <td>{delivery.recipient.state}</td>
              <td>
                <Status status="delivered">
                  <GoPrimitiveDot size={20} className="react-icons-bullet" />
                  ENTREGUE
                </Status>
              </td>
              <td>
                <FiMoreHorizontal size={25} />
              </td>
            </tr>
          ))}
        </tbody>
      </DeliveryTable>
    </Container>
  );
}
