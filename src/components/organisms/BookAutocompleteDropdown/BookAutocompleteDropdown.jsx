import React, { useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../../molecules/SearchInput';
import Dropdown from '../../molecules/Dropdown';
import useDropdown from '../../molecules/Dropdown/useDropdown';
import BookDropdownItem from './BookDropdownItem';
import searchBooks from '../../../stories/utils/searchBooks';

const bookPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
});

const propTypes = {
  value: bookPropType,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    dropdown: PropTypes.string.isRequired,
    searchInput: PropTypes.string.isRequired,
    dropdownItem: PropTypes.string.isRequired,
    dropdownItemFocused: PropTypes.string.isRequired,
    dropdownItemSelected: PropTypes.string.isRequired,
    autocompleteDropdown: PropTypes.string.isRequired,
  }).isRequired,
};

export default function BookAutocompleteDropdown({
  styles,
  onChange,
  value = null,
}) {
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const dropdown = useDropdown({
    value,
    onChange,
    items: results,
  });

  const {
    isOpen,
    focusItem,
    selectItem,
    focusedItem,
    openDropdown,
    closeDropdown,
  } = dropdown;

  const handleItemClick = useCallback((item) => {
    selectItem(item);
    closeDropdown();
  }, [selectItem, closeDropdown]);

  const handleInputFocus = useCallback(() => {
    if (results.length > 0 && !isOpen) {
      openDropdown();
    }
  }, [results, isOpen, openDropdown]);

  const handleClearClick = useCallback(() => {
    selectItem(null);
    closeDropdown();
    setInputValue('');
    setResults([]);
  }, [closeDropdown, selectItem]);

  const handleInputChange = useCallback((searchValue) => {
    async function fetchBooks() {
      const books = await searchBooks(inputValue);
      setResults(books);
      openDropdown();
    }
    setInputValue(searchValue);
    if (inputValue.trim().length > 2) {
      fetchBooks();
    }
  }, [inputValue, openDropdown]);

  useEffect(() => {
    if (value !== null) {
      setInputValue(value.title);
    }
  }, [value]);

  const bookDropdownItemStyles = useMemo(() => ({
    dropdownItem: styles.dropdownItem,
    dropdownItemFocused: styles.dropdownItemFocused,
    dropdownItemSelected: styles.dropdownItemSelected,
  }));

  return (
    <div className={styles.autocompleteDropdown}>
      <SearchInput
        value={inputValue}
        onClear={handleClearClick}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      <Dropdown
        tabIndex={-1}
        isOpen={isOpen}
        className={styles.dropdown}
      >
        {results.map((item) => (
          <BookDropdownItem
            key={item.isbn13}
            value={item}
            styles={bookDropdownItemStyles}
            onFocus={focusItem}
            isFocused={focusedItem === item}
            onClick={handleItemClick}
            className={styles.dropdownItem}
            isSelected={value === item}
          >
            {`${item.title} | ${item.price}`}
          </BookDropdownItem>
        ))}
      </Dropdown>
    </div>
  );
}

BookAutocompleteDropdown.propTypes = propTypes;
