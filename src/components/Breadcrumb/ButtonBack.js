import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ButtonBack = (props) => {
    const history = useHistory()
    return (
      <div >
        <Button
                  variant={ props.variant || "text" }
                  color="primary" size={props.size || 'small'}
                  startIcon={<ArrowBackIcon />}
                  onClick={history.goBack}
                  sx={{ mb: Number(props.marginBotton)||1}}
                >
                  Atrás
        </Button> 
      </div>
    );
  }

  export default ButtonBack;
