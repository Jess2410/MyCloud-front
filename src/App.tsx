import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeView from "./views/app/home/HomeView";
import UiComponents from "./views/app/UiComponents/UiComponents";


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
    element: <HomeView />,
  },
  {
    path: "/signin",
    element: <HomeView />,
  },

])

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
