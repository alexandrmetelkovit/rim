import { LogoLightTheme, SunIcon } from '@/shared/assets';
import { Button } from '@/shared/components/Button/Button';
import './Header.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__info container'>
        <div className='header__logo'>
          <Link to={'/'}>
            <LogoLightTheme />
          </Link>
        </div>
        <div className='header__actions'>
          <Button icon={<SunIcon />} />
          <Button text='РУ' />
        </div>
      </div>
    </header>
  );
};
