import {
  Box,
  Breadcrumbs as BreadcrumbsMUI,
  Link,
  Typography,
} from "@mui/material";

type BreadcrumbsProps = {
  link: string | undefined;
  label: string | undefined;
  newLabel: string | undefined;
};
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ link, label, newLabel }) => {
  return (
    <Box sx={{ pt: 2, pb: 1 }}>
      <BreadcrumbsMUI aria-label="breadcrumb">
        <Link color="inherit" href={link}>
          {label}
        </Link>
        {newLabel && <Typography color="textPrimary">{newLabel}</Typography>}
      </BreadcrumbsMUI>
    </Box>
  );
};

export default Breadcrumbs;
