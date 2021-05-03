import { useCallback, useEffect, useState } from 'react';
import '../styles/global.scss';

import Header from "../components/Header";
import Player from "../components/Player";


import styles from '../styles/app.module.scss';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import BackdropDrawer from '../components/BackdropDrawer';
import SlideDrawer from '../components/SlideDrawer';

function MyApp({ Component, pageProps }) {

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isInDesktop, setIsInDesktop] = useState(false);

  const toggleThemeHandler = () => {
    setIsDarkTheme(prev => !prev);
  }

  const resizeHandler = useCallback(() => {
    window.innerWidth > 1650 ? setIsInDesktop(true) : setIsInDesktop(false);
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

  return(    
    <PlayerContextProvider>
      <div className={isDarkTheme ? styles.dark : styles.light}>
        <div className={styles.wrapper}>
          <main>
            <Header toggleThemeHandler={toggleThemeHandler} isDarkTheme={isDarkTheme}/>
            <Component {...pageProps} />
          </main>          
          {isInDesktop ? <Player playerClass="FHD"/> : (
            <>
              <SlideDrawer />
              <BackdropDrawer />
            </>
          )}
        </div>
      </div>
    </PlayerContextProvider>    
  )
}

export default MyApp
