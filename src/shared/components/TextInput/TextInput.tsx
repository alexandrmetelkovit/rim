import type { ChangeEvent, ComponentType, SVGProps } from 'react';
import { classNames } from '@/shared/helpers';
import { SearchClearIcon } from '@/shared/assets';
import './TextInput.scss';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  variant?: 'bordered' | 'underlined';
  placeholder?: string;
  startIcon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export const TextInput = ({
  value,
  variant = 'bordered',
  placeholder = 'Filter by name...',
  onChange,
  startIcon
}: TextInputProps) => {
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClearInput = () => {
    onChange('');
  };

  const StartIcon = startIcon;

  return (
    <div className={classNames('text-input', `text-input_${variant}`)}>
      {StartIcon && (
        <StartIcon
          className='text-input__icon'
          aria-hidden='true'
        />
      )}
      <input
        type='text'
        value={value}
        placeholder={placeholder}
        onChange={handleChangeValue}
        className='text-input__field'
      />

      {value.length > 0 && StartIcon && (
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
