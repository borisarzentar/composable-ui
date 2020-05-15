import React, { useState } from 'react';
import Input from '../components/atoms/Input';
import useDecoratedChangeHandler from './utils/useDecoratedChangeHandler';

export default {
  title: 'Input',
  component: Input,
};

export const TextInput = () => {
  const [value, setValue] = useState('');
  const handleChange = useDecoratedChangeHandler(Input.displayName, setValue);

  return (
    <Input value={value} onChange={handleChange} />
  );
};
