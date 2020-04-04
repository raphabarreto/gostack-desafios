import React, { useState, useEffect } from 'react';

import { FaEllipsisH } from 'react-icons/fa';

import { MdEdit, MdDeleteForever, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  Container,
  ProblemsTable,
  ActionButton,
  ActionList,
  View,
} from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [q] = useState('');

  const [view, setView] = useState(false);
  const [problemView, setProblemView] = useState({});

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('problems', {
        params: { q },
      });

      const { data } = response;

      setProblems(data);
    }
    loadProblems();
  }, [q]);

  function handleToggleActions(id) {
    const updateProblem = problems.map(problem => {
      if (problem.id === id) {
        problem.visible = !problem.visible;
      }
      return problem;
    });

    setProblems(updateProblem);
  }

  function handleProblemView(data) {
    const { description } = data;

    setProblemView({ description });

    setView(true);
  }

  async function handleRemove(id) {
    const removeAlert = window.confirm(
      'Tem certeza que desejar cancelar a encomenda?'
    );
    if (!removeAlert) {
      return;
    }
    try {
      await api.delete(`/problems/${id}`);

      const newProblems = problems.filter(p => p.id !== id);

      setProblems(newProblems);
    } catch (err) {
      toast.error('Falha ao cancelar a encomenda!');
    } finally {
      toast.success('Encomenda cancelada com sucesso!');
    }
  }

  return (
    <Container>
      <p>Problemas na entrega</p>

      <ProblemsTable>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem.id}>
              <td>#{problem.id}</td>
              <td>{problem.description}</td>
              <td>
                <ActionButton>
                  <button
                    type="button"
                    onClick={() => handleToggleActions(problem.id)}
                  >
                    <FaEllipsisH size={24} />
                  </button>

                  <ActionList visible={problem.visible}>
                    <button
                      type="button"
                      onClick={() => {
                        handleProblemView(problem);
                        handleToggleActions(problem.id);
                      }}
                    >
                      <MdEdit
                        size={24}
                        color="#4D85EE"
                        style={{ marginRight: 5 }}
                      />
                      Visualizar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleRemove(problem.id);
                      }}
                    >
                      <MdDeleteForever
                        size={24}
                        color="#DE3B3B"
                        style={{ marginRight: 5 }}
                      />
                      Cancelar encomenda
                    </button>
                  </ActionList>
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </ProblemsTable>
      <View view={view}>
        <div>
          <button type="button" onClick={() => setView(false)}>
            Informações da encomenda
            <span>
              <MdClose size={22} className="react-icons" />
            </span>
          </button>
        </div>

        <span>{problemView.description}</span>
      </View>
    </Container>
  );
}
