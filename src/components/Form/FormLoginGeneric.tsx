import GenericForm from "./GenericForm";

const FormLoginGeneric = () => {
  const inputs = [
    { label: "Adresse Email" },
    { label: "Mot de passe", password: true },
  ];

  return (
    <GenericForm
      title="Connectez-vous"
      inputs={inputs}
      buttonText="C'est parti !"
      spanText="Pas de compte ?"
      linkText="C’est ici !"
    />
  );
};

export default FormLoginGeneric;
