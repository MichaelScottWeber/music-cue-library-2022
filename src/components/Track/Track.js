import React from 'react';

function Track({ trackInfo, handleCurrentTrack }) {
  return (
    <div className='Track'>
      <h2>{trackInfo.title}</h2>
      <div>
        <h3>Description</h3>
        <button
          onClick={() => {
            handleCurrentTrack(trackInfo);
          }}
        >
          PLAY/PAUSE
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
