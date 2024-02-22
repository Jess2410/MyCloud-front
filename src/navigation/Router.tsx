import { useRoutes } from "react-router-dom";
import LoginView from "../views/app/login/LoginView";
import RegisterView from "../views/app/register/RegisterView";
import ForgotPasswordView from "../views/app/forgotPassword/ForgotPasswordView";
import ResetPasswordView from "../views/app/passwordReset/ResetPasswordView";
import HomeView from "../views/app/home/HomeView";
import ServicesView from "../views/app/services/ServicesView";
import AboutView from "../views/app/about/AboutView";
import ContactView from "../views/app/contact/ContactView";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import DashboardCloudView from "../views/auth/dashboard/DashboardCloudView";
import DashboardAddFolderView from "../views/auth/dashboard/DashboardAddFolderView";

const AppRouter = () => {
  const { user } = useContext(UserContext);

  const routes = [
    {
      path: "/",
      element: <HomeView />,
    },
    {
      path: "/services",
      element: <ServicesView />,
    },
    {
      path: "/dashboard",
      // element: user ? <DashboardCloudView /> : <LoginView />,
      element: <DashboardCloudView />,
    },
    {
      path: "/dashboard-add-folder",
      element: <DashboardAddFolderView />,
    },
    {
      path: "/about",
      element: <AboutView />,
    },
    {
      path: "/contact",
      element: <ContactView />,
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
  ];

  const Routes = useRoutes(routes);

  return Routes;
};

export default AppRouter;
