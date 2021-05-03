import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';

import styles from './styles.module.scss';

const BackdropDrawer: React.FC = () => {
  const { isDrawerInDisplay, handleDrawerDisplay } = usePlayer();
  if(isDrawerInDisplay){
    return <div className={styles.container} onClick={() => handleDrawerDisplay()}/>
  }

  return <div />;
}

export default BackdropDrawer;