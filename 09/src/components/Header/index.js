import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.svg';

import { Container, Content, Profile, StyledNavLink } from './styles';

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
          <StyledNavLink to="/deliveries">ENCOMENDAS</StyledNavLink>
          <StyledNavLink to="/deliverymen">ENTREGADORES</StyledNavLink>
          <StyledNavLink to="/recipients">DESTINATÁRIOS</StyledNavLink>
          <StyledNavLink to="/problems">PROBLEMAS</StyledNavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Admin FastFeet</strong>
              <NavLink to="/" onClick={handleSignOut}>
                sair do sistema
              </NavLink>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
