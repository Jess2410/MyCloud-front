import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Input as InputMui,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { FC, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export type InputProps = {
  label: string;
  password: boolean;
  inputName: string;
  value: string;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

const InputFile: FC<InputProps> = ({
  label,
  password,
  inputName,
  value,
  handleChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return password ? (
    <FormControl sx={{ height: "fit-content" }} variant="standard">
      <InputLabel
        color="secondary"
        sx={{ color: "#A0A0A0", fontFamily: "Poppins" }}
        htmlFor="standard-adornment-password"
      >
        {label}
      </InputLabel>
      <InputMui
        fullWidth
        color="secondary"
        id="standard-adornment-password"
        name={inputName}
        value={value}
        onChange={handleChange}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  ) : (
    <FormControl sx={{ height: "fit-content" }}>
      <TextField
        color="secondary"
        fullWidth
        id="standard-basic"
        label={label}
        variant="standard"
        name={inputName}
        value={value}
        onChange={handleChange}
        InputLabelProps={{
          sx: { fontFamily: "Poppins", color: "#A0A0A0" },
        }}
        sx={{ padding: "4px 0 " }}
      />
    </FormControl>
  );
};

export default InputFile;
