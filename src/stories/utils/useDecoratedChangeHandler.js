import { useMemo } from 'react';
import { decorate } from '@storybook/addon-actions';

export default function useDecoratedChangeHandler(inputName, changeHandler) {
  return useMemo(() => {
    const decoratedHandler = decorate([([event]) => {
      const newValue = event?.target?.value ? event.target.value : event;
      changeHandler(newValue);
      return [newValue];
    }]);
    return decoratedHandler.action(`${inputName} value`);
  }, [changeHandler, inputName]);
}
