import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';

export default function CountdownTimer({ seconds, setSeconds }) {

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <Paper elevation={3} sx={{ p: 2, display: 'inline-block', bgcolor: '#f5f5f5', mt:2 }}>
      <Box display="flex" alignItems="center" justifyContent="center" maxWidth={100} height={10}>
        <Typography variant="h7" fontWeight="bold" color={seconds <= 10 ? 'error.main' : 'text.primary'}>
          ⏳ {formatTime(seconds)}
        </Typography>
      </Box>
    </Paper>
  );
}
