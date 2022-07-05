import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { UserProvider } from './components/Auth/User'
//import { AfiliadosProvider } from './components/Afiliados/AfiliadosProvider'
//import { InfoAfiliadoProvider } from './components/Afiliados/InfoAfiliadoProvider'
import { esES as coreEsEs } from '@mui/material/locale';
import { esES } from '@mui/x-data-grid';

// SET axios base URL for IOSPER API
axios.defaults.baseURL = `${process.env.REACT_APP_IOSPER_ENDPOINT_BASE_URL}`;

const theme = createTheme(
  {
    palette: {
      neutral: {
        main: '#e0e0e0',
        contrastText: 'rgba(2,37,34,0.96)',
      },
      primary: {
        main: '#005a55',
        contrastText: 'rgba(255,255,255,0.93)',
      },
      secondary: {
        main: '#b12823',
      },
      text: {
        neutral: 'rgba(2,37,34,0.96)',
      },
    },
    typography: {
      subtitle1: {
        color: '#5f6368',
      },
      button: {
        fontWeight: 400,
      },
    },
  }, 
  esES,
  coreEsEs,
);

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <UserProvider>
              <App />
        </UserProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
