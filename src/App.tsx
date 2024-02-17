import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./views/app/home/HomeView";
import LoginView from "./views/app/login/LoginView";
import UiComponents from "./views/app/UiComponents/UiComponents";
import RegisterView from "./views/app/register/RegisterView";
import ForgotPasswordView from "./views/app/forgotPassword/ForgotPasswordView";
import ResetPasswordView from "./views/app/passwordReset/ResetPasswordView";
import DashboardView from "./views/auth/dashboard/Dashboard";
import ServicesView from "./views/app/services/ServicesView";
import AboutView from "./views/app/about/AboutView";
import ContactView from "./views/app/contact/ContactView";

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/forgot-password",
    element: <ForgotPasswordView />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordView />,
  },
  {
    path: "/dashboard",
    element: <DashboardView />,
  },
  {
    path: "/services",
    element: <ServicesView />,
  },
  {
    path: "/about",
    element: <AboutView />,
  },
  {
    path: "/contact",
    element: <ContactView />,
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
