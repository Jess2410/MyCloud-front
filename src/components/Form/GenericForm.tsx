import Box from "@mui/material/Box";
import Input from "./Input";
import Button from "../Button/Button";
import { Link, Typography } from "@mui/material";
import { FC } from "react";

type InputConfig = {
  label: string;
  password?: boolean;
};

type GenericFormProps = {
  title: string;
  inputs: InputConfig[];
  buttonText: string;
  spanText: string;
  linkText: string;
};
const GenericForm: FC<GenericFormProps> = ({
  title,
  inputs,
  buttonText,
  spanText,
  linkText,
}) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 1,
          width: "400px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Poppins",
          position: "relative",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        component="h2"
        sx={{
          fontSize: "40px",
          fontFamily: "Poppins",
          textAlign: "right",
          color: "#E4B8FD",
          position: "relative",
        }}
      >
        {title}
        <span
          style={{
            position: "absolute",
            left: "-100vw",
            bottom: "-16px",
            width: "calc(100vw + 400px)",
            height: "18px",
            backgroundColor: "#E4B8FD",
            borderRadius: "0 23px 23px 0",
            content: '""',
          }}
        />
      </Typography>
      <br />
      {inputs.map((input, index) => (
        <Input key={index} label={input.label} password={input.password} />
      ))}
      <Box sx={{ padding: "24px 0" }}>
        <Button
          label={buttonText}
          variant="contained"
          style={{ flexGrow: 1 }}
        />
      </Box>
      <Typography variant="body2">
        <span style={{ color: "#ADADA0" }}>
          {spanText}
          <Link sx={{ textDecoration: "none", padding: 1, color: "#7CD2D7" }}>
            {linkText}
          </Link>
        </span>
      </Typography>
    </Box>
  );
};

export default GenericForm;
