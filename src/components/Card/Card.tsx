import { FC, useState } from "react";
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
  name: string;
  date: string;
};

const Card: FC<CardProps> = ({
  extensionFile,
  name = "Nom du Fichier",
  date = "Date",
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const onSelect = () => {
    setIsSelected(!isSelected);
  };
  const onFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <CardMui className={styles["card"]}>
      <CardActions className={styles["card__actions"]}>
        <Checkbox
          icon={<img src={starUnchecked} alt="Unchecked" />}
          checkedIcon={<img src={starChecked} alt="Checked" />}
          checked={isSelected}
          onChange={onSelect}
          inputProps={{ "aria-label": "favorite" }}
        />
        <Checkbox
          icon={<img src={checkboxUnchecked} alt="Unchecked" />}
          checkedIcon={<img src={checkboxChecked} alt="Checked" />}
          checked={isFavorite}
          onChange={onFavorite}
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
