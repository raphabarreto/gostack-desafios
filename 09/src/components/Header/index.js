import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { signOut } from "~/store/modules/auth/actions";

import logo from "~/assets/fastfeet-logo.svg";

import { Container, Content, Profile } from "./styles";

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

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
              <Link to="/" onClick={handleSignOut}>
                sair do sistema
              </Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
