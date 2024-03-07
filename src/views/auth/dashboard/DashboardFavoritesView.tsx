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
import { arraysAreEqual } from "../../../utils/array";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs.component";
import { useLocation } from "react-router-dom";
import CardFile from "../../../components/Card/CardFile";
import ModalFileViewer from "../../../components/ModalFileViewer/ModalFileViewer.component";
import useToolbar from "../../../components/Tabs/hooks/useToolbar";

export default function DashboardFavoritesView() {
  const { pathname } = useLocation();

  const tabActive = tabsList.find((tab) => pathname.includes(tab.url));

  // const userContext = useContext(UserContext);

  const [folders, setFolders] = useState<FolderData[]>([]);
  const [files, setFiles] = useState([]);

  const [allFoldersSelected, setAllFoldersSelected] = useState(false);
  const [selectedFoldersIds, setSelectedFoldersIds] = useState<number[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileData[]>([]);

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
    setSearchValue,
    filteredFolders,
    setFilteredFolders,
    showDeleteModal,
    setShowDeleteModal,
    selectedFiles,
    selectedFolders,
    handleSelectFolder,
    handleSelectFile,
  } = useToolbar(folders, files);

  const getFiles = async () => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/files/favorites`, {
        Authorization: `Bearer ${token}`,
      });
      if (!arraysAreEqual(files, response)) {
        setFiles(response);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getFilesFromParent = async (filesRequestPath: string) => {
    // console.log("getFilesFromParent ", filesRequestPath);
    setFiles([]);
    // try {
    //   const token = localStorage.getItem("@userToken");
    //   const response = await sendGetRequest(
    //     `${API_BASE_URL}/files/parent/${filesRequestPath}`,
    //     {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   );
    //   if (!arraysAreEqual(files, response)) {
    //     setFiles(response);
    //   }
    // } catch (error) {
    //   console.log("error");
    // }
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

  const getFolders = async () => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(
        `${API_BASE_URL}/folders/favorites`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!arraysAreEqual(folders, response)) {
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

  // TODO : la route pour get les fichiers favoris
  // useEffect(() => {
  //   const getFiles = async () => {
  //     try {
  //       const token = localStorage.getItem("@userToken");
  //       const response = await sendGetRequest(
  //         `${API_BASE_URL}/files/favorites`,
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

  const [open, setOpen] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState(null);

  const handleOpen = async (id: any) => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/files/${id}`, {
        Authorization: `Bearer ${token}`,
      });
      const { url } = response;
      // console.log("🚀 ~ handleOpen ~ response:", response);
      setSelectedFileContent(url);
      setOpen(true);
    } catch (error) {
      console.log("error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFileContent(null);
  };

  useEffect(() => {
    //console.log(lastPathnameId); ///TODO pas encore modifié par la ligne 181 a ce moement la
    const param = getLastParam(pathname);
    if (param.length == 0) getFiles();
    else getFilesFromParent(param);
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

  // useEffect(() => {
  //   const filtered = folders.filter((folder) =>
  //     folder.name.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setFilteredFolders(filtered);
  // }, [folders, searchValue]);

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
              selectedFile={selectedFileContent ? selectedFileContent : ""}
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
