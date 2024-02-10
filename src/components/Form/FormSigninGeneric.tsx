import GenericForm from "./GenericForm";

const FormSigninGeneric = () => {
  const inputs = [
    { label: "Nom" },
    { label: "Adresse Email" },
    { label: "Mot de passe", password: true },
    { label: "Confirmation mot de passe", password: true },
  ];

  return (
    <GenericForm
      title="Inscrivez-vous"
      inputs={inputs}
      buttonText="C'est parti !"
      spanText="Déjà un compte ?"
      linkText="Loguez-vous !"
    />
  );
};

export default FormSigninGeneric;
