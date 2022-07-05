import { TextField } from '@mui/material';

const PasswordTextInput  = ({fieldName, label, register, errors}) => {
    return (
        <div>
            <TextField
                variant="outlined"
                required
                fullWidth
                name={fieldName}
                label={label}
                type="password"
                id={fieldName}
                {...register(fieldName, {
                    required: {
                        value:true,
                        message: 'Debe ingresar ' + label
                    },
                    maxLength: { 
                        value: 25, 
                        message: label + ' debe tener como máximo 25 caracteres.', 
                    }, 
                    minLength: { 
                        value: 6, 
                        message: label + ' debe tener como mínimo 6 caracteres.', 
                    },
                    pattern: {
                        value: /^[0-9a-zA-Z]+$/,
                        message: label + ' debe contener solo letras y al menos un número'
                      }
                    }
                )} 
            />
            {errors[fieldName] && (
                <p style={{ color: "red" }}>{errors[fieldName].message}</p>
            )}
      </div>
    )

}

export default PasswordTextInput ;
