import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import Layouts from './layouts';
const App = () => {
  return (
    <Box>
      <BrowserRouter>
        <CssBaseline />
        <Layouts />
      </BrowserRouter>
    </Box>
  );
}
export default App