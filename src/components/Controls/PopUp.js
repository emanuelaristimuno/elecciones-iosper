import React from 'react';
import { IconButton, Avatar, Grid, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import logo from '../../assets/images/logo-small.png'
import { Close } from '@mui/icons-material';

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

const PopUp = (props) => {
    const { open, title, content, actions, maxWidth, onClose } = props

    const setTitle =
        title == null ?
            <Grid container spacing={1} direction="row">
                <Grid item>
                    <Avatar alt="IOSPER" src={logo} />
                </Grid>
                <Grid item>
                    <Typography variant="h6" noWrap>&nbsp;&nbsp;&nbsp;Mi IOSPER</Typography>
                </Grid>
            </Grid>
            : title

    return (
        <Dialog fullWidth={true} maxWidth={maxWidth ?? 'md'} aria-labelledby="customized-dialog-title" open={open}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                {setTitle}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {content}
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                {actions}
            </DialogActions>
        </Dialog>
    )
}

export default PopUp
