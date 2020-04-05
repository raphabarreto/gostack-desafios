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
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';

import InitialLetters from '~/components/Letters';
import Button from '~/components/Button';
import Footer from '~/components/Footer';

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
  const [page, setPage] = useState(1);

  const [view, setView] = useState(false);
  const [deliveryView, setDeliveryView] = useState({});

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries', {
        params: { q, page },
      });

      const data = response.data.map(delivery => {
        if (delivery.end_date) {
          delivery.status = 'ENTREGUE';
        } else if (delivery.canceled_at) {
          delivery.status = 'CANCELADA';
        } else if (delivery.start_date) {
          delivery.status = 'RETIRADA';
        } else {
          delivery.status = 'PENDENTE';
        }

        return delivery;
      });

      setDeliveries(data);
    }
    loadDeliveries();
  }, [q, page]);

  function handleToggleActions(id) {
    const updateDelivery = deliveries.map(delivery => {
      if (delivery.id === id) {
        delivery.visible = !delivery.visible;
      }
      return delivery;
    });

    setDeliveries(updateDelivery);
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

  function handleEdit(delivery) {
    history.push({
      pathname: '/deliveries/edit',
      state: { delivery },
    });
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
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length > 0 ? (
            deliveries.map(delivery => (
              <tr key={delivery.id}>
                <td>#{delivery.id}</td>
                <td>{delivery.product}</td>
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
                      <button
                        type="button"
                        onClick={() => handleEdit(delivery)}
                      >
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
            ))
          ) : (
            <tr>
              <td>Nenhum resultado encontrado</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          )}
        </tbody>
      </DeliveryTable>
      <Footer>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <MdChevronLeft color="#fff" size={20} />
        </Button>
        <Button onClick={() => setPage(page + 1)}>
          <MdChevronRight color="#fff" size={20} />
        </Button>
      </Footer>

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
        <span className="zipCode">{deliveryView.zipCode}</span>
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
