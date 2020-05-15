import React, { useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function Button({
  size = 'm',
  type = 'button',
  styles,
  onClick,
  children,
  className,
}) {
  const finalClassName = useMemo(() => classNames(
    {
      [styles[size]]: true,
    },
    className,
  ), [size, styles, className]);

  return (
    // Type is not explicitly set so eslint makes problems.
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={finalClassName}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  styles: PropTypes.shape({
    button: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.node.isRequired,
};
