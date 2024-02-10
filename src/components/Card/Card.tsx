import { Card as CardMui } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
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

import { useState } from "react";
const Card = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <CardMui className={styles["card"]}>
      <CardActions className={styles["card__actions"]}>
        <Checkbox
          icon={<img src={starUnchecked} alt="Unchecked" />}
          checkedIcon={<img src={starChecked} alt="Checked" />}
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "favorite" }}
        />
        <Checkbox
          icon={<img src={checkboxUnchecked} alt="Unchecked" />}
          checkedIcon={<img src={checkboxChecked} alt="Checked" />}
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "favorite" }}
        />
      </CardActions>
      <img src={iconFileImage} alt="icon" />
      <CardContent className={styles["card__content"]}>
        <Typography
          gutterBottom
          component="div"
          className={styles["card__title"]}
        >
          Nom du dossier
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles["card__date"]}
        >
          Date
        </Typography>
      </CardContent>
    </CardMui>
  );
};
export default Card;
