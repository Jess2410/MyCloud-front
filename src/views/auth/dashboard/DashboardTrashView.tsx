import Grid from "@mui/material/Grid";

import {
  // useContext,
  useEffect,
  useState,
} from "react";
import { Box, CircularProgress } from "@mui/material";
// import { UserContext } from "../../../context/UserContext";
import ToolBar from "../../../components/Tabs/ToolBar.component";
import { toast } from "react-toastify";
import { sendGetRequest, sendPatchRequest } from "../../../utils/data";
import { API_BASE_URL } from "../../../constants/url";
import { FileData, FolderData } from "./DashboardCloudView";
import CardFolder from "../../../components/Card/CardFolder";
import FormDialogFile from "../../../components/Dialog/FormDialogFile.component";
import FormDialogFolder from "../../../components/Dialog/FormDialogFolder.component";
import { useLocation } from "react-router-dom";
import useToolbar from "../../../components/Tabs/hooks/useToolbar";
import { tabsList } from "../../../components/Drawer/DashboardDrawer.component";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs.component";
import CardFile from "../../../components/Card/CardFile";
import ModalFileViewer from "../../../components/ModalFileViewer/ModalFileViewer.component";
import RestoreDialogTrash from "../../../components/Dialog/RestoreDialogTrash.component";
import DeleteDialogTrashDef from "../../../components/Dialog/DeleteDialogTrashDef.component";
import EditFolderDialog from "../../../components/Dialog/EditFolder.component";
import EditFileDialog from "../../../components/Dialog/EditFile.component";

export default function DashboardTrashView() {
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const tabActive = tabsList.find((tab) => pathname.includes(tab.url));
  const [showFormShare, setShowFormShare] = useState(false);
  const [fileToShare, setFileToShare] = useState<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState(undefined);

  const {
    showFormFolder,
    setShowFormFolder,
    showFormFile,
    setShowFormFile,
    actionType,
    deletedFolders,
    displayDeleteModale,
    displayRestoreModale,
    handleSelectAllCards,
    handleSearchInputChange,
    searchValue,
    filteredFolders,
    setShowDeleteModal,
    setShowDeleteDefModal,
    selectedFiles,
    selectedFolders,
    handleSelectFolder,
    handleSelectFile,
    restoreSelectedItems,
    showRestoreModal,
    displayDeleteModaleDef,
    showDeleteDefModal,
    deleteDefinitivelyItems,
    displayMoveForm,
    fileToEdit,
    folderToEdit,
    displayMoveFileForm,
    displayEditFolderForm,
    displayEditFileForm,
    setShowFormEditFile,
    showFormEditFile,
    setShowFormEditFolder,
    showFormEditFolder,
  } = useToolbar(folders, files);

  const displayShareForm = (id: number) => {
    setShowFormShare(!showFormShare);
    setFileToShare(id);
  };

  const handleOpen = async (id: any) => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/files/${id}`, {
        Authorization: `Bearer ${token}`,
      });
      const { url } = response;
      setSelectedFileContent(url);
      setOpen(true);
    } catch (error) {
      console.log("error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFileContent(undefined);
  };

  const getFolders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/folders/trash`, {
        Authorization: `Bearer ${token}`,
      });
      if (JSON.stringify(folders) !== JSON.stringify(response)) {
        setFolders(response);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const getFiles = async () => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/files/trash`, {
        Authorization: `Bearer ${token}`,
      });
      if (JSON.stringify(folders) !== JSON.stringify(response)) {
        setFiles(response);
      }
    } catch (error) {
      console.log("error");
    }
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
        const foldersCopy = [...folders];

        const folderIndex = foldersCopy.findIndex((folder) => folder.id === id);
        if (folderIndex !== -1) {
          foldersCopy[folderIndex] = {
            ...foldersCopy[folderIndex],
            isFavorite: response.folder.isFavorite === 1 ? true : false,
          };

          setFolders(foldersCopy);
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const moveToFavoritesFiles = async (id: number) => {
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPatchRequest(
        `${API_BASE_URL}/files/isFavorite`,
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
        const filesCopy = [...files];

        const fileIndex = filesCopy.findIndex((file) => file.id === id);
        if (fileIndex !== -1) {
          filesCopy[fileIndex] = {
            ...filesCopy[fileIndex],
            isFavorite: response.file.isFavorite === 1 ? true : false,
          };

          setFiles(filesCopy);
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFolders();
    getFiles();
  }, []);

  return (
    <>
      <ToolBar
        selectedFiles={selectedFiles}
        selectedFolders={selectedFolders}
        setShowFormFolder={() => setShowFormFolder(!showFormFolder)}
        setShowFormFile={() => setShowFormFile(!showFormFile)}
        handleSelectAllCards={handleSelectAllCards}
        isChecked={
          [...selectedFolders.values()].every((value) => value === true) &&
          [...selectedFiles.values()].every((value) => value === true)
        }
        displayDeleteModale={displayDeleteModale}
        displayRestoreModale={displayRestoreModale}
        displayDeleteModaleDef={displayDeleteModaleDef}
        def={true}
        restore={true}
        isTrash={true}
        handleSearchInputChange={handleSearchInputChange}
        searchValue={searchValue}
        folders={folders}
        files={files}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
      >
        <Breadcrumbs label={tabActive?.name} link="/dashboard-cloud" />
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
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
                    displayMoveForm={() => displayMoveForm(data.id)}
                    displayShareForm={() => displayShareForm(data.id)}
                    displayEditForm={() =>
                      displayEditFolderForm(data.id, data.name)
                    }
                    handleMoveToFavoritesChange={() => moveToFavorites(data.id)}
                    key={data.id}
                    id={data.id}
                    onSelectFolder={handleSelectFolder}
                    isSelected={selectedFolders.get(data.id)}
                    creation_date={data.creation_date}
                    isFavorite={data.isFavorite}
                    name={data.name}
                  />
                )
              )}

              {(searchValue !== "" ? filteredFolders : files).map(
                (data: FileData) => (
                  <CardFile
                    displayMoveFileForm={() => displayMoveFileForm(data.id)}
                    displayEditFileForm={() =>
                      displayEditFileForm(data.id, data.name)
                    }
                    handleMoveToFavoritesChange={() =>
                      moveToFavoritesFiles(data.id)
                    }
                    key={data.id}
                    id={data.id}
                    onSelectFile={handleSelectFile}
                    extension={data.extension}
                    isSelected={selectedFiles.get(data.id)}
                    creation_date={data.creation_date}
                    isFavorite={data.isFavorite}
                    name={data.name}
                    onDoubleClick={() => handleOpen(data.id)}
                  />
                )
              )}
              {open && (
                <ModalFileViewer
                  selectedFile={selectedFileContent}
                  handleClose={handleClose}
                />
              )}
              {showFormFolder && (
                <FormDialogFolder
                  handleClose={() => setShowFormFolder(false)}
                  setFolders={setFolders}
                />
              )}
              {showFormFile && (
                <FormDialogFile
                  handleClose={() => setShowFormFile(false)}
                  setFiles={setFiles}
                />
              )}
              {showFormEditFolder && (
                <EditFolderDialog
                  folders={folders}
                  handleClose={() => setShowFormEditFolder(false)}
                  folderToEdit={folderToEdit}
                  setFolders={setFolders}
                />
              )}
              {showFormEditFile && (
                <EditFileDialog
                  files={files}
                  handleClose={() => setShowFormEditFile(false)}
                  fileToEdit={fileToEdit}
                  setFiles={setFiles}
                />
              )}
              {showRestoreModal && (
                <RestoreDialogTrash
                  deletedFolders={deletedFolders}
                  handleClose={() => setShowDeleteModal(false)}
                  actionType={actionType}
                  handleRestore={restoreSelectedItems}
                />
              )}
              {showDeleteDefModal && (
                <DeleteDialogTrashDef
                  deletedFolders={deletedFolders}
                  handleClose={() => setShowDeleteDefModal(false)}
                  handleDeleteDef={deleteDefinitivelyItems}
                  files={files}
                  folders={folders}
                />
              )}
            </Box>
          </Grid>
        )}
      </Box>
    </>
  );
}
