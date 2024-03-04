import { Box, ButtonBase, Typography } from "@mui/material";
import IconButton from "../IconButton/IconButton";
import SearchWithFilter from "../SearchBarFilter/SearchBarFilter.component";

import addFile from "../../assets/icons/add-file-icon.png";
import addFolder from "../../assets/icons/add-folder-icon.png";
import checkBox from "../../assets/icons/checkbox.png";
import checkBoxNoChecked from "../../assets/icons/checkbox-checked-tool.png";
import deftrashIcon from "../../assets/icons/trash-definitive-icon.png";
import React from "react";

type ToolBarProps = {
  //   handleSelectAllCards: () => void;

  displayForm: (type: string) => void;
  allCheckboxesChecked?: boolean;
  displayDeleteModale: (actionType?: string | null | undefined) => void;
  def: boolean;
  restore: boolean;
};
const ToolBarCloud: React.FC<ToolBarProps> = ({
  //   handleSelectAllCards,
  allCheckboxesChecked,
  displayForm,
  displayDeleteModale,
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
        <IconButton icon={addFolder} onClick={() => displayForm("folder")} />
        <IconButton icon={addFile} onClick={() => displayForm("file")} />
      </Box>
      {/* <SearchWithFilter /> */}
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
          //   onClick={() => onSelected()}
          //   onClick={() => handleSelectAllCards()}
        >
          {allCheckboxesChecked ? (
            <IconButton icon={checkBoxNoChecked} />
          ) : (
            <IconButton icon={checkBox} />
          )}
        </Box>
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
      </Box>
    </Box>
  );
};

export default ToolBarCloud;
