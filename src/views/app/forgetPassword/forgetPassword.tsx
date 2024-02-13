import cloudImage from "../../../assets/images/key.png";
import FormPasswordGeneric from "../../../components/Form/FormPasswordGeneric";
import LayoutForm from "../../../components/layoutForm/layoutForm.component";

export default function LoginView() {
  return (
    <>
      <LayoutForm image={cloudImage}>
        <FormPasswordGeneric />
      </LayoutForm>
    </>
  );
}
