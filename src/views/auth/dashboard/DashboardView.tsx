import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import addFile from "../../../assets/icons/add-file-icon.png";
import addFolder from "../../../assets/icons/add-folder-icon.png";
import trash from "../../../assets/icons/trash-icon.png";
import checkBox from "../../../assets/icons/checkbox-tool.svg";
import checkBoxNoChecked from "../../../assets/icons/checkbox-checked-tool.svg";
import trashIcon from "../../../assets/icons/trash-drawer.svg";
import starIcon from "../../../assets/icons/star-drawer.svg";
import fileIcon from "../../../assets/icons/file-drawer.svg";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import DashboardDrawer from "../../../components/Drawer/DashboardDrawer.component";
import Button from "../../../components/Button/Button";
import IconButton from "../../../components/IconButton/IconButton";
import SearchWithFilter from "../../../components/SearchBarFilter/SearchBarFilter.component";
import { UserContext } from "../../../context/UserContext";
import { toast } from "react-toastify";
import { DEV_DOMAIN } from "../../../constants/url";
import { sendGetRequest, sendPostRequest } from "../../../utils/data";
import FormDialog from "../../../components/Dialog/FormDialog.component";
import Card from "../../../components/Card/Card";

const tabsList = [
  {
    name: "Mon Cloud",
    key: 1,
    icon: fileIcon,
  },
  {
    name: "Mes favoris",
    key: 2,
    icon: starIcon,
  },
  {
    name: "Corbeille",
    key: 3,
    icon: trashIcon,
  },
];

export type CloudData = {
  id: number;
  type: string;
  name: string;
  isTrash: boolean;
  isFavorite: boolean;
  extension?: string;
  url?: string;
  size?: number;
  creation_date: string;
  owner_id?: number;
  folder_id?: number;
  parent_folder_id?: number;
};

export default function DashboardView() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [showFormFolder, setShowFormFolder] = useState(false);
  const [showFormFile, setShowFormFile] = useState(false);
  const [newName, setNewName] = useState("");
  const [name, setName] = useState("");
  const [cloudData, setCloudData] = useState<CloudData[]>([]);
  const [listSelectedCards, setListSelectedCards] = useState<number[]>([]);
  const [allCardsSelected, setAllCardsSelected] = useState(false);

  const switchFormFolderVisibility = () => {
    setShowFormFolder(!showFormFolder);
  };
  const switchFormFileVisibility = () => {
    setShowFormFile(!showFormFile);
  };

  //TODO RENAME A FOLDER OR A FILE
  // const renameFolderOrFile = (id, type, e) => {
  //   e.preventDefault();
  //   setNewName(e.target.value);
  //   Patch name in DB
  // };

  const handleSelectAllCards = () => {
    setAllCardsSelected(!allCardsSelected);
    if (allCardsSelected) {
      cloudData.map((data) => listSelectedCards.push(data.id));
    } else {
      setListSelectedCards([]);
    }
  };

  const onAddSelectedCards = (id: number) => {
    if (listSelectedCards.includes(id)) {
      setListSelectedCards(listSelectedCards.filter((cardId) => cardId !== id));
    } else {
      setListSelectedCards([...listSelectedCards, id]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const loader = toast.loading("Veuillez patienter...");
    try {
      const response = await sendPostRequest(
        `${DEV_DOMAIN}/folder`,
        undefined,
        { name }
      );
      if (response.status === 201) {
        toast.update(loader, {
          render: "Le dossier a bien été créé !",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        navigate("/dashboard");
        return;
      }
      toast.update(loader, {
        render: `Une erreur est survenue : ${response.message}.`,
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
      throw new Error(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPostRequest(`${DEV_DOMAIN}/folder`, {
        Authorization: `Bearer ${token}`,
      });
      if (response.status === 200) {
        console.log(response.message);
        localStorage.removeItem("@userToken");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserName = () => {
    if (userContext?.user) {
      const { firstname, lastname } = userContext.user;
      return `${firstname} ${lastname}`;
    }
    return "stranger";
  };

  const renderData = () => {
    return cloudData.map((data) => {
      if (data.type === "folder") {
        return (
          <Card
            key={data.id}
            id={data.id}
            type={data.type}
            isSelected={listSelectedCards.includes(data.id)}
            creation_date={data.creation_date}
            isFavorite={data.isFavorite}
            name={data.name}
            onAddSelectedCards={() => onAddSelectedCards(data.id)}
          />
        );
      }
      if (data.type === "file") {
        return (
          <Card
            key={data.id}
            extension={data.extension}
            id={data.id}
            isSelected={listSelectedCards.includes(data.id)}
            type={data.type}
            creation_date={data.creation_date}
            isFavorite={data.isFavorite}
            name={data.name}
            onAddSelectedCards={() => onAddSelectedCards(data.id)}
          />
        );
      }
      return null;
    });
  };

  const mockData = [
    {
      type: "folder",
      name: "Folder",
      creation_date: "2024-02-16",
      id: 1,
      isFavorite: false,
      isTrash: false,
      owner_id: 1,
      parent_folder_id: 7,
    },
    {
      type: "folder",
      name: "Folder",
      creation_date: "2024-02-16",
      id: 2,
      isFavorite: false,
      isTrash: false,
      owner_id: 1,
      parent_folder_id: 7,
    },
    {
      type: "folder",
      name: "Folder",
      creation_date: "2024-02-16",
      id: 3,
      isFavorite: true,
      isTrash: false,
      owner_id: 1,
      parent_folder_id: 7,
    },
    {
      type: "file",
      extension: "mp3",
      name: "Audio File",
      creation_date: "2024-02-14",
      id: 4,
      isFavorite: false,
      isTrash: false,
      folder_id: 3,
      owner_id: 5,
    },
    {
      type: "file",
      extension: "png",
      name: "Image File",
      creation_date: "2024-02-14",
      id: 5,
      isFavorite: false,
      isTrash: false,
      folder_id: 3,
      owner_id: 5,
    },
    {
      type: "file",
      extension: "txt",
      name: "Text File",
      creation_date: "2024-02-14",
      id: 6,
      isFavorite: true,
      isTrash: false,
      folder_id: 3,
      owner_id: 5,
    },
  ];

  useEffect(() => {
    const getCloudData = async () => {
      try {
        // const getFolders = await sendGetRequest(`${DEV_DOMAIN}/folders`);
        // const getFiles = await sendGetRequest(`${DEV_DOMAIN}/files`);
        // const [files, folders] = await Promise.all([getFolders, getFiles]);
        setCloudData(mockData);
      } catch (error) {
        console.log(error);
      }
    };
    getCloudData();
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100vh", px: 6 }}
    >
      <CssBaseline />
      <Toolbar />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <DashboardDrawer tabsList={tabsList} />
        <Box
          component="main"
          sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  color: "#A0A0A0",
                  fontSize: 32,
                  fontWeight: 500,
                }}
              >
                Mon Cloud
              </Typography>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  label="Déconnexion"
                  variant="contained"
                  onClick={() => logout()}
                />
              </Link>
            </Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "#A0A0A0",
                fontSize: 18,
                fontWeight: 300,
              }}
            >
              Bienvenue {getUserName()} ! 👋
            </Typography>
          </Box>
          <Grid sx={{ px: 4 }}>
            <Box
              sx={{
                background: "rgba(124, 210, 215, 0.2)",
                borderRadius: "60px",
                p: "4px",
                display: "flex",
                alignItems: "center",
                mr: 1,
                flexWrap: "wrap",
                px: 2,
              }}
            >
              <Box
                sx={{
                  borderRight: "1px solid #7CD2D7",
                  mx: 1,

                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  icon={addFolder}
                  onClick={switchFormFolderVisibility}
                />
                <IconButton icon={addFile} onClick={switchFormFileVisibility} />
              </Box>
              <SearchWithFilter />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mx: 1,
                  flexWrap: "nowrap",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    color: "#A0A0A0",
                    fontSize: 18,
                    fontWeight: 300,
                  }}
                >
                  Sélectionner
                </Typography>
                <Box
                  sx={{
                    borderRight: "1px solid #7CD2D7",
                  }}
                  // onClick={() => onSelected()}
                  onClick={() => handleSelectAllCards()}
                >
                  {allCardsSelected ? (
                    <IconButton icon={checkBox} />
                  ) : (
                    <IconButton icon={checkBoxNoChecked} />
                  )}
                </Box>
                <IconButton icon={trash} />
              </Box>
            </Box>
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {renderData()}
              {showFormFolder && (
                <FormDialog
                  handleClose={() => setShowFormFolder(false)}
                  title={"Nouveau dossier"}
                />
              )}
              {showFormFile && (
                <FormDialog
                  handleClose={() => setShowFormFile(false)}
                  title={"Nouveau fichier"}
                />
              )}
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
