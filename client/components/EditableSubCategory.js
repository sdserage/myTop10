import SubCategory from './styledComponents/SubCategory';
import useMnemonicString from '../util/useMnemonicString';
import Condition from './Condition';

export default function EditableSubCategory(props) {
  const _saveChanges = props._saveChanges ?
    props._saveChanges
  :
    value => console.log('Save changes not implemented. Passed value: ', value);
  const { value, updateValue, originalValue, setNewOriginalValue } = useMnemonicString(props.value);
  const size = value.length || props.placeholder.length;
  return (
    <SubCategory value={value} special={props.special} submitType={props.submitType}>
      <Condition condition={props.submitType}>
        <i className="material-icons">
          add_circle_outline
        </i>
      </Condition>
      <input
        placeholder={props.placeholder}
        type="text"
        value={value}
        onChange={e => updateValue(e.target.value)}
        size={size}
      />
      <Condition condition={value !== originalValue}>
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
    </SubCategory>
  );
}