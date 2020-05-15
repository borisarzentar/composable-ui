import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function BookDropdownItem({
  value,
  styles,
  onFocus,
  onClick,
  children,
  isFocused,
  isSelected,
}) {
  const allClassNames = classNames(styles.dropdownItem, {
    [styles.dropdownItemFocused]: isFocused,
    [styles.dropdownItemSelected]: isSelected,
  });
  const handleClick = useCallback(() => onClick(value), [onClick, value]);
  const handleFocus = useCallback(() => onFocus(value), [onFocus, value]);
  return (
    <div
      role="option"
      aria-selected={isSelected}
      tabIndex="0"
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseEnter={handleFocus}
      onKeyDown={() => {}}
      className={allClassNames}
    >
      {children}
    </div>
  );
}

BookDropdownItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
  onFocus: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  styles: PropTypes.shape({
    dropdownItem: PropTypes.string.isRequired,
    dropdownItemFocused: PropTypes.string.isRequired,
    dropdownItemSelected: PropTypes.string.isRequired,
  }).isRequired,
};
