import {
  // useContext,
  useEffect,
  useState,
} from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
// import { UserContext } from "../../../context/UserContext";
import DeleteDialog from "../../../components/Dialog/DeleteDialog.component";
import ToolBar from "../../../components/Tabs/ToolBar.component";
import { toast } from "react-toastify";
import { sendGetRequest, sendPatchRequest } from "../../../utils/data";
import { API_BASE_URL } from "../../../constants/url";
import { FileData, FolderData, tabsList } from "./DashboardCloudView";
import CardFolder from "../../../components/Card/CardFolder";
import FormDialogFolder from "../../../components/Dialog/FormDialogFolder.component";
import FormDialogFile from "../../../components/Dialog/FormDialogFile.component";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs.component";
import { useLocation } from "react-router-dom";
import CardFile from "../../../components/Card/CardFile";
import ModalFileViewer from "../../../components/ModalFileViewer/ModalFileViewer.component";
import useToolbar from "../../../components/Tabs/hooks/useToolbar";
import MoveDialogFolder from "../../../components/Dialog/MoveDialogFolder.component";
import MoveDialogFile from "../../../components/Dialog/MoveDialogFile.component";
import EditFolderDialog from "../../../components/Dialog/EditFolder.component";
import EditFileDialog from "../../../components/Dialog/EditFile.component";
import FormSendUserFolderDialog from "../../../components/Dialog/FormSendUserFolder.component";

export default function DashboardFavoritesView() {
  const { pathname } = useLocation();

  const tabActive = tabsList.find((tab) => pathname.includes(tab.url));

  const [folders, setFolders] = useState<FolderData[]>([]);
  const [files, setFiles] = useState<FileData[]>([]);
  const [showFormShare, setShowFormShare] = useState(false);
  const [fileToShare, setFileToShare] = useState<number | undefined>(undefined);
  const [allFoldersSelected, setAllFoldersSelected] = useState(false);
  const [selectedFoldersIds, setSelectedFoldersIds] = useState<number[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState(undefined);

  const {
    showFormFolder,
    setShowFormFolder,
    showFormFile,
    setShowFormFile,
    deletedFolders,
    deletedFiles,
    displayDeleteModale,
    handleSelectAllCards,
    handleSearchInputChange,
    searchValue,
    filteredFolders,
    setFilteredFolders,
    showDeleteModal,
    setShowDeleteModal,
    selectedFiles,
    selectedFolders,
    handleSelectFolder,
    handleSelectFile,
    deleteSelectedItems,
    displayMoveForm,
    setShowFormMoveFolder,
    showFormMoveFolder,
    folderToMove,
    displayMoveFileForm,
    setShowFormMoveFile,
    showFormMoveFile,
    fileToMove,
    fileToEdit,
    folderToEdit,
    setShowFormEditFile,
    showFormEditFile,
    setShowFormEditFolder,
    showFormEditFolder,
    displayEditFolderForm,
    displayEditFileForm,
  } = useToolbar(folders, files);

  const getFolders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(
        `${API_BASE_URL}/folders/favorites`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
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
      setLoading(true);
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/files/favorites`, {
        Authorization: `Bearer ${token}`,
      });
      if (JSON.stringify(files) !== JSON.stringify(response)) {
        setFiles(response);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const getFilesFromParent = async () => {
    setFiles([]);
  };

  const getLastParam = (currentpathname: string): string => {
    const splitted = currentpathname.split("/");
    if (splitted.length <= 2) return "";
    return splitted[splitted.length - 1];
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

  const displayShareForm = (id: number) => {
    setShowFormShare(!showFormShare);
    setFileToShare(id);
  };

  useEffect(() => {
    const param = getLastParam(pathname);
    if (param.length == 0) getFiles();
    else getFilesFromParent();
  }, [pathname]);

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
    const filtered = folders.filter((folder) =>
      folder.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFolders(filtered);
  }, [folders, searchValue]);

  useEffect(() => {
    getFolders();
  }, []);

  useEffect(() => {
    const updatedFolders = folders.filter(
      (folder) => !deletedFolders.includes(folder.id)
    );
    setFolders(updatedFolders);

    const updatedFiles = files.filter(
      (file) => !deletedFiles.includes(file.id)
    );
    setFiles(updatedFiles);
  }, [deletedFiles, deletedFolders]);

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
        def={true}
        restore={true}
        isTrash={false}
        handleSearchInputChange={handleSearchInputChange}
        searchValue={searchValue}
      />

      <Box
        component="main"
        sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
      >
        <Breadcrumbs label={tabActive?.name} link="/dashboard-favorites" />
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
              {(searchValue !== "" ? filteredFolders : folders)?.map(
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

              {(searchValue !== "" ? filteredFiles : files).map(
                (data: FileData) => (
                  <>
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
                  </>
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
              {showFormShare && (
                <FormSendUserFolderDialog
                  handleClose={() => setShowFormShare(false)}
                  setFolders={setFolders}
                  fileToShare={fileToShare}
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
              {showFormMoveFolder && (
                <MoveDialogFolder
                  folders={folders}
                  handleClose={() => setShowFormMoveFolder(false)}
                  folderToMove={folderToMove}
                />
              )}
              {showFormMoveFile && (
                <MoveDialogFile
                  files={files}
                  folders={folders}
                  handleClose={() => setShowFormMoveFile(false)}
                  fileToMove={fileToMove}
                />
              )}
              {showDeleteModal && (
                <DeleteDialog
                  handleClose={() => setShowDeleteModal(false)}
                  handleDelete={deleteSelectedItems}
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
