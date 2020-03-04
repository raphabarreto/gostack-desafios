import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #ffffff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 80px;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #999999;
      margin-left: 15px;
    }
  }

  aside {
    display: flex;
    align-items: flex-end;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      margin-bottom: 5px;
      color: #999999;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #de3b3b;
    }
  }
`;

const activeClassName = 'active';
export const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  &.${activeClassName} {
    color: #000000;
  }
`;
