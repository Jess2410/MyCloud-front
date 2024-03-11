import { useNavigate } from "react-router-dom";
import { sendPostRequest } from "../../../utils/data";
import { DEV_DOMAIN } from "../../../constants/url";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPostRequest(`${DEV_DOMAIN}/folder`, {
        Authorization: `Bearer ${token}`,
      });
      if (response.status === 200) {
        localStorage.removeItem("@userToken");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};
export default useLogout;
