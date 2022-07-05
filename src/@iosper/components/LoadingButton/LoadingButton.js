import React, { useEffect } from "react"
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { Box } from "@mui/material";

const LoadingButton = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(props?.disabled || false);
  const [content, setContent] = React.useState(props?.content || '');
  const [button, setButton] = React.useState(props || null);

  useEffect(() => {
    setDisabled(props?.disabled)
    setLoading(props?.loading === 'show' ? true : false)
    setContent(props?.content)
    setButton(props)
  }, [props])
  
  return (
    <Box sx={{ m: 1, position: 'relative', alignItems: "center" }}>
      <Button {...button} disabled={disabled || loading}>
        {content}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
};

export default React.memo(LoadingButton);
