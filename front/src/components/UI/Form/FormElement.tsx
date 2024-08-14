import { Grid, TextField, IconButton, InputAdornment } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface IProps {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    required?: boolean;
    error?: string;
    type?: string;
    multiline?: boolean;
    fullWidth?: boolean;
    variant?: "outlined" | "filled" | "standard";
    rows?: number;
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
    margin?: "normal" | "dense";
    width?: string;
}

const FormElement = (props: IProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Grid item>
            <TextField
                margin={props.margin}
                id={props.name}
                label={props.label}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                autoComplete={props.name}
                multiline={props.multiline}
                error={!!props.error}
                helperText={props.error}
                required={props.required}
                type={props.type === "password" && showPassword ? "text" : props.type}
                fullWidth={props.fullWidth}
                variant={props.variant}
                rows={props.rows}
                color={props.color}
                sx={{ width: props.width}}
                InputProps={
                    props.type === "password" ? {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    } : undefined
                }
            />
        </Grid>
    );
};

export default FormElement;