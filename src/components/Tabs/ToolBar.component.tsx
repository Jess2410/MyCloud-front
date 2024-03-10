import { Box, ButtonBase, Typography } from "@mui/material";
import IconButton from "../IconButton/IconButton";
import SearchWithFilter from "../SearchBarFilter/SearchBarFilter.component";
// import { useState, useEffect } from "react";
import addFile from "../../assets/icons/add-file-icon.png";
import addFolder from "../../assets/icons/add-folder-icon.png";
import trash from "../../assets/icons/trash-icon.png";
// import disabledTrash from "../../assets/icons/disabled-trash.png";
import checkboxChecked from "../../assets/icons/Vectorcheckbox-checked.png";
import checkboxUnchecked from "../../assets/icons/Vectorcheckbox-no-checked.png";
import deftrashIcon from "../../assets/icons/trash-definitive-icon.png";
import React from "react";
import Checkbox from "../Button/Checkbox/Checkbox";
// import useToolbar from "./hooks/useToolbar";
// import { FolderData } from "../../views/auth/dashboard/DashboardCloudView";

type ToolBarProps = {
  handleSelectAllCards: (isSelected: boolean) => void;
  tabActive?: number;
  allCheckboxesChecked?: boolean;
  isTrash: boolean;
  displayDeleteModale: (actionType?: string | null | undefined) => void;
  def: boolean;
  restore: boolean;
  handleSearchInputChange?: (event: any) => void;
  searchValue: string;
  setShowFormFolder: any;
  setShowFormFile: () => void;
  isChecked: boolean;
  displayRestoreModale?: () => void;
  displayDeleteModaleDef?: () => void;
  folders?: any;
  files?: any;
  // selectedFiles: Map<number, boolean>;
  // selectedFolders: Map<number, boolean>;
  // handleSelectFolder: any;
  // handleSelectFile: any;
  // setSelectedFiles: () => void;
  // setSelectedFolders: () => void;
};
const ToolBar: React.FC<ToolBarProps> = ({
  setShowFormFolder,
  setShowFormFile,
  handleSelectAllCards,
  displayDeleteModale,
  isTrash = false,
  handleSearchInputChange,
  displayRestoreModale,
  searchValue,
  isChecked,
  displayDeleteModaleDef,
}) => {
  return (
    <Box
      sx={{
        background: "rgba(124, 210, 215, 0.2)",
        borderRadius: "60px",
        p: "4px",
        display: "flex",
        alignItems: "center",
        mr: 1,
        flexWrap: "wrap",
        px: 2,
      }}
    >
      <Box
        sx={{
          borderRight: "1px solid var(--primary)",
          mx: 1,

          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton icon={addFolder} onClick={setShowFormFolder} />
        <IconButton icon={addFile} onClick={setShowFormFile} />
      </Box>
      <SearchWithFilter
        searchValue={searchValue}
        handleSearchInputChange={handleSearchInputChange}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mx: 1,
          flexWrap: "nowrap",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            color: "#A0A0A0",
            fontSize: 18,
            fontWeight: 300,
          }}
        >
          Sélectionner
        </Typography>

        <Checkbox
          iconChecked={checkboxChecked}
          iconUnchecked={checkboxUnchecked}
          isChecked={isChecked}
          onChange={handleSelectAllCards}
        />

        {isTrash ? (
          <>
            {/* {[...selectedFolders.values()].some((value) => value === true) ||
            [...selectedFiles.values()].some((value) => value === true) ? (
              <IconButton icon={disabledTrash} />
                // onClick={displayDeleteModaleDef}
            ) : ( */}
            <IconButton icon={deftrashIcon} onClick={displayDeleteModaleDef} />
            {/* )} */}

            <ButtonBase
              style={{
                border: "1.5px solid var(--primary-hover)",
                padding: "5px",
                borderRadius: "10px",
                color: "var(--primary-hover)",
                fontWeight: "bold",
              }}
              onClick={displayRestoreModale}
            >
              Restaurer
            </ButtonBase>
          </>
        ) : (
          <IconButton
            icon={trash}
            onClick={() => displayDeleteModale("none")}
          />
        )}
      </Box>
    </Box>
  );
};

export default ToolBar;
