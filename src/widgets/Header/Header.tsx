import { LogoLightTheme, SunIcon } from '@/shared/assets';
import { Button } from '@/shared/components/Button/Button';

import './Header.scss';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__info container'>
        <div className='header__logo'>
          <LogoLightTheme />
        </div>
        <div className='header__actions'>
          <Button icon={<SunIcon />} />
          <Button text='РУ' />
        </div>
      </div>
    </header>
  );
};
