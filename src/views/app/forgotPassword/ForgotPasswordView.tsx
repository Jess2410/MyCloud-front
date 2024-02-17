import { Box } from "@mui/material";
import cloudImage from "../../../assets/images/key.png";
import GenericForm from "../../../components/Form/GenericForm";
import Input from "../../../components/Form/Input";
import Button from "../../../components/button/Button";
import LayoutForm from "../../../components/layoutForm/layoutForm.component";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const request = await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const response = await request.json();
      if (response.status === 250) {
        console.log("response", response.message);
        navigate("/login");
        return response.message;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const input = {
    label: "Adresse Email",
    inputName: "email",
    value: email,
    password: false,
  };

  return (
    <>
      <LayoutForm image={cloudImage}>
        <GenericForm
          title="Password oublié ?"
          spanText="Pas intéressé ? "
          linkText="Retour à la page d'accueil !"
          href="/"
        >
          <Input
            label={input.label}
            password={input.password}
            value={input.value}
            inputName={input.inputName}
            handleChange={handleChange}
          />
          <Box sx={{ padding: "1rem 0" }}>
            <Button
              label="Changez votre mot de passe"
              variant="contained"
              style={{ display: "flex", marginTop: "8px" }}
              onClick={handleSubmit}
            />
          </Box>
        </GenericForm>
      </LayoutForm>
    </>
  );
}
