import React, { useState } from 'react';
import BookAutocompleteDropdown from '../components/organisms/BookAutocompleteDropdown';
import useDecoratedChangeHandler from './utils/useDecoratedChangeHandler';

export default {
  title: 'BookAutocompleteDropdown',
  component: BookAutocompleteDropdown,
};

export const DefaultBookAutocompleteDropdown = () => {
  const [value, setValue] = useState(null);
  const handleChange = useDecoratedChangeHandler(BookAutocompleteDropdown.displayName, setValue);

  return (
    <BookAutocompleteDropdown value={value} onChange={handleChange} />
  );
};
