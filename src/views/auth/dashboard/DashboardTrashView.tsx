import Grid from "@mui/material/Grid";

import {
  // useContext,
  useEffect,
  useState,
} from "react";
import { Box } from "@mui/material";
// import { UserContext } from "../../../context/UserContext";
import FormDialog from "../../../components/Dialog/FormDialogFile.component";
import DeleteDialog from "../../../components/Dialog/DeleteDialog.component";
import ToolBar from "../../../components/Tabs/ToolBar.component";
import { toast } from "react-toastify";
import {
  sendGetRequest,
  sendPatchRequest,
  sendPostRequest,
} from "../../../utils/data";
import { API_BASE_URL } from "../../../constants/url";
import { FileData, FolderData } from "./DashboardCloudView";
import CardFolder from "../../../components/Card/CardFolder";
import DeleteDialogTrash from "../../../components/Dialog/DeleteDialogTrash.component";
import FormDialogFile from "../../../components/Dialog/FormDialogFile.component";
import FormDialogFolder from "../../../components/Dialog/FormDialogFolder.component";
import { arraysAreEqual } from "../../../utils/array";
import Card from "../../../components/Card/Card";
import { useNavigate } from "react-router-dom";

export default function DashboardTrashView() {
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
  const [searchValue, setSearchValue] = useState("");
  const [deletedFolders, setDeletedFolders] = useState<FolderData[]>([]);

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
      const response = await sendGetRequest(`${API_BASE_URL}/folders/trash`, {
        Authorization: `Bearer ${token}`,
      });
      if (!arraysAreEqual(folders, response)) {
        setFolders(response);
      }
    } catch (error) {
      console.log("error");
    }
  };

  // TODO : la route pour get les fichiers trash
  // useEffect(() => {
  //   const getFiles = async () => {
  //     try {
  //       const token = localStorage.getItem("@userToken");
  //       const response = await sendGetRequest(
  //         `${API_BASE_URL}/files/trash`,
  //         {
  //           Authorization: `Bearer ${token}`,
  //         }
  //       );
  //       if (!arraysAreEqual(files, response)) {
  //         setFiles(response);
  //       }
  //     } catch (error) {
  //       console.log("error");
  //     }
  //   };
  //   getFiles();
  // }, []);

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
                // moveToFavorites={() => moveToFavorites(data.id)}
                creation_date={data.creation_date}
                isFavorite={data.isFavorite}
                name={data.name}
                // onDoubleClick={() => handleFolderDoubleClick(data.id)}
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
            <DeleteDialogTrash
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
