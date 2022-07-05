import { Alert, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = useState(false);
  const vertical = props.vertical || 'bottom';
  const horizontal = props.horizontal || 'center';
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.open !== "")
  }, [props.open])

  return (
    <Snackbar 
      anchorOrigin={{ vertical, horizontal }}
      open={open} 
      autoHideDuration={props.autoHideDuration?props.autoHideDuration:6000} 
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}