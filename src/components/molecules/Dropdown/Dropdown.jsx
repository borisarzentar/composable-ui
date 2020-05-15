import React from 'react';
import PropTypes from 'prop-types';

export default function Dropdown({
  isOpen,
  children,
  tabIndex,
  className,
}) {
  return isOpen && (
    <div
      role="listbox"
      tabIndex={tabIndex}
      className={className}
    >
      {children}
    </div>
  );
}

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  tabIndex: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};
