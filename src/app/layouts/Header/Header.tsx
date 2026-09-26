import { Link } from 'react-router-dom';
import { LogoLightTheme, SunIcon } from '@/shared/assets';
import { Button } from '@/shared/ui/buttons/Button/Button';
import './Header.scss';

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
