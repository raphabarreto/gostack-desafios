import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { FiPlus } from 'react-icons/fi';
import { FaEllipsisH } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import {
  MdSearch,
  MdVisibility,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import InitialLetters from '~/components/Letters';

import api from '~/services/api';

import {
  Container,
  DeliveryTable,
  Status,
  Header,
  Search,
  ActionButton,
  ActionList,
} from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries', {
        params: { q },
      });

      const data = response.data.map(d => {
        if (d.end_date) {
          d.status = 'ENTREGUE';
        } else if (d.canceled_at) {
          d.status = 'CANCELADA';
        } else if (d.start_date) {
          d.status = 'RETIRADA';
        } else {
          d.status = 'PENDENTE';
        }

        return d;
      });

      setDeliveries(data);
    }
    loadDeliveries();
  }, [
    deliveries.canceled_at,
    deliveries.end_date,
    deliveries.start_date,
    deliveries.status,
    q,
  ]);

  async function handleRemove(id) {
    try {
      await api.delete(`/deliveries/${id}`);

      const newDeliveries = deliveries.filter(d => d.id !== id);

      setDeliveries(newDeliveries);
    } catch (err) {
      toast.error('Falha ao excluir encomenda!');
    } finally {
      toast.success('Encomenda excluída com sucesso!');
    }
  }

  function handleToggleActions(id) {
    const updateDeliveries = deliveries.map(d => {
      if (d.id === id) {
        d.visible = !d.visible;
      }
      return d;
    });

    setDeliveries(updateDeliveries);
  }

  return (
    <Container>
      <p>Gerenciando encomendas</p>
      <Header>
        <Search>
          <MdSearch size={20} color="#999999" />
          <Input
            name="encomendas"
            placeholder="Buscar por encomendas"
            onChange={e => setQ(e.target.value)}
          />
        </Search>
        <button type="button">
          <FiPlus size={24} className="react-icons" /> CADASTRAR
        </button>
      </Header>

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
                <Status status={delivery.status}>
                  <GoPrimitiveDot size={20} className="react-icons-bullet" />
                  {delivery.status}
                </Status>
              </td>
              <td>
                <ActionButton>
                  <button
                    type="button"
                    onClick={() => handleToggleActions(delivery.id)}
                  >
                    <FaEllipsisH size={24} />
                  </button>

                  <ActionList visible={delivery.visible}>
                    <button type="button">
                      <MdVisibility
                        size={24}
                        color="#8E5BE8"
                        style={{ marginRight: 5 }}
                      />
                      Visualizar
                    </button>
                    <button type="button">
                      <MdEdit
                        size={24}
                        color="#4D85EE"
                        style={{ marginRight: 5 }}
                      />
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(delivery.id)}
                    >
                      <MdDeleteForever
                        size={24}
                        color="#DE3B3B"
                        style={{ marginRight: 5 }}
                      />
                      Excluir
                    </button>
                  </ActionList>
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </DeliveryTable>
    </Container>
  );
}
