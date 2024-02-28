import { useState } from "react";
import styled from "@emotion/styled";
import InputBase from "@mui/material/InputBase";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
const SearchInput = styled(InputBase)`
  flex: 1;
  margin-left: 1;
  padding: 4px 0;
`;

const FilterButton = styled(IconButton)`
  padding: 0 8px;
`;

const SearchWithFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        border: "1px solid var(--primary-hover)",
        px: 2,
        my: 1,
        borderRadius: "50px",
        display: "flex",
        whiteSpace: "nowrap",
        flexGrow: 1,
        maxWidth: "500px",
        justifyContent: "space-between",
      }}
    >
      <SearchInput
        placeholder="Recherche..."
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton>
        <SearchIcon />
      </IconButton>
      <FilterButton onClick={handleOpenMenu} aria-label="filter">
        <Typography
          sx={{
            color: "var(--primary-hover)",
            fontWeight: 600,
            pl: 1,
            borderLeft: "1px solid var(--primary-hover)",
          }}
        >
          Filtrer
        </Typography>
      </FilterButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Par nom : A - Z</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Par nom : Z - A</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Par date : Plus récent</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Par date : Plus ancien</MenuItem>
      </Menu>
    </Box>
  );
};

export default SearchWithFilter;
