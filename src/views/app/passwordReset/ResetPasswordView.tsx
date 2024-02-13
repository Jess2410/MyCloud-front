import { useState } from "react";
import { useParams } from "react-router-dom";

type UserDataState = {
  email: string;
  password: string;
  password_confirmation: string;
};

export default function ResetPasswordView() {
  const { token } = useParams();
  const [userData, setUserData] = useState<UserDataState>({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const request = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          password_confirmation: userData.password_confirmation,
          token: token,
        }),
      });
      const response = await request.json();
      if (response.status === 200) {
        console.log(response.message);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Réinitialiser le mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirmation du mot de passe"
          onChange={handleInputChange}
        />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}
