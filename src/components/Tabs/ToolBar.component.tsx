import { Box, ButtonBase, Typography } from "@mui/material";
import IconButton from "../IconButton/IconButton";
import SearchWithFilter from "../SearchBarFilter/SearchBarFilter.component";

import addFile from "../../assets/icons/add-file-icon.png";
import addFolder from "../../assets/icons/add-folder-icon.png";
import trash from "../../assets/icons/trash-icon.png";
import checkBox from "../../assets/icons/checkbox.png";
import checkBoxNoChecked from "../../assets/icons/checkbox-checked-tool.png";
import deftrashIcon from "../../assets/icons/trash-definitive-icon.png";
import React from "react";

type ToolBarProps = {
  handleSelectAllCards: () => void;
  tabActive?: number;
  allCheckboxesChecked?: boolean;
  isTrash: boolean;
  displayDeleteModale: (actionType?: string | null | undefined) => void;
  def: boolean;
  restore: boolean;
  allFoldersSelected: boolean;
  handleSearchInputChange?: (event: any) => void;
  searchValue: string;
  setShowFormFolder: any;
  setShowFormFile: () => void;
};
const ToolBar: React.FC<ToolBarProps> = ({
  setShowFormFolder,
  setShowFormFile,
  handleSelectAllCards,
  allFoldersSelected,
  displayDeleteModale,
  isTrash = false,
  handleSearchInputChange,
  searchValue,
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
        <Box
          sx={{
            borderRight: "1px solid var(--primary)",
          }}
          onClick={handleSelectAllCards}
          // onClick={() => handleSelectAllCards()}
        >
          {allFoldersSelected ? (
            <IconButton icon={checkBoxNoChecked} />
          ) : (
            <IconButton icon={checkBox} />
          )}
        </Box>
        {isTrash ? (
          <>
            <IconButton
              icon={deftrashIcon}
              onClick={() => displayDeleteModale("def")}
            />
            <ButtonBase
              style={{
                border: "1.5px solid var(--primary-hover)",
                padding: "5px",
                borderRadius: "10px",
                color: "var(--primary-hover)",
                fontWeight: "bold",
              }}
              onClick={() => displayDeleteModale("restore")}
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
