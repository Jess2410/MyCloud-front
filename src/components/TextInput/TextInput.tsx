import { TextField as TextFieldMui } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton as IconButtonMui } from "@mui/material";

export default function TextField() {
  return (
    <TextFieldMui
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButtonMui></IconButtonMui>
          </InputAdornment>
        ),
      }}
    />
  );
}
