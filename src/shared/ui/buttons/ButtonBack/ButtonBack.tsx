import { ArrowBack } from '@/shared/assets';
import './ButtonBack.scss';

interface ButtonBackProps {
  text?: string;
  onClick?: () => void;
}

export const ButtonBack = ({ text = 'GO BACK', onClick }: ButtonBackProps) => {
  return (
    <button
      className='button-back'
      type='button'
    >
      <ArrowBack
        className='button-back__button'
        onClick={onClick}
      />
      {text && <span className='button-back__text'>{text}</span>}
    </button>
  );
};
