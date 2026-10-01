import React from 'react';
import './Button.scss';

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ text, icon, onClick }: ButtonProps) => {
  return (
    <button
      className='button'
      type='button'
      onClick={onClick}
    >
      {icon && <span className='button__icon'>{icon}</span>}
      {text && <span className='button__text'>{text}</span>}
    </button>
  );
};
