import "./App.css";
import Button from "./components/Button/Button";
import addFile from "./assets/icons/add-file-icon.png";
import addFolder from "./assets/icons/add-folder-icon.png";
import trash from "./assets/icons/trash-icon.png";
import trashDef from "./assets/icons/trash-definitive-icon.png";
import IconButton from "./components/IconButton/IconButton";
import Card from "./components/Card/Card";
import ResponsiveAppBar from "./components/AppBar/AppBar";
import SearchBar from "./components/searchBar/SearchBar";
import FormLoginGeneric from "./components/Form/FormLoginGeneric";
import FormSigninGeneric from "./components/Form/FormSigninGeneric";
import FormPasswordGeneric from "./components/Form/FormPasswordGeneric";

function App() {
  return (
    <>
      <Button label={"Connectez-vous"} variant="contained" />
      <Button label={"Inscrivez-vous"} variant="outlined" />
      <IconButton icon={addFile} />
      <IconButton icon={addFolder} />
      <IconButton icon={trash} />
      <IconButton icon={trashDef} />
      <Card />
      <ResponsiveAppBar />
      <SearchBar />
      <FormLoginGeneric />
      <FormSigninGeneric />
      <FormPasswordGeneric />
    </>
  );
}

export default App;
