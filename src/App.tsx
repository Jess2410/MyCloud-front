import "./App.css";
import Button from "./components/button/Button";
import logo from "./assets/icons/add-file-icon.png";
import IconButton from "./components/IconButton/IconButton";
import AppBar from "./components/AppBar/AppBar";

function App() {
  return (
    <>
      <Button label={"Connectez-vous"} variant="contained" />
      <Button label={"Inscrivez-vous"} variant="outlined" />
      <IconButton icon={logo} />
      <AppBar />
    </>
  );
}

export default App;
