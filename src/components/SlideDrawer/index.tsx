import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';

import styles from './styles.module.scss';

import Player from '../Player';

const SlideDrawer: React.FC = () => {
  const { isDrawerInDisplay } = usePlayer();

  return (
    <>
      {isDrawerInDisplay ? (
        <div className={[styles.container, styles.open].join(" ")}>
          <Player />
        </div>
      ): (
        <div className={[styles.container, styles.closed].join(" ")}>
          <Player />
        </div>
    )}
    </>
  );
}

export default SlideDrawer;