import { useContext, useState } from "react";
import cloudImage from "../../../assets/images/cloud-data.svg";
import GenericForm from "../../../components/Form/GenericForm";
import LayoutForm from "../../../components/layoutForm/layoutForm.component";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Form/Input";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { UserContext } from "../../../context/UserContext";
import { sendPostRequest } from "../../../utils/data";
import { API_BASE_URL } from "../../../constants/url";

type LoginFormState = {
  email: string;
  password: string;
};

export default function LoginView() {
  const userContext = useContext(UserContext);
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
    const loader = toast.loading("Veuillez patienter...");
    try {
      const response = await sendPostRequest(
        `${API_BASE_URL}/login`,
        undefined,
        { email: userCredentials.email, password: userCredentials.password }
      );
      if (response.status === 200) {
        localStorage.setItem("@userToken", response.authToken);
        toast.update(loader, {
          render: "Connexion réussie !",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        const { firstname, lastname, email, id } = response;
        userContext.login({ firstname, lastname, email, id });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

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
