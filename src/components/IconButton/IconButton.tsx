import { IconButton as IconButtonMui } from "@mui/material";

const IconButton = ({ icon }: any) => {
  return (
    <IconButtonMui>
      <img src={icon} />
    </IconButtonMui>
  );
};

export default IconButton;
