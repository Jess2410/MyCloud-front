import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutForm from "../../../components/layoutForm/layoutForm.component";
import cloudImage from "../../../assets/images/cloud-data.svg";
import GenericForm from "../../../components/Form/GenericForm";
import Input from "../../../components/Form/Input";
import Button from "../../../components/Button/Button";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { sendPostRequest } from "../../../utils/data";
import { API_BASE_URL } from "../../../constants/url";

type UserDataState = {
  email: string;
  password: string;
  password_confirmation: string;
};

export default function ResetPasswordView() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserDataState>({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const inputs = [
    {
      label: "Adresse Email",
      inputName: "email",
      value: userData.email,
      password: false,
    },
    {
      label: "Mot de passe",
      inputName: "password",
      value: userData.password,
      password: true,
    },
    {
      label: "Confirmation mot de passe",
      inputName: "password_confirmation",
      value: userData.password_confirmation,
      password: true,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const loader = toast.loading("Veuillez patienter...");
    try {
      const response = await sendPostRequest(
        `${API_BASE_URL}/reset-password`,
        undefined,
        {
          email: userData.email,
          password: userData.password,
          password_confirmation: userData.password_confirmation,
          token: token,
        }
      );
      if (response.status === 200) {
        toast.update(loader, {
          render: "Mot de passe réinitialisé !",
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

  return (
    <>
      <LayoutForm image={cloudImage}>
        <GenericForm
          title="New Password"
          spanText="Retour à l'accueil ? "
          linkText="C'est ici !"
          href="/"
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
              label="Réinitialisez votre mot de passe"
              variant="contained"
              onClick={handleSubmit}
            />
          </Box>
        </GenericForm>
      </LayoutForm>
    </>
  );
}
