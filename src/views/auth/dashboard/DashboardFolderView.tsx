import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ToolBarInFolder from "../../../components/Tabs/ToolBarInFolder.component";
import {
  sendGetRequest,
  sendPatchRequest,
  sendPostRequest,
} from "../../../utils/data";
import { arraysAreEqual } from "../../../utils/array";
import { API_BASE_URL } from "../../../constants/url";
import { FileData, FolderData } from "./DashboardCloudView";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { tabsList } from "../../../components/Drawer/DashboardDrawer.component";
import Card from "../../../components/Card/CardFile";
import CardFolder from "../../../components/Card/CardFolder";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs.component";

export default function DashboardFolderView() {
  const navigate = useNavigate();
  const params = useParams();

  const location = useLocation();
  const id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1,
    location.pathname.length
  );
  console.log(id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [files, setFiles] = useState([]);

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

  const getFoldersAndFilesByParentId = async (id: number | string) => {
    try {
      const token = localStorage.getItem("@userToken");

      const response = await sendGetRequest(
        `${API_BASE_URL}/folders/parent/${id}`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (JSON.stringify(folders) !== JSON.stringify(response)) {
        console.log(response);
        setFolders(response);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    const getFolders = async () => {
      getFoldersAndFilesByParentId(id);
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

      {/* <Breadcrumbs label={params.id} link="/dashboard-cloud" newLabel="1" /> */}
      {/* {(searchValue !== "" ? filteredFolders : folders).map(
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

      {(searchValue !== "" ? filteredFolders : files).map((data: FileData) => (
        <CardFile
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
      ))} */}
    </Box>
  );
}
