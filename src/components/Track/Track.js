import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function Track({
  trackInfo,
  handleCurrentTrack,
  currentTrack,
  handleIsPlaying,
  isPlaying,
  handleSelectedMood,
  handleSelectedGenre,
  handleSelectedInstrument,
}) {
  const handlePlayPauseButton = () => {
    handleCurrentTrack(trackInfo);
    if (trackInfo.title === currentTrack.title) {
      handleIsPlaying(!isPlaying);
    }
  };

  const removeDuplicates = (arr) => {
    const set = new Set(arr);
    return [...set];
  };

  return (
    <Paper sx={{ borderRadius: '10px' }} elevation={0} className='Track'>
      <Box paddingX={1} paddingY={2}>
        <Accordion elevation={0}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            spacing={2}
          >
            <Stack direction='row' alignItems='center' spacing={2}>
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
              <Typography variant='body1' component='h3'>
                <strong>{trackInfo.title}</strong>
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='body1' component='span'>
                {trackInfo.duration}
              </Typography>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel-content'
                id='panel-header'
              >
                <Typography variant='body1' component='span'>
                  Details
                </Typography>
              </AccordionSummary>
            </Stack>
          </Stack>

          <AccordionDetails>
            <Typography variant='body2' component='p' gutterBottom>
              <strong>Description: </strong>
              {trackInfo.description}
            </Typography>
            <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
            <div className='chip-container'>
              <Typography variant='body2' component='p' paddingRight={1}>
                <strong>Moods: </strong>
                {/* {trackInfo.mood.join(', ')} */}
              </Typography>
              <ul>
                {removeDuplicates(trackInfo.mood).map((mood) => (
                  <li key={mood.toLowerCase()}>
                    <Chip
                      label={mood.toLowerCase()}
                      onClick={(e) => {
                        handleSelectedMood(mood.toLowerCase());
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
            <div className='chip-container'>
              <Typography variant='body2' component='p' paddingRight={1}>
                <strong>Genre: </strong>
                {/* {trackInfo.genre.join(', ')} */}
              </Typography>
              <ul>
                {removeDuplicates(trackInfo.genre).map((genre) => (
                  <li key={genre.toLowerCase()}>
                    <Chip
                      label={genre.toLowerCase()}
                      onClick={(e) => {
                        handleSelectedGenre(genre.toLowerCase());
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
            <div className='chip-container'>
              <Typography variant='body2' component='p' paddingRight={1}>
                <strong>Instrumentation: </strong>
                {/* {trackInfo.instrumentation.join(', ')} */}
              </Typography>
              <ul>
                {removeDuplicates(trackInfo.instrumentation).map(
                  (instrument) => (
                    <li key={instrument.toLowerCase()}>
                      <Chip
                        label={instrument.toLowerCase()}
                        onClick={(e) => {
                          handleSelectedInstrument(instrument.toLowerCase());
                        }}
                      />
                    </li>
                  )
                )}
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
}

export default Track;
