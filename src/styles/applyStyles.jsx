import React, { useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

function getKeyByValue(object, value) {
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const keyValue = object[key];
    if (keyValue === value) {
      return key;
    }
  }
  return null;
}

export default function applyStyles(WrappedComponent, defaultClassName, styles) {
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  function StyledComponent({
    className = null,
    ...rest
  }) {
    const styleProps = useMemo(() => {
      // console.log('applyStyles(WrappedComponent, defaultClassName, styles): calculating styles');
      const newProps = {};
      if (defaultClassName === undefined) {
        throw new Error(`
          Error in 'applyStyles(WrappedComponent, defaultClassName, styles)':\n
          Missing defaultClassName parameter\n
          Used in '${WrappedComponent.displayName}' component
        `);
      }
      newProps.className = classNames(defaultClassName, className);
      if (styles) {
        newProps.styles = {
          ...styles,
          [getKeyByValue(styles, defaultClassName)]: classNames(defaultClassName, className),
        };
      }
      return newProps;
    }, [className]);
    return (
      // This component is abstracting away className property propagation
      // eslint-disable-next-line react/jsx-props-no-spreading
      <WrappedComponent {...rest} {...styleProps} />
    );
  }

  StyledComponent.propTypes = {
    className: PropTypes.string,
  };
  StyledComponent.displayName = wrappedComponentName;
  hoistNonReactStatics(StyledComponent, WrappedComponent);

  return StyledComponent;
}
