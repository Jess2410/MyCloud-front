import { Box, TextField, Typography } from "@mui/material";
import Button from "../../Button/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormAddFolder = () => {
  const [name, setName] = useState("");
  console.log("🚀 ~ FormAddFolder ~ name:", name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const loader = toast.loading("Veuillez patienter...");
    try {
      const request = await fetch("http://localhost:8000/api/folder", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify(name),
      });
      const response = await request.json();
      if (response.status === 201) {
        toast.update(loader, {
          render: "Le dossier a bien été créé !",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        navigate("/dashboard");
        return;
      }
      toast.update(loader, {
        render: `Une erreur est survenue : ${response.message}.`,
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
      throw new Error(response.message);
    } catch (error) {
      console.log(error);
    }
  };
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
        value={name}
        onChange={handleChange}
      />
      <Button
        label="Ajouter"
        variant="contained"
        onClick={handleSubmit}
      ></Button>
    </Box>
  );
};

export default FormAddFolder;
