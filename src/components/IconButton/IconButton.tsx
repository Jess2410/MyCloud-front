import { IconButton as IconButtonMui } from "@mui/material";

const IconButton = ({ icon, onClick }: any) => {
  return (
    <IconButtonMui onClick={onClick}>
      <img src={icon} />
    </IconButtonMui>
  );
};

export default IconButton;
