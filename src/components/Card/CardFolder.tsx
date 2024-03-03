import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { Card as CardMui } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import iconFolder from "../../assets/icons/folder.png";
import Checkbox from "@mui/material/Checkbox";
import starChecked from "../../assets/icons/Vectorstar-checked.svg";
import starUnchecked from "../../assets/icons/Vectorstar-no-checked.svg";
import checkboxChecked from "../../assets/icons/Vectorcheckbox-checked.png";
import checkboxUnchecked from "../../assets/icons/Vectorcheckbox-no-checked.png";
import styles from "./card.component.module.css";

type CardFolderProps = {
  isFavorite: boolean;
  isFolderSelected: boolean;
  onSelectFolder: (folderId: number, isFolderSelected: boolean) => void;
  handleSelectFolder: () => void;
  setIsFolderSelected: Dispatch<SetStateAction<boolean>>;
  moveToFavorites: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => Promise<void>;
  allFoldersSelected: boolean;
  id: number;
  name: string;
  creation_date: string;
  setAllFoldersSelected: () => void;
  // handleFolderDoubleClick: (id: number) => void;
  // onAddSelectedCards: (id: number) => void;
};

const CardFolder: FC<CardFolderProps> = ({
  isFavorite,
  isFolderSelected,
  onSelectFolder,
  handleSelectFolder,
  setIsFolderSelected,
  moveToFavorites,
  allFoldersSelected,
  setAllFoldersSelected,
  id,
  // onAddSelectedCards,
  name,
  // type,
  creation_date,
}) => {
  const handleMoveToFavoritesChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    moveToFavorites(event, id);
  };

  const handleSelect = () => {
    onSelectFolder(id, !isFolderSelected);
  };

  const displayIcon = () => {
    return <img src={iconFolder} alt="icon" />;
  };

  return (
    <CardMui
      className={allFoldersSelected ? styles["card-selected"] : styles["card"]}
    >
      <CardActions className={styles["card__actions"]}>
        <Checkbox
          icon={<img src={starUnchecked} alt="Unchecked" />}
          checkedIcon={<img src={starChecked} alt="Checked" />}
          checked={isFavorite}
          onChange={handleMoveToFavoritesChange}
          inputProps={{ "aria-label": "favorite" }}
        />
        <Checkbox
          icon={<img src={checkboxUnchecked} alt="Unchecked" />}
          checkedIcon={<img src={checkboxChecked} alt="Checked" />}
          checked={isFolderSelected}
          onChange={handleSelect}
          inputProps={{ "aria-label": "selected" }}
        />
      </CardActions>
      <CardMedia className={styles["card__media"]}>{displayIcon()}</CardMedia>
      <CardContent className={styles["card__content"]}>
        <Typography
          gutterBottom
          component="div"
          className={styles["card__title"]}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles["card__date"]}
        >
          {creation_date}
        </Typography>
      </CardContent>
    </CardMui>
  );
};

export default CardFolder;
