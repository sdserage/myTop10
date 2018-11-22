import useMnemonicString from '../util/useMnemonicString';
import Condition from './Condition';
import styled from 'styled-components';
import { useRef, useState } from 'react';

export default function EditableCategory(props) {
  const selectEl = useRef(null);
  const [ visibleSpan, setVisibleSpan ] = useState(true);
  const _saveChanges = props._saveChanges ?
    props._saveChanges
  :
    value => console.log('Save changes not implemented. Passed value: ', value);
  const { value, updateValue, originalValue, setNewOriginalValue } = useMnemonicString(props.value);
  const size = value.length || props.placeholder.length;
  console.log('selectEl: ', selectEl);

  return (
    <Category
      value={value}
      size={size}
      onMouseEnter={() => selectEl.current.focus()}
      onMouseLeave={() => selectEl.current.blur()}
    >
      <Condition condition={visibleSpan}>
        <span>{value || props.placeholder}</span>
      </Condition>
      <select
        ref={selectEl}
        value={value}
        onChange={e => {
          updateValue(e.target.value);
          if (!props.saveMode) {
            e.target.blur();
            props.onChange(e.target.value);
          }
        }}
        onFocus={() => setVisibleSpan(false)}
        onBlur={() => setVisibleSpan(true)}
      >
        <Condition condition={value === ''}>
          <option value="" disabled>{props.placeholder}</option>
        </Condition>
        {props.options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <Condition condition={value !== originalValue && props.saveMode}>
        <Condition condition={value}>
          <button
            onClick={e => {
              e.preventDefault();
              _saveChanges(value, originalValue);
              if (props.submitType) {
                updateValue('')
                setNewOriginalValue('');
              }
            }}
            >
            <i className="material-icons">
              save
            </i>
          </button>
        </Condition>
        <button
          onClick={e => {
            e.preventDefault();
            updateValue(originalValue);
          }}
        >
          <i className="material-icons">
            cancel
          </i>
        </button>
      </Condition>
    </Category>
  );
}

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