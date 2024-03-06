import { useState, useEffect } from "react";
import {
  FileData,
  FolderData,
} from "../../../views/auth/dashboard/DashboardCloudView";
const useToolbar = (folders: FolderData[], files: FileData[]) => {
  const [showFormFolder, setShowFormFolder] = useState(false);
  const [showFormFile, setShowFormFile] = useState(false);
  // const userContext = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionType, setActionType] = useState("");

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

    const allSelected = folders.every((folder: FolderData) =>
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

  const handleSearchInputChange = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    folders.filter((folder) => folder.name.toLowerCase().includes(value));
    setFilteredFolders(filteredFolders);
    files.filter((file: FileData) => file.name.toLowerCase().includes(value));
    setFilteredFiles(filteredFiles);
  };

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

  return {
    showFormFolder,
    setShowFormFolder,
    showFormFile,
    setShowFormFile,
    actionType,
    setActionType,
    deletedFolders,
    setDeletedFolders,
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
  };
};
export default useToolbar;
