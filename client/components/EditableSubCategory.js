import CategoryLabel from './styledComponents/CategoryLabel';
import useMnemonicValue from '../util/useMnemonicValue';

export default function EditableSubCategory(props) {
  const _saveChanges = props._saveChanges ?
    props._saveChanges
  :
    value => console.log('Save changes not implemented. Passed value: ', value);
  const { value, updateValue, originalValue } = useMnemonicValue(props.value);
  const size = value.length || 17;
  return (
    <CategoryLabel primary={props.primary}>
      <input
        placeholder={props.placeholder}
        type="text"
        value={value}
        onChange={e => updateValue(e.target.value)}
        size={size}
      />
      {
        value !== originalValue &&
        <>
          {value &&
            <button
              onClick={e => {
                _saveChanges(value);
                e.preventDefault();
              }}
              >
              <i className="material-icons">
                save
              </i>
            </button>
          }
          <button
            onClick={e => {
              updateValue(originalValue);
              e.preventDefault();
            }}
          >
            <i className="material-icons">
              cancel
            </i>
          </button>
        </>
      }
    </CategoryLabel>
  );
}