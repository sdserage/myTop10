import { useEffect, useState } from 'react';

export default function useMnemonicNumber(valueFromProps) {
  const [ value, updateValue ] = useState(valueFromProps || 0);
  const [ originalValue, setNewOriginalValue ] = useState(value);
  useEffect(() => {
    setNewOriginalValue(valueFromProps || 0);
  }, [valueFromProps]);
  return {value, updateValue, originalValue, setNewOriginalValue};
}