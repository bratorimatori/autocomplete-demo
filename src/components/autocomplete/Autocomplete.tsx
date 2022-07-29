import {
  useState,
  KeyboardEvent,
  useEffect,
  useCallback,
  ChangeEvent,
  useRef,
} from 'react';
import InputLabel from '../label/Label';
import './styles.css';
import {
  disablePointerOnKeybord,
  handleSearch,
  mouseEnterHandler,
  setActiveOnListElement,
} from './util';

interface AutocompleteProps {
  options: string[];
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
}

const Autocomplete = ({
  options,
  placeholder = 'Options',
  disabled,
  label = 'Search ',
  error,
}: AutocompleteProps): JSX.Element => {
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [isShow, setIsShow] = useState(false);
  const [query, setQuery] = useState('');
  const [hasPointerEvent, setHasPointerEvent] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.stopPropagation();
      const { key } = event;
      setHasPointerEvent(true);
      if (key === 'Enter' && query) {
        setActive(0);
        setIsShow(false);
        setQuery(filtered[active]);
      }
      if (key === 'ArrowUp') {
        return active === 0 ? null : setActive(active - 1);
      }
      if (key === 'ArrowDown') {
        return active === filtered.length - 1 ? null : setActive(active + 1);
      }
      if (key === 'Escape') {
        setActive(0);
        setIsShow(false);
        setQuery('');
      }
    },
    [active, filtered, query]
  );

  const handleClickOutside = useCallback(
    (event: any) => {
      const hasClikedOutsideList =
        isShow && ulRef.current && !ulRef.current.contains(event.target);
      const hasClikedOutsideNoOptions =
        isShow && divRef.current && !divRef.current.contains(event.target);
      if (hasClikedOutsideList || hasClikedOutsideNoOptions) {
        setActive(0);
        setIsShow(false);
      }
    },
    [isShow]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    disablePointerOnKeybord(hasPointerEvent);
    setActiveOnListElement(active);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleUserKeyPress, active, hasPointerEvent, handleClickOutside]);

  const isDisabled = disabled === true;
  const hasError = error ? error !== '' : false;
  const showError = isDisabled ? false : hasError;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(options, event.currentTarget.value)
      .then((suggestions) => {
        setFiltered(suggestions);
      })
      .catch((err) => {
        console.log(err);
      });
    setQuery(event.currentTarget.value);
    setIsShow(true);
    setActive(0);
  };

  const onClick = (e: any) => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setQuery(e.currentTarget.innerText);
  };

  const Options = (): JSX.Element => {
    if (filtered.length) {
      return (
        <ul
          className='autocomplete'
          id='autocomplete_list'
          tabIndex={0}
          ref={ulRef}
        >
          {filtered.map((suggestion, index) => {
            return (
              <li
                key={index}
                onClick={onClick}
                id={`${index}`}
                onMouseEnter={() => {
                  mouseEnterHandler(index);
                }}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <div className='autocomplete no-autocomplete' ref={divRef}>
          <em>No options</em>
        </div>
      );
    }
  };

  return (
    <div className='autocomplete-wrapper'>
      <InputLabel label={label} labelFor='auto-input' />
      <input
        type='text'
        onChange={onChange}
        onKeyDown={handleUserKeyPress}
        onKeyUp={() => setHasPointerEvent(false)}
        value={query}
        placeholder={placeholder}
        disabled={disabled}
        id='auto-input'
      />
      {isShow && query && Options()}
      {showError && (
        <label role='textbox' aria-label={`Error: ${error}`} className='label'>
          {error}
        </label>
      )}
    </div>
  );
};

export default Autocomplete;
