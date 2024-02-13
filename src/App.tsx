import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./views/app/home/HomeView";
import LoginView from "./views/app/login/LoginView";
import UiComponents from "./views/app/UiComponents/UiComponents";
import RegisterView from "./views/app/register/RegisterView";
import ForgetPasswordView from "./views/app/forgetPassword/forgetPassword";
import ResetPasswordView from "./views/app/passwordReset/ResetPasswordView";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomeView />,
  },
  {
    path: "/uiComponents",
    element: <UiComponents />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/signin",
    element: <RegisterView />,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPasswordView />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordView />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
