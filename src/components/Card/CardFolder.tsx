import {
  ChangeEvent,
  // Dispatch,  SetStateAction,
  FC,
  useEffect,
  useState,
} from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendPatchRequest } from "../../utils/data";
import { API_BASE_URL } from "../../constants/url";

type CardFolderProps = {
  isFavorite: boolean;
  onSelectFolder: (folderId: number, isFolderSelected: boolean) => void;
  isSelected?: boolean;
  id: number;
  name: string;
  creation_date: string;
};

const CardFolder: FC<CardFolderProps> = ({
  isFavorite,
  onSelectFolder,
  isSelected,
  id,
  name,
  creation_date,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isChecked, setIsChecked] = useState<boolean>(isSelected ?? false);

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

  const handleMoveToFavoritesChange = () => {
    if (moveToFavorites) {
      moveToFavorites();
    }
  };

  const handleSelect = (
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIsChecked(checked);
    onSelectFolder(id, checked);
  };

  const displayIcon = () => {
    return <img src={iconFolder} alt="icon" />;
  };

  const handleDoubleClick = () => {
    console.log(id);
    navigate(`${pathname}/${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (isSelected !== undefined) setIsChecked(isSelected);
  }, [isSelected]);

  return (
    <CardMui
      className={isChecked ? styles["card-selected"] : styles["card"]}
      onDoubleClick={handleDoubleClick}
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
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles["card__date"]}
        >
          {formatDate(creation_date)}
        </Typography>
      </CardContent>
    </CardMui>
  );
};

export default CardFolder;
