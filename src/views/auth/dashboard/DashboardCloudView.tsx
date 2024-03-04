import Grid from "@mui/material/Grid";
import trashIcon from "../../../assets/icons/trash-drawer.svg";
import starIcon from "../../../assets/icons/star-drawer.svg";
import fileIcon from "../../../assets/icons/file-drawer.svg";
import {
  // useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box } from "@mui/material";
// import { UserContext } from "../../../context/UserContext";
import DeleteDialog from "../../../components/Dialog/DeleteDialog.component";
import ToolBar from "../../../components/Tabs/ToolBar.component";
import { toast } from "react-toastify";
import { sendGetRequest, sendPatchRequest } from "../../../utils/data";
import { API_BASE_URL } from "../../../constants/url";
import { arraysAreEqual } from "../../../utils/array";
import CardFolder from "../../../components/Card/CardFolder";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs.component";
import FormDialogFolder from "../../../components/Dialog/FormDialogFolder.component";
import FormDialogFile from "../../../components/Dialog/FormDialogFile.component";
import Card from "../../../components/Card/Card";

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
  const [showFormFolder, setShowFormFolder] = useState(false);
  const [showFormFile, setShowFormFile] = useState(false);

  // const userContext = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionType, setActionType] = useState("");

  const [folders, setFolders] = useState<FolderData[]>([]);

  const [files, setFiles] = useState([]);

  const [allFoldersSelected, setAllFoldersSelected] = useState(false);
  const [selectedFoldersIds, setSelectedFoldersIds] = useState<number[]>([]);

  const [filteredFolders, setFilteredFolders] = useState<FolderData[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileData[]>([]);
  const [deletedFolders, setDeletedFolders] = useState<FolderData[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const { pathname } = useLocation();
  const tabActive = tabsList.find((tab) => pathname.includes(tab.url));

  const displayDeleteModale = (actionType: string | null | undefined) => {
    setShowDeleteModal(!showDeleteModal);
    if (actionType) {
      setActionType(actionType);
    }
  };

  const handleSelectFolder = (folderId: number, isFolderSelected: boolean) => {
    setSelectedFoldersIds((prev) =>
      isFolderSelected
        ? [...prev, folderId]
        : prev.filter((id) => id !== folderId)
    );

    const allSelected = folders.every((folder) =>
      selectedFoldersIds.includes(folder?.id)
    );
    setAllFoldersSelected(allSelected);
  };

  const handleSelectAllCards = () => {
    if (!allFoldersSelected) {
      const allFolderIds = folders.map((folder) => folder?.id);
      setSelectedFoldersIds(allFolderIds);
    } else {
      setSelectedFoldersIds([]);
    }
    setAllFoldersSelected(!allFoldersSelected);
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
        navigate("/dashboard-cloud");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInputChange = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    folders.filter((folder) => folder.name.toLowerCase().includes(value));
    setFilteredFolders(filteredFolders);
    files.filter((file: FileData) => file.name.toLowerCase().includes(value));
    setFilteredFiles(filteredFiles);
  };

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

  useEffect(() => {
    const getFiles = async () => {
      try {
        const token = localStorage.getItem("@userToken");
        const response = await sendGetRequest(`${API_BASE_URL}/files`, {
          Authorization: `Bearer ${token}`,
        });
        if (!arraysAreEqual(files, response)) {
          setFiles(response);
        }
      } catch (error) {
        console.log("error");
      }
    };
    getFiles();
  }, []);

  useEffect(() => {
    if (allFoldersSelected) {
      setSelectedFoldersIds(folders?.map((folder: FolderData) => folder.id));
    } else {
      setSelectedFoldersIds([]);
    }
  }, [allFoldersSelected]);

  useEffect(() => {
    const filtered = folders.filter((folder) =>
      folder.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFolders(filtered);
    const filteredFiles = files.filter((file: FileData) =>
      file.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFiles(filteredFiles);
  }, [folders, files, searchValue]);

  useEffect(() => {
    if (allFoldersSelected) {
      setSelectedFoldersIds(folders?.map((folder: FolderData) => folder.id));
    } else {
      setSelectedFoldersIds([]);
    }
  }, [allFoldersSelected]);

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
    >
      <ToolBar
        setShowFormFolder={() => setShowFormFolder(!showFormFolder)}
        setShowFormFile={() => setShowFormFile(!showFormFile)}
        handleSelectAllCards={handleSelectAllCards}
        allFoldersSelected={allFoldersSelected}
        displayDeleteModale={displayDeleteModale}
        def={true}
        restore={true}
        isTrash={false}
        handleSearchInputChange={handleSearchInputChange}
        searchValue={searchValue}
      />
      <Breadcrumbs
        label={tabActive?.name}
        link="/dashboard-cloud"
        newLabel="1"
      />
      <Grid>
        <Box
          sx={{
            pt: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {(searchValue !== "" ? filteredFolders : folders).map(
            (data: FolderData) => (
              <CardFolder
                key={data.id}
                id={data.id}
                isFolderSelected={selectedFoldersIds.includes(data.id)}
                onSelectFolder={handleSelectFolder}
                allFoldersSelected={allFoldersSelected}
                moveToFavorites={() => moveToFavorites(data.id)}
                creation_date={data.creation_date}
                isFavorite={data.isFavorite}
                name={data.name}
              />
            )
          )}
          {(searchValue !== "" ? filteredFolders : files).map(
            (data: FileData) => (
              <Card
                key={data.id}
                id={data.id}
                // isFolderSelected={selectedFoldersIds.includes(data.id)}
                // onSelectFolder={handleSelectFolder}
                extension={data.extension}
                allFoldersSelected={allFoldersSelected}
                moveToFavorites={() => moveToFavorites(data.id)}
                creation_date={data.creation_date}
                isFavorite={data.isFavorite}
                name={data.name}
              />
            )
          )}

          {showFormFolder && (
            <FormDialogFolder
              handleClose={() => setShowFormFolder(false)}
              setFolders={setFolders}
            />
          )}
          {showFormFile && (
            <FormDialogFile handleClose={() => setShowFormFile(false)} />
          )}
          {showDeleteModal && (
            <DeleteDialog
              deletedFolders={deletedFolders}
              handleClose={() => setShowDeleteModal(false)}
              actionType={actionType}
            />
          )}
        </Box>
      </Grid>
    </Box>
  );
}
