import "./App.css";
import Button from "./components/Button/Button";
import logo from "./assets/icons/add-file-icon.png";
import IconButton from "./components/IconButton/IconButton";

function App() {
  return (
    <>
      <Button label={"Connectez-vous"} variant="contained" />
      <Button label={"Inscrivez-vous"} variant="outlined" />
      <IconButton icon={logo} />
    </>
  );
}

export default App;
