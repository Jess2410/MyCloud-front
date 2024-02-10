import {
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import styles from "./searchBar.component.module.css";

export default function SearchBar() {
  const filterTypes = ["Document", "Image", "Audio", "Tout"];
  const [filter, setFilter] = useState<string[]>([]);

  const handleChange = (e: SelectChangeEvent<typeof filter>) => {
    setFilter(
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value
    );
  };
  return (
    <div className={styles["search-bar_wrapper"]}>
      <TextField
        label="Rechercher"
        variant="outlined"
        id="search-bar_input"
        type="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControl sx={{ m: 1, width: 100 }}>
        <InputLabel id="search-bar_select">Filtrer</InputLabel>
        <Select
          sx={{ outline: "none", border: "none" }}
          labelId="search-bar_select"
          id="search-bar_select"
          multiple
          value={filter}
          onChange={handleChange}
          input={<OutlinedInput label="search-bar_select" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {filterTypes.map((filterType, index) => (
            <MenuItem key={index} value={filterType}>
              <Checkbox checked={filter.indexOf(filterType) > -1} />
              <ListItemText primary={filterType} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
