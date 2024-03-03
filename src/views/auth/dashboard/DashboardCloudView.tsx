import Grid from "@mui/material/Grid";
import trashIcon from "../../../assets/icons/trash-drawer.svg";
import starIcon from "../../../assets/icons/star-drawer.svg";
import fileIcon from "../../../assets/icons/file-drawer.svg";
import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { UserContext } from "../../../context/UserContext";
import DeleteDialog from "../../../components/Dialog/DeleteDialog.component";
import FormDialog from "../../../components/Dialog/FormDialog.component";
// import MyCloudTab from "../../../components/Tabs/MyCloudTab.component";
import ToolBar from "../../../components/Tabs/ToolBar.component";
import { toast } from "react-toastify";
import {
  sendGetRequest,
  sendPatchRequest,
  sendPostRequest,
} from "../../../utils/data";
import { API_BASE_URL } from "../../../constants/url";
import { arraysAreEqual } from "../../../utils/array";
// import FoldersList from "../../../components/Tabs/FoldersList.component";
import CardFolder from "../../../components/Card/CardFolder";
import { useNavigate } from "react-router-dom";

export const tabsList = [
  {
    name: "Mon Cloud",
    key: 1,
    icon: fileIcon,
    url: "/dashboard-cloud",
  },
  {
    name: "Mes favoris",
    key: 2,
    icon: starIcon,
    url: "/dashboard-favorites",
  },
  {
    name: "Corbeille",
    key: 3,
    icon: trashIcon,
    url: "/dashboard-trash",
  },
];

export type FolderData = {
  id: number;
  name: string;
  isFavorite: boolean;
  isTrash: boolean;
  creation_date: string;
  owner_id?: number;
  parent_folder_id?: number;
};
export type FileData = FolderData & {
  extension?: string;
  url?: string;
  size?: number;
  folder_id?: number;
};

export default function DashboardCloudView() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  const userContext = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [folders, setFolders] = useState([]);

  const [isFolderSelected, setIsFolderSelected] = useState(false);
  const [allFoldersSelected, setAllFoldersSelected] = useState(false);
  const [selectedFoldersIds, setSelectedFoldersIds] = useState<number[]>([]);

  const [files, setFiles] = useState([]);
  const [nameFolder, setNameFolder] = useState("");

  const displayForm = (type: string) => {
    setShowForm(!showForm);
    setTypeForm(type);
  }; //TODO sortir dans un composant a part car réutilisés sur les 3 pages (peu etre directement dan sla toolbar en fait)

  const displayDeleteModale = (actionType: string | null | undefined) => {
    setShowDeleteModal(!showDeleteModal);
    if (actionType) {
      setActionType(actionType);
    }
  };

  // const handleSelectFolder = (id: number) => {
  //   setIsFolderSelected(!isFolderSelected);
  //   if (!selectedFoldersIds.includes(id)) {
  //     setSelectedFoldersIds([...selectedFoldersIds, id]);
  //     return;
  //   }
  //   setSelectedFoldersIds(
  //     selectedFoldersIds.filter((folderId: number) => {
  //       folderId !== id;
  //     })
  //   );
  // };

  const handleSelectFolder = (folderId: number, isFolderSelected: boolean) => {
    setSelectedFoldersIds((prev) =>
      isFolderSelected
        ? [...prev, folderId]
        : prev.filter((id) => id !== folderId)
    );
  };

  const moveToFavorites = async (id: number) => {
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPatchRequest(
        `${API_BASE_URL}/folders/isFavorite`,
        { Authorization: `Bearer ${token}` },
        { id: id }
      );
      if (response.status === 200) {
        toast.update(loader, {
          render: response.message,
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        navigate("/dashboard-cloud"); //TODO implémentation à refaire
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createFolder = async (name: string) => {
    setNameFolder(name);
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPostRequest(
        `${API_BASE_URL}/folder`,
        { Authorization: `Bearer ${token}` },
        {
          name: nameFolder,
        }
      );
      if (response.status === 201) {
        toast.update(loader, {
          render: "Dossier créé avec succès !",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
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

  useEffect(() => {
    const getFolders = async () => {
      try {
        const token = localStorage.getItem("@userToken");
        const response = await sendGetRequest(`${API_BASE_URL}/folders`, {
          Authorization: `Bearer ${token}`,
        });
        if (!arraysAreEqual(folders, response)) {
          setFolders(response);
        }
      } catch (error) {
        console.log("error");
      }
    };
    getFolders();
  }, []);

  useEffect(() => {
    if (allFoldersSelected) {
      setSelectedFoldersIds(folders?.map((folder: FolderData) => folder.id));
    } else {
      setSelectedFoldersIds([]);
    }
  }, [allFoldersSelected]);
  console.log(
    "🚀 ~ DashboardCloudView ~ allFoldersSelected:",
    allFoldersSelected
  );

  console.log("🚀 ~ useEffect ~ selectedFoldersIds:", selectedFoldersIds);
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
    >
      <ToolBar
        handleSelectAllCards={() => console.log("à changer")}
        setAllFoldersSelected={() => setAllFoldersSelected(!allFoldersSelected)}
        allFoldersSelected={allFoldersSelected}
        displayForm={displayForm}
        displayDeleteModale={displayDeleteModale}
        def={true}
        restore={true}
        isTrash={false}
      />
      <Grid>
        <Box
          sx={{
            // pt: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {folders?.map((data: FolderData) => (
            <CardFolder
              key={data.id}
              id={data.id}
              isFolderSelected={selectedFoldersIds.includes(data.id)}
              onSelectFolder={handleSelectFolder}
              allFoldersSelected={allFoldersSelected}
              setAllFoldersSelected={() => setAllFoldersSelected}
              moveToFavorites={() => moveToFavorites(data.id)}
              creation_date={data.creation_date}
              // setIsFolderSelected={() => handleSelectFolder(data.id)}
              isFavorite={data.isFavorite}
              name={data.name}
              // onDoubleClick={() => handleFolderDoubleClick(data.id)}
              // onAddSelectedCards={() => onAddSelectedCards(data.id)}
            />
          ))}

          {/* <FoldersList
            foldersData={folders}
            isFavorite={false}
            isTrash={false}
            isSelected={selectedFolder}
            setSelectedFolder={() => setSelectedFolder}
            allFoldersSelected={allFoldersSelected}
            setAllFoldersSelected={() => setAllFoldersSelected}
            // idCardsSelected={idCardsSelected}
            // onAddSelectedCards={onAddSelectedCards}
          /> */}
          {/* <MyCloudTab
            foldersData={folders}
            filesData={files}
            allFoldersSelected={allFoldersSelected}
            setAllFoldersSelected={() =>
              setAllFoldersSelected(!allFoldersSelected)
            }
          /> */}
          {/* TODO Les 3 tabs se servent à rien je pense, meme cdoe dans les 3 remettre directement le code ici dans les 3 pages ou fair eun composant "CardList" réutilsié dans les 3 */}
          {showForm && (
            <FormDialog
              handleClose={() => setShowForm(false)}
              handleCreateFolder={createFolder}
              title={
                typeForm === "folder" ? "Nouveau dossier" : "Nouveau fichier"
              }
            />
          )}
          {showDeleteModal && (
            <DeleteDialog
              handleClose={() => setShowDeleteModal(false)}
              actionType={actionType}
            />
          )}
        </Box>
      </Grid>
    </Box>
  );
}
