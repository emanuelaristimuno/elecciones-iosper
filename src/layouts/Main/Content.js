import React from 'react';
import { Container, styled } from '@mui/material';
import Pages from '../../routes/Pages';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Content = () => {
  return (
    <Container component="main" sx={{ flexGrow: 1, p: 3 }} style={{  maxWidth: '1022px' }}>
      <DrawerHeader />
      <Pages />
    </Container>
  );
}

export default Content
