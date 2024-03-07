import { useState, useEffect } from "react";
import {
  FileData,
  FolderData,
} from "../../../views/auth/dashboard/DashboardCloudView";

import _ from "lodash";

const initSelectedItems = (
  items: FolderData[] | FileData[]
): Map<number, boolean> => {
  const map = new Map();

  items.forEach((item: FolderData | FileData) => {
    map.set(item.id, false);
  });

  return map;
};

const useToolbar = (folders: FolderData[], files: FileData[]) => {
  const [showFormFolder, setShowFormFolder] = useState(false);
  const [showFormFile, setShowFormFile] = useState(false);
  // const userContext = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionType, setActionType] = useState("");

  const [filteredFolders, setFilteredFolders] = useState<FolderData[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [deletedFolders, setDeletedFolders] = useState<FolderData[]>([]);

  const [selectedFolders, setSelectedFolders] = useState<Map<number, boolean>>(
    new Map()
  );

  const [selectedFiles, setSelectedFiles] = useState<Map<number, boolean>>(
    new Map()
  );

  console.log("folders", selectedFolders);
  console.log("files", selectedFiles);

  const displayDeleteModale = (actionType: string | null | undefined) => {
    setShowDeleteModal(!showDeleteModal);
    if (actionType) {
      setActionType(actionType);
    }
  };

  const handleSelectFolder = (folderId: number, isFolderSelected: boolean) => {
    const selectedFoldersCopy = _.cloneDeep(selectedFolders);
    selectedFoldersCopy.set(folderId, isFolderSelected);

    setSelectedFolders(selectedFoldersCopy);
  };
  const handleSelectFile = (fileId: number, isFileSelected: boolean) => {
    const selectedFilesCopy = _.cloneDeep(selectedFiles);
    selectedFilesCopy.set(fileId, isFileSelected);

    setSelectedFiles(selectedFilesCopy);
  };

  const handleSelectAllCards = (isSelected: boolean) => {
    const mapFolders = new Map();
    const mapFiles = new Map();

    const selectedFoldersCopy = _.cloneDeep(selectedFolders);
    const selectedFilesCopy = _.cloneDeep(selectedFiles);

    selectedFoldersCopy.forEach((_, key) => {
      mapFolders.set(key, isSelected);
    });
    selectedFilesCopy.forEach((_, key) => {
      mapFiles.set(key, isSelected);
    });

    setSelectedFolders(mapFolders);
    setSelectedFiles(mapFiles);
  };

  const handleSearchInputChange = (event: any) => {
    // const value = event.target.value.toLowerCase();
    // setSearchValue(value);
    // folders.filter((folder) => folder.name.toLowerCase().includes(value));
    // setFilteredFolders(filteredFolders);
    // files.filter((file: FileData) => file.name.toLowerCase().includes(value));
    // setFilteredFiles(filteredFiles);
  };

  // useEffect(() => {
  //   if (allFoldersSelected) {
  //     setSelectedFoldersIds(folders?.map((folder: FolderData) => folder.id));
  //   } else {
  //     setSelectedFoldersIds([]);
  //   }
  // }, [allFoldersSelected]);

  // useEffect(() => {
  //   const filtered = folders.filter((folder) =>
  //     folder.name.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setFilteredFolders(filtered);
  //   const filteredFiles = files.filter((file: FileData) =>
  //     file.name.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setFilteredFiles(filteredFiles);
  // }, [folders, files, searchValue]);

  useEffect(() => {
    setSelectedFolders(initSelectedItems(folders));
  }, [folders]);

  useEffect(() => {
    setSelectedFiles(initSelectedItems(files));
  }, [files]);

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
    handleSelectAllCards,
    handleSearchInputChange,
    searchValue,
    setSearchValue,
    selectedFiles,
    selectedFolders,
    filteredFolders,
    setFilteredFolders,
    showDeleteModal,
    setShowDeleteModal,
    handleSelectFolder,
    handleSelectFile,
  };
};
export default useToolbar;
