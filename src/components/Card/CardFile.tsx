import { FC } from "react";
import { Card as CardMui } from "@mui/material";
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
  isFavorite: boolean;
  allFoldersSelected?: boolean;
  id: number;
  name: string;
  creation_date: string;
  onDoubleClick: () => void;
  // onAddSelectedCards: (id: number) => void;
};

const CardFile: FC<CardProps> = ({
  extension,
  isFavorite,
  allFoldersSelected,
  id,
  onDoubleClick,
  // onAddSelectedCards,
  name,
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

  const moveToFavorites = async () => {
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPatchRequest(
        `${API_BASE_URL}/folders/isFavorite`,
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

  return (
    <>
      <CardMui
        className={
          allFoldersSelected ? styles["card-selected"] : styles["card"]
        }
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
            checked={allFoldersSelected}
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
    </>
  );
};

export default CardFile;
