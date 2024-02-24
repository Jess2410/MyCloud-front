import { ChangeEvent, FC, useState } from "react";
import { Card as CardMui } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import iconFileImage from "../../assets/icons/file-img.png";
import iconFolder from "../../assets/icons/folder.png";
import iconFileAudio from "../../assets/icons/file-audio.png";
import iconFile from "../../assets/icons/file.png";
import Checkbox from "@mui/material/Checkbox";
import starChecked from "../../assets/icons/Vectorstar-checked.svg";
import starUnchecked from "../../assets/icons/Vectorstar-no-checked.svg";
import checkboxChecked from "../../assets/icons/Vectorcheckbox-checked.svg";
import checkboxUnchecked from "../../assets/icons/Vectorcheckbox-no-checked.svg";
import styles from "./card.component.module.css";

type CardProps = {
  extensionFile?: string;
  isFavorite: boolean;
  isSelected: boolean;
  id: number;
  name: string;
  date: string;
  onAddSelectedCards: (id: number) => void;
};

const Card: FC<CardProps> = ({
  extensionFile,
  isFavorite,
  isSelected,
  id,
  onAddSelectedCards,
  name,
  date,
}) => {
  const onFavorite = (event: ChangeEvent<HTMLInputElement>) => {
    isFavorite = !isFavorite;
    //TODO call API
  };

  return (
    <CardMui className={styles["card"]}>
      <CardActions className={styles["card__actions"]}>
        <Checkbox
          icon={<img src={starUnchecked} alt="Unchecked" />}
          checkedIcon={<img src={starChecked} alt="Checked" />}
          checked={isFavorite}
          onChange={onFavorite}
          inputProps={{ "aria-label": "favorite" }}
        />
        <Checkbox
          icon={<img src={checkboxUnchecked} alt="Unchecked" />}
          checkedIcon={<img src={checkboxChecked} alt="Checked" />}
          checked={isSelected}
          onChange={() => onAddSelectedCards(id)}
          inputProps={{ "aria-label": "favorite" }}
        />
      </CardActions>
      <CardMedia className={styles["card__media"]}>
        {extensionFile === "audio" ? (
          <img src={iconFileAudio} alt="audio-file-icon" />
        ) : extensionFile === "image" ? (
          <img src={iconFileImage} alt="icon" />
        ) : extensionFile === "file" ? (
          <img src={iconFile} alt="icon" />
        ) : extensionFile === "folder" ? (
          <img src={iconFolder} alt="icon" />
        ) : (
          <img src={iconFileImage} alt="icon" />
        )}
      </CardMedia>
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
          {date}
        </Typography>
      </CardContent>
    </CardMui>
  );
};

export default Card;
