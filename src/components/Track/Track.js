import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

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
    <Paper elevation={2} className='Track'>
      <Box padding={2}>
        <IconButton
          aria-label='play/pause'
          onClick={handlePlayPauseButton}
          size='small'
        >
          {currentTrack.title === trackInfo.title && isPlaying ? (
            <PauseIcon fontSize='large' />
          ) : (
            <PlayArrowIcon fontSize='large' />
          )}
        </IconButton>
        <Typography variant='h6' component='h3'>
          {trackInfo.title}
        </Typography>
        <Typography variant='body1' component='span'>
          {trackInfo.duration}
        </Typography>
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel-content'
            id='panel-header'
          >
            <Typography variant='body1' component='span'>
              Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2' component='p' gutterBottom>
              <strong>Description: </strong>
              {trackInfo.description}
            </Typography>
            <Typography variant='body2' component='p' gutterBottom>
              <strong>Moods: </strong>
              {trackInfo.mood.join(', ')}
            </Typography>
            <Typography variant='body2' component='p' gutterBottom>
              <strong>Genre: </strong>
              {trackInfo.genre.join(', ')}
            </Typography>
            <Typography variant='body2' component='p'>
              <strong>Instrumentation: </strong>
              {trackInfo.instrumentation.join(', ')}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
}

export default Track;
