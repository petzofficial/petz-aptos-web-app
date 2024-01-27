import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function CircularIndeterminate() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <CircularProgress size={50} sx={{ fontSize: isLargeScreen ? 100 : 50, height: isLargeScreen ? 100 : 50 }} />
    </Box>
  );
}
