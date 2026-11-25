import React from 'react';
import { classNames } from '@/shared/lib';
import './Button.scss';

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button = ({ text, icon, onClick, className }: ButtonProps) => {
  return (
    <button
      className={classNames('button', className)}
      type='button'
      onClick={onClick}
    >
      {icon && <span className='button__icon'>{icon}</span>}
      {text && <span className='button__text'>{text}</span>}
    </button>
  );
};
