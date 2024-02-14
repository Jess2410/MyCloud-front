import GenericForm from "./GenericForm";

const FormSigninGeneric = () => {
  const inputs = [
    { label: "Nom" },
    { label: "Prénom" },
    { label: "Adresse Email" },
    { label: "Mot de passe", password: true },
    { label: "Confirmation mot de passe", password: true },
  ];

  return (
    <GenericForm
      title="Inscrivez-vous"
      inputs={inputs}
      buttonText="C'est parti !"
      spanText="Mot de passe oublié ? "
      linkText="C'est ici !"
      href="/forgetpassword"
    />
  );
};

export default FormSigninGeneric;
