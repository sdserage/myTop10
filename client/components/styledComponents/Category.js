import styled from 'styled-components';

const Category = styled.li`
  position: relative;
  padding: ${props => props.theme._spacer()};
  background-color: ${props =>props.theme.lightColor};
  color: ${props => props.theme.lightestColor};
  border: ${props =>props.theme.lightColor} 1px solid; 
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
    color: ${props => props.theme.mediumColor};
  }
  span {
    color: ${props => props.value ? 'inherit' : props.theme.darkColor};
  }
  select {
    border-radius: 0;
    width: 0;
    /* width: calc(${props => props.size} * 10px); */
    outline: none;
    font-size: inherit;
    font-family: inherit;
    border: none;
    color: ${props => props.value ? 'inherit' : props.theme.darkColor};
    background: transparent;
  }
  select:focus {
    width: 100%;
  }
  &:hover, &:focus, &:focus-within {
    background-color: ${props => props.theme.lightestColor};
    color: ${props => props.theme.lightColor};
  }
`;

export default Category;