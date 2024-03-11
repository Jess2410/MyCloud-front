import { FC, useState, useEffect, ChangeEvent, MouseEventHandler } from "react";
import { Card as CardMui, Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import iconFileImage from "../../assets/icons/file-img.png";
import iconFileAudio from "../../assets/icons/file-audio.png";
import iconFile from "../../assets/icons/file.png";
import Checkbox from "@mui/material/Checkbox";
import starChecked from "../../assets/icons/Vectorstar-checked.svg";
import starUnchecked from "../../assets/icons/Vectorstar-no-checked.svg";
import checkboxChecked from "../../assets/icons/Vectorcheckbox-checked.png";
import checkboxUnchecked from "../../assets/icons/Vectorcheckbox-no-checked.png";
import styles from "./card.component.module.css";
import IconButton from "../IconButton/IconButton";
import edit from "../../assets/icons/edit.png";

type CardProps = {
  extension?: string;
  onSelectFile: (fileId: number, isFileSelected: boolean) => void;
  isFavorite: boolean;
  isSelected?: boolean;
  id: number;
  name: string;
  creation_date: string;
  onDoubleClick: () => void;
  handleMoveToFavoritesChange: () => void;
  displayMoveFileForm?: any;
  displayEditFileForm?: any;
};

const CardFile: FC<CardProps> = ({
  extension,
  onSelectFile,
  isFavorite,
  isSelected,
  id,
  onDoubleClick,
  displayMoveFileForm,
  name,
  creation_date,
  handleMoveToFavoritesChange,
  displayEditFileForm,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(isSelected ?? false);

  const displayIcon = () => {
    if (extension === "mp3") {
      return <img src={iconFileAudio} alt="audio-file-icon" />;
    }
    if (extension === "png" || extension === "jpeg") {
      return <img src={iconFileImage} alt="icon" />;
    }
    return <img src={iconFile} alt="icon" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSelect = (
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIsChecked(checked);
    onSelectFile(id, checked);
  };

  const handleRightClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    displayMoveFileForm();
  };

  useEffect(() => {
    if (isSelected !== undefined) setIsChecked(isSelected);
  }, [isSelected]);

  return (
    <Box onContextMenu={handleRightClick} style={{ position: "relative" }}>
      <CardMui
        className={isSelected ? styles["card-selected"] : styles["card"]}
        onDoubleClick={onDoubleClick}
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
            checked={isChecked}
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
          <Box
            sx={{
              position: "absolute",
              right: 10,
              bottom: 40,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton icon={edit} onClick={displayEditFileForm} />
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles["card__date"]}
          >
            {formatDate(creation_date)}
          </Typography>
        </CardContent>
      </CardMui>
    </Box>
  );
};

export default CardFile;
