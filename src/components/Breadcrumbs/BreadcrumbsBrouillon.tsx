// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Breadcrumbs as BreadcrumbsMUI,
//   Link,
//   Typography,
// } from "@mui/material";
// import { useLocation, useParams, Link as RouterLink } from "react-router-dom";
// import { sendGetRequest } from "../../utils/data";
// import { API_BASE_URL } from "../../constants/url";
// import { arraysAreEqual } from "../../utils/array";

// type BreadcrumbsProps = {
//   link: string;
//   label: string;
// };

// const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ link, label }) => {
//   const location = useLocation();
//   const params = useParams();
//   const pathnames = params ? (params["*"] ? params["*"].split("/") : []) : [];
//   const [listNamesFolders, setListNamesFolders] = useState<string[]>([]);
//   const [navigationItems, setNavigationItems] = useState<string[]>([
//     location.pathname,
//   ]);

//   const getFoldersAndFilesByParentId = async () => {
//     try {
//       const token = localStorage.getItem("@userToken");
//       const response = await sendGetRequest(`${API_BASE_URL}/folders/names`, {
//         Authorization: `Bearer ${token}`,
//       });
//       if (!arraysAreEqual(listNamesFolders, response)) {
//         setListNamesFolders(response);
//       }
//     } catch (error) {
//       console.log("error");
//     }
//   };

//   useEffect(() => {
//     getFoldersAndFilesByParentId();
//   }, [location.pathname]);

//   useEffect(() => {
//     setNavigationItems((prevNavigationItems) => [
//       ...prevNavigationItems,
//       location.pathname,
//     ]);
//   }, [location.pathname]);

//   return (
//     <Box sx={{ pt: 2, pb: 1 }}>
//       <BreadcrumbsMUI aria-label="breadcrumb">
//         <Link color="inherit" component={RouterLink} to={link}>
//           {label}
//         </Link>
//         {pathnames.map((value, index) => {
//           const folderName = listNamesFolders[Number(value)];
//           const isLast = index === pathnames.length - 1;
//           const to =
//             index === 0
//               ? `/${value}`
//               : `${location.pathname
//                   .split("/")
//                   .slice(0, index + 2)
//                   .join("/")}`;
//           return isLast ? (
//             <Typography color="text.primary" key={value}>
//               {folderName}
//             </Typography>
//           ) : (
//             <Link key={value} color="inherit" component={RouterLink} to={to}>
//               {folderName}
//             </Link>
//           );
//         })}
//       </BreadcrumbsMUI>
//     </Box>
//   );
// };

// export default Breadcrumbs;
