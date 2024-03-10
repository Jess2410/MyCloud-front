import { useState, useEffect } from "react";
import {
  FileData,
  FolderData,
} from "../../../views/auth/dashboard/DashboardCloudView";
import { toast } from "react-toastify";

import _ from "lodash";
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
  const [showFormMoveFolder, setShowFormMoveFolder] = useState(false);
  const [showFormMoveFile, setShowFormMoveFile] = useState(false);
  // const userContext = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteDefModal, setShowDeleteDefModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [folderToMove, setFolderToMove] = useState<number>();
  const [fileToMove, setFileToMove] = useState<number>();

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
  const displayMoveForm = (id: number) => {
    setShowFormMoveFolder(!showFormMoveFolder);
    setFolderToMove(id);
  };
  const displayMoveFileForm = (id: number) => {
    setShowFormMoveFile(!showFormMoveFile);
    setFileToMove(id);
  };
  const displayDeleteModaleDef = () => {
    setShowDeleteDefModal(!showDeleteDefModal);
  };
  const displayRestoreModale = () => {
    setShowRestoreModal(!showRestoreModal);
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
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          folders: filteredFolders,
          files: filteredFiles,
        }),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        toast.update(loader, {
          render: responseData?.message,
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        displayDeleteModale("none");
      } else {
        throw new Error("Failed to delete selected items");
      }
    } catch (error) {
      displayDeleteModale("none");
      console.error("Error deleting selected items:", error);
    }
  };
  const restoreSelectedItems = async () => {
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");

      const filteredFolders = [...selectedFolders.entries()]
        .filter(([_key, value]) => value === true)
        .map(([key, _value]) => key);

      const filteredFiles = [...selectedFiles.entries()]
        .filter(([_key, value]) => value === true)
        .map(([key, _value]) => key);

      const response = await fetch(`${API_BASE_URL}/folders/restore`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          folders: filteredFolders,
          files: filteredFiles,
        }),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        toast.update(loader, {
          render: responseData?.message,
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        displayRestoreModale();
      } else {
        throw new Error("Failed to restore selected items");
      }
    } catch (error) {
      displayRestoreModale();
      console.error("Error restoring selected items:", error);
    }
  };

  const deleteDefinitivelyItems = async () => {
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");

      const filteredFolders = [...selectedFolders.entries()]
        .filter(([_key, value]) => value === true)
        .map(([key, _value]) => key);

      const filteredFiles = [...selectedFiles.entries()]
        .filter(([_key, value]) => value === true)
        .map(([key, _value]) => key);

      const response = await fetch(`${API_BASE_URL}/folders/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          folders: filteredFolders,
          files: filteredFiles,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.update(loader, {
          render: responseData.message,
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        displayDeleteModaleDef();
      } else {
        throw new Error("Failed to delete selected items");
      }
    } catch (error) {
      displayDeleteModaleDef();
      console.error("Error deleting selected items:", error);
    }
  };

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
    displayRestoreModale,
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
    setShowRestoreModal,
    handleSelectFolder,
    handleSelectFile,
    deleteSelectedItems,
    restoreSelectedItems,
    showRestoreModal,
    displayDeleteModaleDef,
    showDeleteDefModal,
    setShowDeleteDefModal,
    deleteDefinitivelyItems,
    setSelectedFiles,
    setSelectedFolders,
    displayMoveForm,
    setShowFormMoveFolder,
    showFormMoveFolder,
    folderToMove,
    displayMoveFileForm,
    setShowFormMoveFile,
    showFormMoveFile,
    fileToMove,
  };
};
export default useToolbar;
