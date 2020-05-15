import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

export const propTypes = {
  value: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    input: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    searchInput: PropTypes.string.isRequired,
  }).isRequired,
};

export default function SearchInput({
  value,
  styles,
  onClear,
  onFocus,
  onChange,
}) {
  const handleSearchInputChange = useCallback((event) => {
    onChange(event.target.value);
  }, [onChange]);

  return (
    <div className={styles.searchInput}>
      <Input
        onFocus={onFocus}
        value={value}
        onChange={handleSearchInputChange}
        className={styles.input}
      />
      <Button
        onClick={onClear}
        className={styles.button}
      >
        Clear
      </Button>
    </div>
  );
}

SearchInput.propTypes = propTypes;
