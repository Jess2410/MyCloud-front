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
import { toast } from "react-toastify";
import { sendPatchRequest } from "../../utils/data";
import { API_BASE_URL } from "../../constants/url";

type CardProps = {
  extension?: string;
  onSelectFile: (fileId: number, isFileSelected: boolean) => void;
  isFavorite: boolean;
  isSelected?: boolean;
  id: number;
  name: string;
  creation_date: string;
  onDoubleClick: () => void;
  // onAddSelectedCards: (id: number) => void;
  handleMoveToFavoritesChange: () => void;
  displayMoveFileForm?: any;
};

const CardFile: FC<CardProps> = ({
  extension,
  onSelectFile,
  isFavorite,
  isSelected,
  id,
  onDoubleClick,
  displayMoveFileForm,
  // onAddSelectedCards,
  name,
  creation_date,
  handleMoveToFavoritesChange,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(isSelected ?? false);

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

  const moveToFavorites = async () => {
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPatchRequest(
        `${API_BASE_URL}/files/isFavorite`,
        { Authorization: `Bearer ${token}` },
        { id: id }
      );
      if (response.status === 200) {
        toast.update(loader, {
          render: response.message,
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
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
    console.log("Clic droit détecté sur la carte!", id);
  };

  useEffect(() => {
    if (isSelected !== undefined) setIsChecked(isSelected);
  }, [isSelected]);

  return (
    <Box onContextMenu={handleRightClick}>
      <CardMui
        className={isSelected ? styles["card-selected"] : styles["card"]}
        onDoubleClick={onDoubleClick}
      >
        <CardActions className={styles["card__actions"]}>
          <Checkbox
            icon={<img src={starUnchecked} alt="Unchecked" />}
            checkedIcon={<img src={starChecked} alt="Checked" />}
            checked={isFavorite}
            onChange={moveToFavorites}
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
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles["card__date"]}
          >
            {creation_date}
          </Typography>
        </CardContent>
      </CardMui>
    </Box>
  );
};

export default CardFile;
