import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import ToolBarInFolder from "../../../components/Tabs/ToolBarInFolder.component";
import {
  sendGetRequest,
  sendPatchRequest,
  sendPostRequest,
} from "../../../utils/data";
import { arraysAreEqual } from "../../../utils/array";
import { API_BASE_URL } from "../../../constants/url";
import { FolderData } from "./DashboardCloudView";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { tabsList } from "../../../components/Drawer/DashboardDrawer.component";

export default function DashboardFolderView() {
  const navigate = useNavigate();
  // const [showForm, setShowForm] = useState(false);
  // const [typeForm, setTypeForm] = useState("");
  // const userContext = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [folders, setFolders] = useState<FolderData[]>([]);

  // const [files, setFiles] = useState([]);
  const [nameFolder, setNameFolder] = useState("");

  const [allFoldersSelected, setAllFoldersSelected] = useState(false);
  const [selectedFoldersIds, setSelectedFoldersIds] = useState<number[]>([]);

  const [filteredFolders, setFilteredFolders] = useState<FolderData[]>([]);
  const [deletedFolders, setDeletedFolders] = useState<FolderData[]>([]);
  const [searchValue, setSearchValue] = useState("");

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
        navigate("/dashboard-cloud"); //TODO implémentation à refaire
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

  useEffect(() => {
    const filtered = folders.filter((folder) =>
      folder.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFolders(filtered);
  }, [folders, searchValue]);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
    >
      <ToolBarInFolder
        handleSelectAllCards={handleSelectAllCards}
        allFoldersSelected={allFoldersSelected}
        displayDeleteModale={displayDeleteModale}
        def={true}
        restore={true}
        isTrash={false}
        handleSearchInputChange={handleSearchInputChange}
        searchValue={searchValue}
      />
    </Box>
  );
}
