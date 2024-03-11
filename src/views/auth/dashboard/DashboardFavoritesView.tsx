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

export default function DashboardFavoritesView() {
  const { pathname } = useLocation();

  const tabActive = tabsList.find((tab) => pathname.includes(tab.url));

  // const userContext = useContext(UserContext);

  const [folders, setFolders] = useState<FolderData[]>([]);
  const [files, setFiles] = useState<FileData[]>([]);

  const [allFoldersSelected, setAllFoldersSelected] = useState(false);
  const [selectedFoldersIds, setSelectedFoldersIds] = useState<number[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    showFormFolder,
    setShowFormFolder,
    showFormFile,
    setShowFormFile,
    actionType,
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
  } = useToolbar(folders, files);

  const getFiles = async () => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/files/favorites`, {
        Authorization: `Bearer ${token}`,
      });
      if (JSON.stringify(files) !== JSON.stringify(response)) {
        setFiles(response);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getFilesFromParent = async () => {
    setFiles([]);
  };

  const getFolders = async () => {
    try {
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
    }
  };

  const getLastParam = (currentpathname: string): string => {
    const splitted = currentpathname.split("/");
    if (splitted.length <= 2) return "";
    return splitted[splitted.length - 1];
  };

  const [open, setOpen] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState(undefined);

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

  useEffect(() => {
    const param = getLastParam(pathname);
    if (param.length == 0) getFiles();
    // else getFilesFromParent(param);
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
    <Box
      component="main"
      sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
    >
      <ToolBar
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
      <Breadcrumbs label={tabActive?.name} link="/dashboard-favorites" />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
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
            {showFormFile && (
              <FormDialogFile
                handleClose={() => setShowFormFile(false)}
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
  );
}
