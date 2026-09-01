import type { ChangeEvent, ComponentType, SVGProps } from 'react';
import { classNames } from '@/shared/helpers';
import { SearchClearIcon } from '@/shared/assets';
import './TextInput.scss';

interface TextInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  variant?: 'bordered' | 'underlined';
  size?: 'small' | 'medium';
  placeholder?: string;
  SearchIcon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export const TextInput = ({
  id,
  value,
  variant = 'bordered',
  size = 'medium',
  placeholder,
  onChange,
  SearchIcon
}: TextInputProps) => {
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClearInput = () => {
    onChange('');
  };

  return (
    <div
      className={classNames(
        'text-input',
        `text-input_${variant}`,
        `text-input_${variant}-${size}`
      )}
    >
      {SearchIcon && (
        <SearchIcon
          className='text-input__icon'
          aria-hidden='true'
        />
      )}
      <input
        id={id}
        type='text'
        value={value}
        placeholder={placeholder}
        onChange={handleChangeValue}
        className={classNames(
          'text-input__field',
          `text-input__field_${variant}`,
          `text-input__field_${variant}-${size}`
        )}
      />

      {value.length > 0 && SearchIcon && (
        <button
          type='button'
          onClick={handleClearInput}
          className='text-input__clear-button'
          aria-label='Clear input'
        >
          <SearchClearIcon aria-hidden='true' />
        </button>
      )}
    </div>
  );
};
