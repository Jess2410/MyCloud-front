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
import deftrashIcon from "../../../assets/icons/trash-definitive-icon.png";
import starIcon from "../../../assets/icons/star-drawer.svg";
import fileIcon from "../../../assets/icons/file-drawer.svg";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, ButtonBase } from "@mui/material";
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
  const [tabActive, setTabActive] = useState<number>(1);
  const [showForm, setShowForm] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  // const [newName, setNewName] = useState("");
  // const [name, setName] = useState("");
  const [cloudData, setCloudData] = useState<CloudData[]>([]);
  const [idCardsSelected, setIdCardsSelected] = useState<number[]>([]);
  const [allCardsSelected, setAllCardsSelected] = useState(false);
  const [allCheckboxesChecked, setAllCheckboxesChecked] = useState(false);

  const displayForm = (type: string) => {
    setShowForm(!showForm);
    setTypeForm(type);
  };

  //TODO RENAME A FOLDER OR A FILE
  // const renameFolderOrFile = (id, type, e) => {
  //   e.preventDefault();
  //   setNewName(e.target.value);
  //   Patch name in DB
  // };

  const handleSelectAllCards = () => {
    setAllCardsSelected(!allCardsSelected);
    setAllCheckboxesChecked(!allCheckboxesChecked);
  };

  const onAddSelectedCards = (id: number) => {
    let newArray = [];
    if (idCardsSelected.includes(id)) {
      newArray = idCardsSelected.filter((cardId) => cardId !== id);
      setIdCardsSelected(newArray);
      setAllCheckboxesChecked(false);
      setIdCardsSelected([...idCardsSelected, id]);
      if (idCardsSelected.includes(id)) {
        setIdCardsSelected([id]);
        setAllCheckboxesChecked(false);
        if (idCardsSelected.includes(id)) {
          setIdCardsSelected([id]);
        }
      }
    } else {
      setIdCardsSelected([...idCardsSelected, id]);
    }
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setName(e.target.value);
  // };

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

  const renderData = (
    filterType: string,
    isFavorite: boolean,
    isTrash: boolean
  ) => {
    return cloudData.map((data) => {
      if (
        data.type === filterType &&
        data.isFavorite === isFavorite &&
        data.isTrash === isTrash
      ) {
        return (
          <Card
            key={data.id}
            id={data.id}
            type={data.type}
            extension={data.extension}
            isSelected={idCardsSelected.includes(data.id)}
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
  const renderDataFavorite = () => {
    return cloudData.map((data) => {
      if (data.type === "folder" && data.isFavorite) {
        return (
          <Card
            key={data.id}
            id={data.id}
            type={data.type}
            isSelected={idCardsSelected.includes(data.id)}
            creation_date={data.creation_date}
            isFavorite={data.isFavorite}
            name={data.name}
            onAddSelectedCards={() => onAddSelectedCards(data.id)}
          />
        );
      }
      if (data.type === "file" && data.isFavorite) {
        return (
          <Card
            key={data.id}
            extension={data.extension}
            id={data.id}
            isSelected={idCardsSelected.includes(data.id)}
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

  const renderDataTrash = () => {
    return cloudData.map((data) => {
      if (data.type === "folder" && data.isTrash) {
        return (
          <Card
            key={data.id}
            id={data.id}
            type={data.type}
            isSelected={idCardsSelected.includes(data.id)}
            creation_date={data.creation_date}
            isFavorite={data.isFavorite}
            name={data.name}
            onAddSelectedCards={() => onAddSelectedCards(data.id)}
          />
        );
      }
      if (data.type === "file" && data.isTrash) {
        return (
          <Card
            key={data.id}
            extension={data.extension}
            id={data.id}
            isSelected={idCardsSelected.includes(data.id)}
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
      name: "FolderTrash",
      creation_date: "2024-02-16",
      id: 1,
      isFavorite: false,
      isTrash: true,
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
      name: "Text trash",
      creation_date: "2024-02-14",
      id: 6,
      isFavorite: false,
      isTrash: true,
      folder_id: 3,
      owner_id: 5,
    },
    {
      type: "folder",
      name: "Vacation Photos",
      creation_date: "2024-03-01",
      id: 7,
      isFavorite: true,
      isTrash: false,
      owner_id: 2,
      parent_folder_id: 1,
    },
    {
      type: "folder",
      name: "Work Documents",
      creation_date: "2024-02-28",
      id: 8,
      isFavorite: false,
      isTrash: false,
      owner_id: 2,
      parent_folder_id: 2,
    },
    {
      type: "file",
      extension: "docx",
      name: "Project Proposal",
      creation_date: "2024-02-28",
      id: 9,
      isFavorite: true,
      isTrash: false,
      folder_id: 8,
      owner_id: 2,
    },
    {
      type: "file",
      extension: "jpg",
      name: "Family Picnic",
      creation_date: "2024-03-02",
      id: 10,
      isFavorite: true,
      isTrash: false,
      folder_id: 7,
      owner_id: 2,
    },
    {
      type: "file",
      extension: "xlsx",
      name: "Financial Report",
      creation_date: "2024-03-01",
      id: 11,
      isFavorite: false,
      isTrash: false,
      folder_id: 8,
      owner_id: 2,
    },
    {
      type: "folder",
      name: "Unused Projects",
      creation_date: "2024-02-27",
      id: 12,
      isFavorite: false,
      isTrash: true,
      owner_id: 2,
      parent_folder_id: 1,
    },
    {
      type: "file",
      extension: "pptx",
      name: "Presentation Slides",
      creation_date: "2024-02-27",
      id: 13,
      isFavorite: false,
      isTrash: true,
      folder_id: 12,
      owner_id: 2,
    },
    {
      type: "file",
      extension: "pdf",
      name: "User Manual",
      creation_date: "2024-02-27",
      id: 14,
      isFavorite: false,
      isTrash: true,
      folder_id: 12,
      owner_id: 2,
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

  useEffect(() => {
    let newArray: number[] = [];
    if (allCardsSelected) {
      cloudData.forEach((data) => newArray.push(data.id));

      setIdCardsSelected(newArray);
    } else {
      setIdCardsSelected([]);
    }
  }, [allCardsSelected]);

  useEffect(() => {
    if (idCardsSelected.length !== cloudData.length) {
      setAllCardsSelected(false);
    }
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100vh", px: 6 }}
    >
      <CssBaseline />
      <Toolbar />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <DashboardDrawer tabsList={tabsList} setTabActive={setTabActive} />
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
                  onClick={() => displayForm("folder")}
                />
                <IconButton
                  icon={addFile}
                  onClick={() => displayForm("file")}
                />
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
                  {allCheckboxesChecked ? (
                    <IconButton icon={checkBoxNoChecked} />
                  ) : (
                    <IconButton icon={checkBox} />
                  )}
                </Box>
                {tabActive === 3 ? (
                  <>
                    <IconButton icon={deftrashIcon} />
                    <ButtonBase
                      style={{
                        border: "1.5px solid #49D4DB",
                        padding: "5px",
                        borderRadius: "10px",
                        color: "#49D4DB",
                        fontWeight: "bold",
                      }}
                    >
                      Restaurer
                    </ButtonBase>
                  </>
                ) : (
                  <IconButton icon={trash} />
                )}
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
              {tabActive === 1 ? renderData("folder", false, false) : null}
              {tabActive === 1 ? renderData("file", false, false) : null}
              {tabActive === 2 ? renderData("folder", true, false) : null}
              {tabActive === 2 ? renderData("file", true, false) : null}
              {tabActive === 3 ? renderData("folder", false, true) : null}
              {tabActive === 3 ? renderData("file", false, true) : null}
              {showForm && (
                <FormDialog
                  handleClose={() => setShowForm(false)}
                  title={
                    typeForm === "folder"
                      ? "Nouveau dossier"
                      : "Nouveau fichier"
                  }
                />
              )}
              {/* {showFormFile && (
                <FormDialog
                  handleClose={() => setShowFormFile(false)}
                  title={"Nouveau fichier"}
                />
              )} */}
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
