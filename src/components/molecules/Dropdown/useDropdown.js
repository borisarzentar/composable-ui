import {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';

function attachKeyDownListener(listener) {
  document.addEventListener('keydown', listener);
  return () => document.removeEventListener('keydown', listener);
}

export default function useDropdown({
  items,
  onChange,
  value = null,
}) {
  const listenerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  // Will find index or -1
  const selected = useMemo(() => {
    if (value === null) {
      return -1;
    }
    return items.findIndex((item) => item === value);
  }, [value, items]);
  const [focused, setFocused] = useState(-1);

  const openDropdown = useCallback(() => {
    setFocused(selected);
    setIsOpen(true);
  }, [selected]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onPreviousItem = useCallback(() => {
    setFocused((currentFocused) => {
      if (currentFocused === -1 || currentFocused === 0) {
        return items.length - 1;
      }
      return currentFocused - 1;
    });
  }, [items]);

  const onNextItem = useCallback(() => {
    setFocused((currentFocused) => {
      if (currentFocused === -1 || currentFocused === items.length - 1) {
        return 0;
      }
      return currentFocused + 1;
    });
  }, [items]);

  const selectFocused = useCallback(() => {
    const newItem = items[focused];
    onChange(newItem);
  }, [items, focused, onChange]);

  const focusItem = useCallback((focusedItem) => {
    const index = items.findIndex((item) => item === focusedItem);
    setFocused(index);
  }, [items]);

  const handleKeyDown = useCallback((event) => {
    switch (event.keyCode) {
      case 38: { // up arrow
        onPreviousItem();
        break;
      }
      case 40: { // down arrow
        onNextItem();
        break;
      }
      case 13: // enter
        selectFocused();
        closeDropdown();
        break;
      case 27: // escape
        closeDropdown();
        break;
      default:
    }
  }, [closeDropdown, onPreviousItem, onNextItem, selectFocused]);

  useEffect(() => {
    if (isOpen) {
      if (listenerRef.current !== null) {
        listenerRef.current();
      }
      listenerRef.current = attachKeyDownListener(handleKeyDown);
    } else if (listenerRef.current !== null) {
      listenerRef.current();
      listenerRef.current = null;
    }
  }, [isOpen, handleKeyDown]);

  return {
    isOpen,
    openDropdown,
    closeDropdown,
    focusedItem: items[focused] || null,
    selectedItem: items[selected] || null,
    selectItem: onChange,
    focusItem,
  };
}
