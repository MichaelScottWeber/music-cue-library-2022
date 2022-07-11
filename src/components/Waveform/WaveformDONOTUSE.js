import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

class Waveform extends Component {
  state = { playing: false };

  componentDidMount() {
    const track = document.querySelector('#track');

    this.waveform = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent',
    });
    // this.waveform.destroy();
    this.waveform.load(track);
  }

  componentWillUnmount() {}

  handlePlay = () => {
    console.log(this.url);
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  url = this.props.trackInfo.audio;

  render() {
    return (
      <div className='Waveform'>
        <p>{this.props.trackInfo.title}</p>
        <button onClick={this.handlePlay}>
          {this.state.playing ? 'Pause' : 'Play'}
        </button>
        <div id='waveform' />
        <audio src={this.url} id='track'></audio>
      </div>
    );
  }
}

export default Waveform;
