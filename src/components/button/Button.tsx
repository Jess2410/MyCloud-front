import clsx from "clsx";
import styles from "./button.component.module.css";
import { Button as ButtonMuiBase } from "@mui/base/Button";

export interface ButtonProps
  extends Pick<
    React.HTMLAttributes<HTMLButtonElement>,
    "className" | "style" | "onClick"
  > {
  disabled?: boolean;
  label: string;
  variant: "contained" | "outlined";
}

const Button: React.FC<ButtonProps> = ({ label, variant, disabled }) => {
  const customButtonClassname = clsx(styles["button"], {
    [styles["button--outlined"]]: variant === "outlined",
  });

  return (
    <ButtonMuiBase
      variant={variant}
      disabled={disabled}
      className={customButtonClassname}
    >
      {label}
    </ButtonMuiBase>
  );
};

export default Button;
