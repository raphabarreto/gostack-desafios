import React, { useState, useEffect } from 'react';

import { Input } from '@rocketseat/unform';

import { FiPlus } from 'react-icons/fi';
import { FaEllipsisH } from 'react-icons/fa';

import { MdSearch, MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  Container,
  RecipientsTable,
  Header,
  Search,
  ActionButton,
  ActionList,
} from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients', {
        params: { q },
      });

      const { data } = response;

      setRecipients(data);
    }
    loadRecipients();
  }, [q]);

  function handleToggleActions(id) {
    const updateRecipients = recipients.map(d => {
      if (d.id === id) {
        d.visible = !d.visible;
      }
      return d;
    });

    setRecipients(updateRecipients);
  }

  async function handleRemove(id) {
    const removeAlert = window.confirm(
      'Tem certeza que quer excluir o entregador?'
    );
    if (!removeAlert) {
      return;
    }
    try {
      await api.delete(`/recipients/${id}`);

      const newRecipients = recipients.filter(d => d.id !== id);

      setRecipients(newRecipients);
    } catch (err) {
      toast.error('Falha ao excluir destinatário!');
    } finally {
      toast.success('Destinatário excluído com sucesso!');
    }
  }

  function handleEdit(recipient) {
    history.push({
      pathname: '/recipients/edit',
      state: { recipient },
    });
  }

  return (
    <Container>
      <p>Gerenciando destinatários</p>
      <Header>
        <Search>
          <MdSearch size={20} color="#999999" />
          <Input
            name="destinátarios"
            placeholder="Buscar por destinátarios"
            onChange={e => setQ(e.target.value)}
          />
        </Search>
        <button
          type="button"
          onClick={() => history.push('/recipients/register')}
        >
          <FiPlus size={24} className="react-icons" /> CADASTRAR
        </button>
      </Header>

      <RecipientsTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(recipient => (
            <tr key={recipient.id}>
              <td>#{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>
                {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                {recipient.state}
              </td>
              <td>
                <ActionButton>
                  <button
                    type="button"
                    onClick={() => handleToggleActions(recipient.id)}
                  >
                    <FaEllipsisH size={24} />
                  </button>

                  <ActionList visible={recipient.visible}>
                    <button type="button" onClick={() => handleEdit(recipient)}>
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
                        handleRemove(recipient.id);
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
      </RecipientsTable>
    </Container>
  );
}
