import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { useThemeStore } from '@/stores';
import { LogoLightTheme, SunIcon, MoonIcon } from '@/assets';
import { useCharactersWithFilters } from '@/shared/hooks';
import './Header.scss';

export const Header = () => {
  const { resetFilters } = useCharactersWithFilters();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDark = theme === 'dark';

  return (
    <header className='header'>
      <div className='header__info container'>
        <div className='header__logo'>
          <Link
            to='/'
            onClick={resetFilters}
          >
            <LogoLightTheme className='header__logo-image' />
          </Link>
        </div>
        <div className='header__actions'>
          <Button
            icon={isDark ? <MoonIcon /> : <SunIcon />}
            onClick={toggleTheme}
            aria-label={
              isDark ? 'Switch to light theme' : 'Switch to dark theme'
            }
          />
          <Button text='РУ' />
        </div>
      </div>
    </header>
  );
};
