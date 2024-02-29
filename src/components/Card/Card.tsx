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
import checkboxChecked from "../../assets/icons/Vectorcheckbox-checked.png";
import checkboxUnchecked from "../../assets/icons/Vectorcheckbox-no-checked.png";
import styles from "./card.component.module.css";

type CardProps = {
  extension?: string;
  isFavorite: boolean;
  isSelected?: boolean;
  id: number;
  name: string;
  creation_date: string;
  // onAddSelectedCards: (id: number) => void;
};

const Card: FC<CardProps> = ({
  extension,
  isFavorite,
  isSelected,
  id,
  // onAddSelectedCards,
  name,
  // type,
  creation_date,
}) => {
  const displayIcon = () => {
    if (extension === "mp3") {
      return <img src={iconFileAudio} alt="audio-file-icon" />;
    }
    if (extension === "png" || extension === "jpeg") {
      return <img src={iconFileImage} alt="icon" />;
    }
    // if (type === "folder") {
    //   return <img src={iconFolder} alt="icon" />;
    // }
    return <img src={iconFile} alt="icon" />;
  };

  const onFavorite = (event: ChangeEvent<HTMLInputElement>) => {
    isFavorite = !isFavorite;
    //TODO call API
  };

  return (
    <CardMui className={isSelected ? styles["card-selected"] : styles["card"]}>
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
          // onChange={() => onAddSelectedCards(id)}
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

export default Card;
