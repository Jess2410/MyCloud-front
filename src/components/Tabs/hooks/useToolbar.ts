import { useState, useEffect } from "react";
import {
  FileData,
  FolderData,
} from "../../../views/auth/dashboard/DashboardCloudView";
import { toast } from "react-toastify";

import _ from "lodash";
import { sendPatchRequest } from "../../../utils/data";
import { API_BASE_URL } from "../../../constants/url";

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
  const [deletedFolders, setDeletedFolders] = useState<number[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);

  const [selectedFolders, setSelectedFolders] = useState<Map<number, boolean>>(
    new Map()
  );

  const [selectedFiles, setSelectedFiles] = useState<Map<number, boolean>>(
    new Map()
  );

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
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    folders.filter((folder) => folder.name.toLowerCase().includes(value));
    setFilteredFolders(filteredFolders);
    files.filter((file: FileData) => file.name.toLowerCase().includes(value));
    setFilteredFiles(filteredFiles);
  };

  const deleteSelectedItems = async () => {
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      // const response = await sendPatchRequest(
      //   `${API_BASE_URL}/folders/isTrash`,
      //   { Authorization: `Bearer ${token}` },
      //   {
      //     folders: selectedFolders.keys(),
      //     files: selectedFiles.keys(),
      //   }
      // );
      // { id: id }

      const filteredFolders = [...selectedFolders.entries()]
        .filter(([_key, value]) => value === true)
        .map(([key, _value]) => key);

      const filteredFiles = [...selectedFiles.entries()]
        .filter(([_key, value]) => value === true)
        .map(([key, _value]) => key);

      const response = await fetch(`${API_BASE_URL}/folders/isTrash`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          folders: filteredFolders,
          files: filteredFiles,
        }),
      });

      // const response = await fetch("/deleteItems", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     folders: foldersToDelete,
      //     files: filesToDelete,
      //   }),
      // });

      if (response.status === 200) {
        toast.update(loader, {
          render: response.message,
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        // // Mettre à jour l'état local avec les éléments supprimés
        // setDeletedFolders([...deletedFolders, ...foldersToDelete]);
        // // Remettez à zéro les éléments sélectionnés
        // setSelectedFolders(new Map());
        // setSelectedFiles(new Map());
      } else {
        throw new Error("Failed to delete selected items");
      }
    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };

  // useEffect(() => {
  //   if (allFoldersSelected) {
  //     setSelectedFoldersIds(folders?.map((folder: FolderData) => folder.id));
  //   } else {
  //     setSelectedFoldersIds([]);
  //   }
  // }, [allFoldersSelected]);

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
    deleteSelectedItems,
  };
};
export default useToolbar;
