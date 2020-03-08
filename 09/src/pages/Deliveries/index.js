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
  MdClose,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';

import InitialLetters from '~/components/Letters';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  DeliveryTable,
  Status,
  Header,
  Search,
  ActionButton,
  ActionList,
  View,
} from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [q, setQ] = useState('');

  const [view, setView] = useState(false);
  const [deliveryView, setDeliveryView] = useState({});

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
  }, [q]);

  function handleToggleActions(id) {
    const updateDeliveries = deliveries.map(d => {
      if (d.id === id) {
        d.visible = !d.visible;
      }
      return d;
    });

    setDeliveries(updateDeliveries);
  }

  function handleDeliveryView(data) {
    const { street, number, city, state, zipCode } = data.recipient;
    const { start_date, end_date, signature } = data;

    const startDateFormatted = start_date
      ? format(parseISO(start_date), 'dd/MM/yyyy - HH:mm')
      : null;

    const endDateFormatted = end_date
      ? format(parseISO(end_date), 'dd/MM/yyyy - HH:mm')
      : null;

    setDeliveryView({
      street,
      number,
      city,
      state,
      zipCode,
      startDateFormatted,
      endDateFormatted,
      signature,
    });

    setView(true);
  }

  async function handleRemove(id) {
    const removeAlert = window.confirm(
      'Tem certeza que quer excluir a encomenda?'
    );
    if (!removeAlert) {
      return;
    }
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
        <button
          type="button"
          onClick={() => history.push('/deliveries/register')}
        >
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
                    <button
                      type="button"
                      onClick={() => {
                        handleDeliveryView(delivery);
                        handleToggleActions(delivery.id);
                      }}
                    >
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
                      onClick={() => {
                        handleRemove(delivery.id);
                      }}
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
      <View view={view}>
        <div>
          <button type="button" onClick={() => setView(false)}>
            Informações da encomenda
            <span>
              <MdClose size={22} className="react-icons" />
            </span>
          </button>
        </div>

        <span className="street">
          {deliveryView.street}, {deliveryView.number}
        </span>
        <span className="city">
          {deliveryView.city} - {deliveryView.state}
        </span>
        <span className="zipCode">0{deliveryView.zipCode}</span>
        <span className="dates">Datas</span>
        <span className="withdraw">
          Retirada: {deliveryView.startDateFormatted}
        </span>
        <span className="delivery">
          Entrega: {deliveryView.endDateFormatted}
        </span>
        <span className="signature">Assinatura do destinatário</span>
        <span>
          {deliveryView.signature ? (
            <img src={deliveryView.signature.url} alt="signature" />
          ) : (
              <h1>Não assinou</h1>
            )}
        </span>
      </View>
    </Container>
  );
}
