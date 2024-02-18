import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { UserContext } from "./context/UserContext";
import AppRouter from "./navigation/Router";

function App() {
  const [user, setUser] = useState(null);

  const login = (user: any) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <UserContext.Provider value={{ user, login, logout }}>
        <ToastContainer />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
