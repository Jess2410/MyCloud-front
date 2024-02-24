import cloudImage from "../../../assets/images/key.png";
import GenericForm from "../../../components/Form/GenericForm";
import Input from "../../../components/Form/Input";
import Button from "../../../components/Button/Button";
import LayoutForm from "../../../components/layoutForm/layoutForm.component";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { sendPostRequest } from "../../../utils/data";
import { API_BASE_URL } from "../../../constants/url";

export default function ForgotPasswordView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const loader = toast.loading("Veuillez patienter...");
    try {
      const response = await sendPostRequest(
        `${API_BASE_URL}/forgot-password`,
        undefined,
        { email }
      );
      if (response.status === 250) {
        toast.update(loader, {
          render: "Un email vient de vous être envoyé !",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        navigate("/login");
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
