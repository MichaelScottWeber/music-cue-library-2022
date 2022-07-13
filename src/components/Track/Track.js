import React from 'react';

function Track({
  trackInfo,
  handleCurrentTrack,
  currentTrack,
  isPlaying,
  handleIsPlaying,
}) {
  const handlePlayPauseButton = () => {
    handleCurrentTrack(trackInfo);
    if (trackInfo.title === currentTrack.title) {
      handleIsPlaying(!isPlaying);
    }
  };

  return (
    <div className='Track'>
      <h2>{trackInfo.title}</h2>
      <div>
        <h3>Description</h3>
        <button onClick={handlePlayPauseButton}>
          {currentTrack.title === trackInfo.title && isPlaying
            ? 'PAUSE'
            : 'PLAY'}
        </button>
        <p>{trackInfo.description}</p>
      </div>
      <div>
        <h3>Moods</h3>
        <p>{trackInfo.mood.join(', ')}</p>
      </div>
      <div>
        <h3>Genre</h3>
        <p>{trackInfo.genre.join(', ')}</p>
      </div>
      <div>
        <h3>Instrumentation</h3>
        <p>{trackInfo.instrumentation.join(', ')}</p>
      </div>
    </div>
  );
}

export default Track;
