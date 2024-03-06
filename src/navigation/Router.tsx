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
import DashboardFavoritesView from "../views/auth/dashboard/DashboardFavoritesView";
import DashboardTrashView from "../views/auth/dashboard/DashboardTrashView";
import Layout from "../views/Layout.component";
import DashboardFolderView from "../views/auth/dashboard/DashboardFolderView";

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
      path: "/dashboard-cloud/*",
      // element: user ? <DashboardCloudView /> : <LoginView />,
      element: (
        <Layout>
          <DashboardCloudView />
        </Layout>
      ),
    },
    // {
    //   path: "/dashboard-cloud/:id/*",
    //   element: (
    //     <Layout>
    //       <DashboardFolderView />
    //     </Layout>
    //   ),
    // },
    {
      path: "/dashboard-favorites",
      // element: user ? <DashboardCloudView /> : <LoginView />,
      element: (
        <Layout>
          <DashboardFavoritesView />
        </Layout>
      ),
    },
    {
      path: "/dashboard-trash",
      // element: user ? <DashboardCloudView /> : <LoginView />,
      element: (
        <Layout>
          <DashboardTrashView />
        </Layout>
      ),
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
