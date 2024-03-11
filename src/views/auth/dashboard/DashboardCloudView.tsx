import Grid from "@mui/material/Grid";
import trashIcon from "../../../assets/icons/trash-drawer.svg";
import starIcon from "../../../assets/icons/star-drawer.svg";
import fileIcon from "../../../assets/icons/file-drawer.svg";
import sharedIcon from "../../../assets/icons/folder-shared.svg";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import DeleteDialog from "../../../components/Dialog/DeleteDialog.component";
import ToolBar from "../../../components/Tabs/ToolBar.component";
import { sendGetRequest } from "../../../utils/data";
import { API_BASE_URL } from "../../../constants/url";
import CardFolder from "../../../components/Card/CardFolder";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs.component";
import FormDialogFolder from "../../../components/Dialog/FormDialogFolder.component";
import FormDialogFile from "../../../components/Dialog/FormDialogFile.component";
import useToolbar from "../../../components/Tabs/hooks/useToolbar";
import CardFile from "../../../components/Card/CardFile";
import ModalFileViewer from "../../../components/ModalFileViewer/ModalFileViewer.component";
import { toast } from "react-toastify";
import { sendPatchRequest } from "../../../utils/data";
import MoveDialogFolder from "../../../components/Dialog/MoveDialogFolder.component";
import MoveDialogFile from "../../../components/Dialog/MoveDialogFile.component";
import FormSendUserFolderDialog from "../../../components/Dialog/FormSendUserFolder.component";

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
    name: "Partagés",
    key: 3,
    icon: sharedIcon,
    url: "/dashboard-shared",
  },
  {
    name: "Corbeille",
    key: 4,
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
  const { pathname } = useLocation();

  const tabActive = tabsList.find((tab) => pathname.includes(tab.url));

  const [folders, setFolders] = useState<FolderData[]>([]);

  const [files, setFiles] = useState<FileData[]>([]);

  const [showFormShare, setShowFormShare] = useState(false);
  const [fileToShare, setFileToShare] = useState<number | undefined>(undefined);

  const [open, setOpen] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState<
    FileData | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  const displayShareForm = (id: number) => {
    setShowFormShare(!showFormShare);
    setFileToShare(id);
  };
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

  const getFolders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/folders`, {
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
      setLoading(true);
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/files`, {
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

  const getFoldersFromParent = async (foldersRequestPath: string) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const getFilesFromParent = async (foldersRequestPath: string) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const getLastParam = (currentpathname: string): string => {
    const splitted = currentpathname.split("/");
    if (splitted.length <= 2) return "";
    return splitted[splitted.length - 1];
  };

  const handleOpen = async (id: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(
        `${API_BASE_URL}/files/file/${id}`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // const { url, extension } = response;
      setSelectedFileContent(response);
      setOpen(true);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFileContent(undefined);
  };

  const moveToFavorites = async (id: number) => {
    const loader = toast.loading("Veuillez patienter...");
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const moveToFavoritesFiles = async (id: number) => {
    const loader = toast.loading("Veuillez patienter...");
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const param = getLastParam(pathname);
    if (param.length == 0) getFiles();
    else getFilesFromParent(param);
  }, [pathname]);

  useEffect(() => {
    const param = getLastParam(pathname);
    if (param.length == 0) getFolders();
    else getFoldersFromParent(param);
  }, [pathname]);

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
      <Breadcrumbs label={tabActive?.name} link="/dashboard-cloud" />

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
            {(searchValue !== "" ? filteredFolders : folders).map(
              (data: FolderData) => (
                <CardFolder
                  displayMoveForm={() => displayMoveForm(data.id)}
                  displayShareForm={() => displayShareForm(data.id)}
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
              (data: FileData) => {
                console.log(data);
                return (
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
                );
              }
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
