import React, { useState, useEffect } from 'react';

import { Input } from '@rocketseat/unform';

import { FiPlus } from 'react-icons/fi';
import { FaEllipsisH } from 'react-icons/fa';

import {
  MdSearch,
  MdEdit,
  MdDeleteForever,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import InitialLetters from '~/components/Letters';
import Button from '~/components/Button';
import Footer from '~/components/Footer';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  DeliverymenTable,
  Header,
  Search,
  ActionButton,
  ActionList,
} from './styles';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get('deliverymen', {
        params: { q, page },
      });

      const { data } = response;

      setDeliverymen(data);
    }
    loadDeliverymen();
  }, [q, page]);

  function handleToggleActions(id) {
    const updateDeliveryman = deliverymen.map(deliveryman => {
      if (deliveryman.id === id) {
        deliveryman.visible = !deliveryman.visible;
      }
      return deliveryman;
    });

    setDeliverymen(updateDeliveryman);
  }

  async function handleRemove(id) {
    const removeAlert = window.confirm(
      'Tem certeza que quer excluir o entregador?'
    );
    if (!removeAlert) {
      return;
    }
    try {
      await api.delete(`/deliverymen/${id}`);

      const newDeliverymen = deliverymen.filter(d => d.id !== id);

      setDeliverymen(newDeliverymen);
    } catch (err) {
      toast.error('Falha ao excluir entregador!');
    } finally {
      toast.success('Entregador excluído com sucesso!');
    }
  }

  function handleEdit(deliveryman) {
    history.push({
      pathname: '/deliverymen/edit',
      state: { deliveryman },
    });
  }

  return (
    <Container>
      <p>Gerenciando entregadores</p>
      <Header>
        <Search>
          <MdSearch size={20} color="#999999" />
          <Input
            name="encomendas"
            placeholder="Buscar por entregadores"
            onChange={e => setQ(e.target.value)}
          />
        </Search>
        <button
          type="button"
          onClick={() => history.push('/deliverymen/register')}
        >
          <FiPlus size={24} className="react-icons" /> CADASTRAR
        </button>
      </Header>

      <DeliverymenTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymen.length > 0 ? (
            deliverymen.map(deliveryman => (
              <tr key={deliveryman.id}>
                <td>#{deliveryman.id}</td>
                <td>
                  <img src={deliveryman.avatar.url} alt="Deliveryman Profile" />
                </td>
                <td>
                  <InitialLetters
                    className="deliveryman-name"
                    name={deliveryman.name}
                  />
                  {deliveryman.name}
                </td>
                <td>{deliveryman.email}</td>
                <td>
                  <ActionButton>
                    <button
                      type="button"
                      onClick={() => handleToggleActions(deliveryman.id)}
                    >
                      <FaEllipsisH size={24} />
                    </button>

                    <ActionList visible={deliveryman.visible}>
                      <button
                        type="button"
                        onClick={() => handleEdit(deliveryman)}
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
                          handleRemove(deliveryman.id);
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
            </tr>
          )}
        </tbody>
      </DeliverymenTable>
      <Footer>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <MdChevronLeft color="#fff" size={20} />
        </Button>
        <Button onClick={() => setPage(page + 1)}>
          <MdChevronRight color="#fff" size={20} />
        </Button>
      </Footer>
    </Container>
  );
}
