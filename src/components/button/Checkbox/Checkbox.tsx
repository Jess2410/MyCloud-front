import { Checkbox as CheckboxMui } from "@mui/material";
import { FC, useEffect, useState } from "react";

type CheckboxProps = {
  iconChecked: string;
  iconUnchecked: string;
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
};

const Checkbox: FC<CheckboxProps> = ({
  iconChecked,
  iconUnchecked,
  onChange,
  isChecked,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(event.target.checked);
  };

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

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
