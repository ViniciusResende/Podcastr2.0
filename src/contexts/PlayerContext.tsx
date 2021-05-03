import { createContext, ReactNode, useContext, useState } from 'react';

interface Episode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

interface PlayerContextData {
  isDrawerInDisplay: boolean;
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  handleDrawerDisplay: () => void;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevius: () => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setPlayingState: (state: boolean) => void;
  clearPlayerState: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [isDrawerInDisplay, setIsDrawerInDisplay] = useState(false);
  
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleDrawerDisplay = () => {
    setIsDrawerInDisplay(prev => !prev);
  }

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
    setIsDrawerInDisplay(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
    setIsDrawerInDisplay(true);
  }

  function togglePlay() {
    setIsPlaying(prev => !prev);
  }

  function toggleLoop() {
    setIsLooping(prev => !prev);
  }

  function toggleShuffle() {
    setIsShuffling(prev => !prev);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  function playNext() {
    if(isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length); //TODO: Grant that the random is not the same that was playing
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevius() {
    if(hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider 
    value={{ 
      isDrawerInDisplay,
      episodeList, 
      currentEpisodeIndex, 
      play, 
      playList,
      playNext,
      playPrevius,
      isPlaying, 
      isLooping,
      isShuffling,
      hasNext,
      hasPrevious,
      handleDrawerDisplay,
      togglePlay, 
      toggleLoop,
      toggleShuffle,
      setPlayingState,
      clearPlayerState,
    }}> 
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}