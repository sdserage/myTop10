import useMnemonicNumber from '../util/useMnemonicNumber';
import useMnemonicString from '../util/useMnemonicString';
import Condition from './Condition';
import styled from 'styled-components';

export default function EditableTitle(props) {
  const _saveChanges = props._saveChanges ?
    props._saveChanges
  :
    value => console.log('Save changes not implemented. Passed value: ', value);
  const {
    value: size,
    updateValue: updateSize,
    originalValue: originalSize,
    setNewOriginalValue: setNewOriginalSize,
  } = useMnemonicNumber(props.size || 10);
  const {
    value: title,
    updateValue: updateTitle,
    originalValue: originalTitle,
    setNewOriginalValue: setNewOriginalTitle,
  } = useMnemonicString(props.title);
  const sizePlaceholder = "Please enter a non negative whole number";
  const sizeStrLength = String(size).length || sizePlaceholder.length;
  const titlePlaceholder = "(Enter title here)";
  const titleSize = title.length || titlePlaceholder.length;
  return (
    <ListTitle gridArea="title" sizeStrLength={sizeStrLength}>
      Top&nbsp;
      <input
        type="number"
        placeholder={sizePlaceholder}
        value={size}
        onChange={e => {
          let cleanedValue = e.target.value.split('-').join('').split('.').join('');
          if (Number(cleanedValue) < 2) {
            cleanedValue = 2;
          }
          updateSize(Number(cleanedValue) || 2);
        }}
        min="2"
        step="1"
      />
      <input
        type="text"
        placeholder={titlePlaceholder}
        value={title}
        onChange={e => updateTitle(e.target.value)}
        size={titleSize}
      />
    </ListTitle>
  );
}

const ListTitle = styled.h2`
  color: inherit;
  grid-area: ${props => props.gridArea || 'none'};
  font-size: 1.5em;
  font-weight: bold;
  input {
    font-weight: inherit;
    font-size: inherit;
    background-color: transparent;
    border: none;
    color: inherit;
    margin-bottom: ${props => props.theme._spacer()};
    outline: none;
    border-radius: 5px;
  }
  input:first-child {
    width: ${props => props.sizeStrLength * 22}px;
  }
  input::placeholder {
    color: ${props => props.theme.mediumColor};
  }
  input:hover, input:focus {
    background: ${props => props.theme.lightestColor};
    color: ${props => props.theme.lightColor}
  }
`;