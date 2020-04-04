import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Footer({ children }) {
  return (
    <Container>
      <nav>{children}</nav>
    </Container>
  );
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};
