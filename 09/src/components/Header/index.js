import React from "react";
import { Link } from "react-router-dom";

import logo from "~/assets/fastfeet-logo.svg";

import { Container, Content, Profile } from "./styles";

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Link to="/delivery">ENCOMENDAS</Link>
          <Link to="/delivery">ENTREGADORES</Link>
          <Link to="/delivery">DESTINATÁRIOS</Link>
          <Link to="/delivery">PROBLEMAS</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Admin FastFeet</strong>
              <Link to="/">sair do sistema</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
