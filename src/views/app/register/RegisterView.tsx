import cloudImage from "../../../assets/images/search-cloud.svg";
import FormSigninGeneric from "../../../components/Form/FormSigninGeneric";
import LayoutForm from "../../../components/layoutForm/layoutForm.component";

export default function RegisterView() {
  return (
    <>
      <LayoutForm image={cloudImage}>
        <FormSigninGeneric />
      </LayoutForm>
    </>
  );
}
