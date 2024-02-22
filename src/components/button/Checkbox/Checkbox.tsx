import { Checkbox as CheckboxMui } from "@mui/material";
import { FC, useState } from "react";

type CheckboxProps = {
  iconChecked: string;
  iconUnchecked: string;
};

const Checkbox: FC<CheckboxProps> = ({ iconChecked, iconUnchecked }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <CheckboxMui
      icon={<img src={iconUnchecked} alt="Unchecked" />}
      checkedIcon={<img src={iconChecked} alt="Checked" />}
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "favorite" }}
    />
  );
};

export default Checkbox;
