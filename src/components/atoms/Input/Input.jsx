import React from 'react';
import PropTypes from 'prop-types';

export const propTypes = {
  value: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default function Input({
  value,
  onFocus,
  onChange,
  className,
}) {
  return (
    <input
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      className={className}
    />
  );
}

Input.propTypes = propTypes;
