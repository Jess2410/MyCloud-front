import GenericForm from "./GenericForm";

const FormPasswordGeneric = () => {
  const inputs = [{ label: "Adresse Email" }];

  return (
    <GenericForm
      title="Password oublié ?"
      inputs={inputs}
      buttonText="Changez votre mot de passe !"
      spanText="Pas intéressé ?"
      linkText="Retour à la page d'accueil !"
    />
  );
};

export default FormPasswordGeneric;
