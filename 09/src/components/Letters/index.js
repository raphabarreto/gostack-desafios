import React from 'react';
import PropTypes from 'prop-types';

import { Content } from './styles';

export default function InitialLetters({ name }) {
  const letters = name.match(/\b(\w)/g);

  return <Content>{letters}</Content>;
}

InitialLetters.defaultProps = {
  name: String,
};

InitialLetters.propTypes = {
  name: PropTypes.string,
};
