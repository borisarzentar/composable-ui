import React, { useState } from 'react';
import SearchInput from '../components/molecules/SearchInput';
import useDecoratedChangeHandler from './utils/useDecoratedChangeHandler';

export default {
  title: 'SearchInput',
  component: SearchInput,
};

export const DefaultSearchInput = () => {
  const [value, setValue] = useState('');
  const handleChange = useDecoratedChangeHandler(SearchInput.displayName, setValue);

  return (
    <SearchInput
      value={value}
      onClear={() => setValue('')}
      onFocus={() => {}}
      onChange={handleChange}
    />
  );
};
