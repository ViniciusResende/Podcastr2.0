import React, { useCallback, useEffect, useState } from 'react';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Switch from 'react-switch';

import styles from './styles.module.scss';
import { usePlayer } from '../../contexts/PlayerContext';

interface HeaderProps {
  isDarkTheme: boolean;
  toggleThemeHandler: () => void;
}

const Header = ({isDarkTheme, toggleThemeHandler}: HeaderProps) => {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });

  const { handleDrawerDisplay, isPlaying } = usePlayer();

  const [isMobile, setIsMobile] = useState(false);

  const resizeHandler = useCallback(() => {
    window.innerWidth <= 560 ? setIsMobile(true) : setIsMobile(false);
  }, [])

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
  
    return function cleanup() {
      window.removeEventListener('resize', resizeHandler);
    }
  }, [resizeHandler]);

  useEffect(() => {
    resizeHandler();
  },[])

  return (
    <header className={styles.headerContainer}>
      {isMobile ? (
        <img src={isDarkTheme ? './logo-dark-notext.svg' : './logo-notext.svg'} alt="Podcastr"/>
      ) : (
        <img src={isDarkTheme ? './logo-dark.svg' : './logo.svg'} alt="Podcastr"/>
      )}

      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
      <Switch 
        className={styles.switch}
        onChange={toggleThemeHandler}
        checked={isDarkTheme}
        checkedIcon={false}
        uncheckedIcon={false}
        uncheckedHandleIcon={<img src="./sun.svg" alt="sun" style={{width: '26px'}}/>}
        checkedHandleIcon={<img src="./moon.svg" alt="moon"/>}
        offColor="#ececec"
        onColor="#16313f"
      />
      <div className={styles.openDrawer} onClick={() => handleDrawerDisplay()}>
        {isPlaying && <div className={styles.openDrawerPopUp}><img src="./play.svg" alt="play"/></div>}
        <img src={isDarkTheme ? './logo-dark-notext.svg' : './logo-notext.svg'} alt="open slider"/>
      </div>
    </header>
  );
}

export default Header;