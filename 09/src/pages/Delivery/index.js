import React from "react";

import { Input } from "@rocketseat/unform";
import { FiPlus, FiMoreHorizontal } from "react-icons/fi";
import { GoPrimitiveDot } from "react-icons/go";
import api from "~/services/api";

import { Container, DeliveryTable } from "./styles";

export default function Delivery() {
  return (
    <Container>
      <p>Gerenciando encomendas</p>
      <header>
        <Input name="encomendas" placeholder="🔍 Buscar por encomendas" />
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
          <tr>
            <td>#01</td>
            <td>Ludwig</td>
            <td>
              <span className="deliveryman-name">JD</span>
              John Doe
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <span>
                <GoPrimitiveDot size={20} className="react-icons-bullet" />
                ENTREGUE
              </span>
            </td>
            <td>
              <FiMoreHorizontal size={25} />
            </td>
          </tr>
          <tr>
            <td>#02</td>
            <td>Raphael</td>
            <td>
              <span className="deliveryman-name">GP</span>
              Gaspar Antunes
            </td>
            <td>Rio do sul</td>
            <td>Santa Catarina</td>
            <td>
              <span>
                <GoPrimitiveDot size={20} className="react-icons-bullet" />
                PENDENTE
              </span>
            </td>
            <td>
              <FiMoreHorizontal size={25} />
            </td>
          </tr>
        </tbody>
      </DeliveryTable>
    </Container>
  );
}
