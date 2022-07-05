import React from 'react';
import { Box } from '@mui/material';
import Menu from './Header/Menu';
import Content from './Main/Content';

const Layouts = () => {
  return (
    <Box sx={{ display: 'flex' }}>
        <Menu /> 
        <Content />
    </Box>
  )
}

export default Layouts