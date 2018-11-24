import useMnemonicString from '../util/useMnemonicString';
import Condition from './Condition';
import { useRef, useState } from 'react';
import Category from './styledComponents/Category';

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
      onClick={() => selectEl.current.focus()}
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