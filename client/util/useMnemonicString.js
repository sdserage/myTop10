import { useEffect, useState } from 'react';

export default function useMnemonicString(valueFromProps) {
  const [ value, updateValue ] = useState(valueFromProps || '');
  const [ originalValue, setNewOriginalValue ] = useState(value);
  useEffect(() => {
    setNewOriginalValue(valueFromProps || '');
  }, [valueFromProps]);
  return {value, updateValue, originalValue, setNewOriginalValue};
}