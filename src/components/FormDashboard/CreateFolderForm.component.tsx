import { Box, TextField, Typography } from "@mui/material";
import Button from "../Button/Button";

export interface AddFolderFormProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CreateFolderForm({
  handleChange,
  handleSubmit,
}: AddFolderFormProps) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Poppins",
          position: "relative",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        component="h4"
        sx={{
          fontFamily: "Poppins",

          position: "relative",
          marginBottom: "1rem",
        }}
      >
        Nouveau Dossier
      </Typography>
      <TextField
        id="input-folder"
        label="Nom"
        name="name"
        onChange={handleChange}
      />
      <Button label="Ajouter" variant="contained" onClick={handleSubmit} />
    </Box>
  );
}
