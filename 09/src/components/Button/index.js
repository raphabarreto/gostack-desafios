import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled } from './styles';

export default function Button({ children, ...props }) {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
}

Button.propTypes = {
  children: PropTypes.element.isRequired,
};
