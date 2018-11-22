import styled from 'styled-components';

const CategoryLabel = styled.li`
  padding: ${props => props.theme._spacer()};
  background-color: ${props => props.primary ? props.theme.lightColor : props.theme.mediumColor};
  color: ${props => props.theme.lightestColor};
  border: ${props => props.primary ? props.theme.lightColor : props.theme.mediumColor} 1px solid; 
  display: inline-block;
  margin: ${props => props.theme._spacer()} ${props => props.theme._spacer()} 0 0;
  border-radius: 5px;
  box-shadow: 2px 2px 5px ${props => props.theme.mediumColor};
  max-height: 39px;
  text-align: center;
  outline: none;
  button {
    cursor: pointer;
    background: transparent;
    padding: 0 0 0 ${props => props.theme._spacer(0.5)};
    color: inherit;
    border: none;
    font-size: inherit;
    outline: none;
    i {
      color: inherit;
      font-size: inherit;
    }
  }
  button:hover {
    color: ${props => props.primary ? props.theme.mediumColor : props.theme.lightColor};
  }
  input {
    background: transparent;
    border: none;
    font-size: inherit;
    outline: none;
    color: inherit;
  }
  input::placeholder {
    color: inherit;
  }
  &:hover, &:focus, &:focus-within {
    background-color: ${props => props.theme.lightestColor};
    color: ${props => props.primary ? props.theme.lightColor : props.theme.mediumColor};
  }
`;

export default CategoryLabel;