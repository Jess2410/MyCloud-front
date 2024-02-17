import { useState } from "react";
import cloudImage from "../../../assets/images/cloud-data.svg";
import GenericForm from "../../../components/Form/GenericForm";
import LayoutForm from "../../../components/layoutForm/layoutForm.component";
import Button from "../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Form/Input";
import { Box } from "@mui/material";

type LoginFormState = {
  email: string;
  password: string;
};

export default function LoginView() {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const request = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify({
          email: userCredentials.email,
          password: userCredentials.password,
        }),
      });
      const response = await request.json();
      if (response.status === 200) {
        localStorage.setItem("@userToken", response.authToken);
        navigate("/dashboard");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputs = [
    {
      label: "Adresse Email",
      inputName: "email",
      value: userCredentials.email,
      password: false,
    },
    {
      label: "Mot de passe",
      inputName: "password",
      value: userCredentials.password,
      password: true,
    },
  ];
  return (
    <div>
      <LayoutForm image={cloudImage}>
        <GenericForm
          title="Connectez-vous"
          spanText="Mot de passe oublié ? "
          linkText="C'est ici !"
          href="/forgot-password"
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
              label="Se connecter"
              variant="contained"
              style={{ display: "flex", marginTop: "8px" }}
              onClick={handleSubmit}
            />
          </Box>
        </GenericForm>
      </LayoutForm>
    </div>
  );
}
