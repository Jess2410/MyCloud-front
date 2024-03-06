import {
  Box,
  Breadcrumbs as BreadcrumbsMUI,
  Link,
  Typography,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

type BreadcrumbsProps = {
  link: string | undefined;
  label: string | undefined;
};
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ link, label }) => {
  const location = useLocation();
  const params = useParams();
  const pathnames = params ? (params["*"] ? params["*"].split("/") : []) : [];
  const test = location.pathname.split("/").slice(2);
  console.log(test);

  //const breadcrumbNameMap = getAllFoldersEntities();
  const breadcrumbNameMap: { [key: string]: string } = {
    "1": "Test",
    "2": "Test2",
    "3": "Test3",
    "26": "Test4",
    "27": "Test5",
    "28": "Test6",
    "29": "",
  }; //TODO get depuis le back la liste de "id de mon dossier": "Mon dossier"

  console.log(pathnames);
  console.log(`/${pathnames.slice(0, 0 + 1).join("/")}`);
  return (
    <Box sx={{ pt: 2, pb: 1 }}>
      <BreadcrumbsMUI aria-label="breadcrumb">
        <Link color="inherit" href={link}>
          {label}
        </Link>
        {pathnames &&
          pathnames.map((value, index) => {
            // if (index == 0 || index == 1) return;
            const last = index === pathnames.length - 1;
            // const to = `${pathnames.slice(0, index + 1)}`;
            //TODO faire marcher le href en dessous ou virer le Link pour garder qu'une typo
            return last ? (
              <Typography color="text.primary" key={value}>
                {breadcrumbNameMap[value]}
              </Typography>
            ) : (
              <Link color="inherit" key={value}>
                {breadcrumbNameMap[value]}
              </Link>
            );
          })}
      </BreadcrumbsMUI>
    </Box>
  );
};

export default Breadcrumbs;
