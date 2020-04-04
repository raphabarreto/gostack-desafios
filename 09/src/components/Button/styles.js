import Styled from 'styled-components';

function statusColor(tone) {
  switch (tone) {
    case 'gray':
      return `#CCCCCC`;

    default:
      return '#7D40E7';
  }
}

export const ButtonStyled = Styled.button`
	background-color: ${props =>
    props.disabled ? statusColor('gray') : statusColor(props.tone)};
	border-radius: 4px;
	padding: 12px 24px;
	color: #FFF;
	font-size: 16px;
	font-weight: bold;
	border: none;
	display: flex;
	align-items: center;
	cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
	${props => (props.block ? 'width:100%;' : 'width:auto')}
`;
