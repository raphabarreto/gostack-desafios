import React from 'react';
import PropTypes from 'prop-types';

import { Content } from './styles';

export default function InitialLetters({ name }) {
  const formattedName = name.replace(/\s(de|da|do|dos|das|)\s/g, ' ');
  const letters = formattedName.match(/\b(\w)/gi);

  return <Content>{letters}</Content>;
}

InitialLetters.defaultProps = {
  name: String,
};

InitialLetters.propTypes = {
  name: PropTypes.string,
};
