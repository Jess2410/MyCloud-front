import { Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

type GenericFormProps = {
  title: string;
  children: React.ReactNode;
  spanText: string;
  linkText: string;
  href: string;
};

const GenericForm: FC<GenericFormProps> = ({
  title,
  children,
  spanText,
  linkText,
  href,
}) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          width: "100%",
          maxWidth: "400px",
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
          fontSize: ["32px", "40px"],
          fontFamily: "Poppins",
          textAlign: "right",
          color: "#E4B8FD",
          position: "relative",
          marginBottom: "1rem",
        }}
      >
        {title}
        <span
          style={{
            position: "absolute",
            right: "0px",
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
      {children}
      <Typography variant="body2">
        <span style={{ color: "#ADADA0" }}>
          {spanText}
          <Link
            to={href}
            style={{ textDecoration: "none", padding: 1, color: "#7CD2D7" }}
          >
            {linkText}
          </Link>
        </span>
      </Typography>
    </Box>
  );
};

export default GenericForm;
