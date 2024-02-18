import { useNavigate } from "react-router-dom";
import cloudImage from "../../../assets/images/search-cloud.svg";
import GenericForm from "../../../components/Form/GenericForm";
import Input from "../../../components/Form/Input";
import Button from "../../../components/button/Button";
import LayoutForm from "../../../components/layoutForm/layoutForm.component";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

type RegisterFormState = {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function RegisterView() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<RegisterFormState>({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const loader = toast.loading("Veuillez patienter...");
    try {
      const request = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify({
          email: formState.email,
          firstname: formState.firstname,
          lastname: formState.lastname,
          password: formState.password,
          password_confirmation: formState.password_confirmation,
        }),
      });
      const response = await request.json();
      if (response.status === 201) {
        toast.update(loader, {
          render: "Votre compte a bien été créé !",
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

  const inputs = [
    {
      label: "Nom",
      inputName: "lastname",
      value: formState.lastname,
      password: false,
    },
    {
      label: "Prénom",
      inputName: "firstname",
      value: formState.firstname,
      password: false,
    },
    {
      label: "Adresse Email",
      inputName: "email",
      value: formState.email,
      password: false,
    },
    {
      label: "Mot de passe",
      inputName: "password",
      value: formState.password,
      password: true,
    },
    {
      label: "Confirmation mot de passe",
      inputName: "password_confirmation",
      value: formState.password_confirmation,
      password: true,
    },
  ];

  return (
    <div>
      <LayoutForm image={cloudImage}>
        <GenericForm
          title="Inscrivez-vous"
          spanText="Déjà un compte ? "
          linkText="C'est ici !"
          href="/login"
        >
          {inputs.map((input, index) => (
            <Input
              key={index}
              label={input.label}
              password={input.password}
              value={input.value}
              inputName={input.inputName}
              handleChange={handleChange}
            />
          ))}
          <Box sx={{ padding: "1rem 0" }}>
            <Button
              label="S'inscrire"
              variant="contained"
              onClick={handleSubmit}
            />
          </Box>
        </GenericForm>
      </LayoutForm>
    </div>
  );
}
