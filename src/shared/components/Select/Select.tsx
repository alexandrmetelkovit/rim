import { type ComponentType, useEffect, useRef, useState } from 'react';
import { ArrowDown } from '@/shared/assets';
import './Select.scss';

export interface Option<T> {
  label: string;
  value: T;
}

export interface DefaultOptionComponentProps<T> {
  option: Option<T>;
}

type SelectSize = 'small' | 'medium';

interface SelectProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  size?: SelectSize;
  OptionComponent?: ComponentType<DefaultOptionComponentProps<T>>;
}

const DefaultOptionComponent = <T,>({
  option
}: DefaultOptionComponentProps<T>) => {
  return <span>{option?.label}</span>;
};

export const Select = <T,>({
  options,
  value,
  onChange,
  placeholder,
  size = 'medium',
  OptionComponent = DefaultOptionComponent
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleChangeOptions = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div
      className={`select select_${size}`}
      ref={componentRef}
    >
      <button
        onClick={toggleSelect}
        className={`select__button select__button_${size}`}
      >
        <span className={`select__title select__title_${size}`}>
          {selectedOption ? (
            <OptionComponent option={selectedOption} />
          ) : (
            placeholder
          )}
        </span>

        <ArrowDown
          className={`select__arrow select__arrow_${size} ${isOpen ? 'select__arrow_open' : ''}`}
        />
      </button>

      {isOpen && (
        <ol className={`select__list select__list_${size}`}>
          {options.map((option) => (
            <li
              key={String(option.value)}
              className={`select__item select__item_${size}`}
              onClick={() => handleChangeOptions(option.value)}
            >
              <OptionComponent option={option} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
