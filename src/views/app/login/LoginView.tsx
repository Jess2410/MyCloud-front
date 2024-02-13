import cloudImage from "../../../assets/images/cloud-data.svg";
import FormLoginGeneric from "../../../components/Form/FormLoginGeneric";
import LayoutForm from "../../../components/layoutForm/layoutForm.component";

export default function LoginView() {
  return (
    <>
      <LayoutForm image={cloudImage}>
        <FormLoginGeneric />
      </LayoutForm>
    </>
  );
}
