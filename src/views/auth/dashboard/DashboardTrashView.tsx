import Grid from "@mui/material/Grid";

import {
  // useContext,
  useEffect,
  useState,
} from "react";
import { Box } from "@mui/material";
// import { UserContext } from "../../../context/UserContext";
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
import Card from "../../../components/Card/CardFile";
import { useLocation, useNavigate } from "react-router-dom";
import useToolbar from "../../../components/Tabs/hooks/useToolbar";
import { tabsList } from "../../../components/Drawer/DashboardDrawer.component";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs.component";
import CardFile from "../../../components/Card/CardFile";
import ModalFileViewer from "../../../components/ModalFileViewer/ModalFileViewer.component";

export default function DashboardTrashView() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [files, setFiles] = useState([]);

  const {
    showFormFolder,
    setShowFormFolder,
    showFormFile,
    setShowFormFile,
    actionType,
    deletedFolders,
    displayDeleteModale,
    handleSelectFolder,
    handleSelectAllCards,
    handleSearchInputChange,
    allFoldersSelected,
    setAllFoldersSelected,
    searchValue,
    setSearchValue,
    selectedFoldersIds,
    setSelectedFoldersIds,
    filteredFolders,
    setFilteredFolders,
    showDeleteModal,
    setShowDeleteModal,
  } = useToolbar(folders, files);

  const { pathname } = useLocation();
  const tabActive = tabsList.find((tab) => pathname.includes(tab.url));

  const [open, setOpen] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  console.log("🚀 ~ selectedFileContent:", selectedFileContent);

  const handleOpen = async (id: any) => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/files/${id}`, {
        Authorization: `Bearer ${token}`,
      });
      const { url } = response;
      console.log("🚀 ~ handleOpen ~ response:", response);
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
      <Breadcrumbs label={tabActive?.name} link="/dashboard-cloud" />
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
              <CardFile
                key={data.id}
                id={data.id}
                // isFolderSelected={selectedFoldersIds.includes(data.id)}
                // onSelectFolder={handleSelectFolder}
                extension={data.extension}
                allFoldersSelected={allFoldersSelected}
                creation_date={data.creation_date}
                isFavorite={data.isFavorite}
                name={data.name}
                onDoubleClick={() => handleOpen(data.id)}
              />
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
