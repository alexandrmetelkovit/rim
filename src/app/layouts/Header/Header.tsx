import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { LogoLightTheme, SunIcon } from '@/assets';
import { useCharactersWithFilters } from '@/shared/hooks';
import './Header.scss';

export const Header = () => {
  const { resetFilters } = useCharactersWithFilters();

  return (
    <header className='header'>
      <div className='header__info container'>
        <div className='header__logo'>
          <Link
            to='/'
            onClick={resetFilters}
          >
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
