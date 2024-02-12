import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./views/app/home/HomeView";
import LoginView from "./views/app/login/LoginView";
import UiComponents from "./views/app/UiComponents/UiComponents";
import RegisterView from "./views/app/register/RegisterView";
import ForgetPasswordView from "./views/app/forgetPassword/forgetPassword";
import DashboardView from "./views/auth/dashboard/Dashboard";
import ServicesView from "./views/app/services/ServicesView";

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
    path: "/forgetpassword",
    element: <ForgetPasswordView />,
  },
  {
    path: "/dashboard",
    element: <DashboardView />,
  },
  {
    path: "/services",
    element: <ServicesView />,
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
