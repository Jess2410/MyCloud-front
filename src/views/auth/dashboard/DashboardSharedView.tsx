import {
  // useContext,
  useEffect,
  useState,
} from "react";
import { Box, Grid } from "@mui/material";
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

export default function DashboardSharedView() {
  const { pathname } = useLocation();

  const tabActive = tabsList.find((tab) => pathname.includes(tab.url));

  const [folders, setFolders] = useState<FolderData[]>([]);

  const [files, setFiles] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState<FileData>();

  const {
    showFormFolder,
    setShowFormFolder,
    showFormFile,
    setShowFormFile,
    actionType,
    deletedFolders,
    displayDeleteModale,
    handleSelectAllCards,
    handleSearchInputChange,
    searchValue,
    filteredFolders,
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
  } = useToolbar(folders, files);

  const getFolders = async () => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/permissions`, {
        Authorization: `Bearer ${token}`,
      });
      if (JSON.stringify(folders) !== JSON.stringify(response)) {
        setFolders(response);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getFiles = async () => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/files`, {
        Authorization: `Bearer ${token}`,
      });
      if (JSON.stringify(files) !== JSON.stringify(response)) {
        setFiles(response);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getFoldersFromParent = async (foldersRequestPath: string) => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(
        `${API_BASE_URL}/folders/parent/${foldersRequestPath}`,
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

  const getFilesFromParent = async (foldersRequestPath: string) => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(
        `${API_BASE_URL}/files/parent/${foldersRequestPath}`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (JSON.stringify(folders) !== JSON.stringify(response)) {
        setFiles(response);
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
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveToFavoritesChange = (id: number) => {
    if (moveToFavorites) {
      moveToFavorites(id);
    }
  };
  const handleMoveToFavoritesFilesChange = (id: number) => {
    if (moveToFavoritesFiles) {
      moveToFavoritesFiles(id);
    }
  };
  useEffect(() => {
    const param = getLastParam(pathname);
    if (param.length == 0) setFiles([]);
    else getFilesFromParent(param);
    // else getFilesFromParent(param);
  }, [pathname]);

  useEffect(() => {
    const param = getLastParam(pathname);
    if (param.length == 0) getFolders();
    else getFoldersFromParent(param);
  }, [pathname]);
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
      <Breadcrumbs label={tabActive?.name} link="/dashboard-shared" />

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
                handleMoveToFavoritesChange={() =>
                  handleMoveToFavoritesChange(data.id)
                }
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
                handleMoveToFavoritesChange={() =>
                  handleMoveToFavoritesFilesChange(data.id)
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
              selectedFile={
                typeof selectedFileContent === "string"
                  ? undefined
                  : selectedFileContent
              }
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
            <FormDialogFile handleClose={() => setShowFormFile(false)} />
          )}
          {showFormMoveFolder && (
            <MoveDialogFolder
              folders={folders}
              handleClose={() => setShowFormMoveFolder(false)}
              folderToMove={folderToMove}
            />
          )}
          {showDeleteModal && (
            <DeleteDialog
              deletedFolders={deletedFolders}
              handleClose={() => setShowDeleteModal(false)}
              handleDelete={deleteSelectedItems}
              actionType={actionType}
              files={files}
              folders={folders}
            />
          )}
        </Box>
      </Grid>
    </Box>
  );
}
