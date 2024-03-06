import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs as BreadcrumbsMUI, Link } from "@mui/material";
import { useLocation, useParams, Link as RouterLink } from "react-router-dom";
import { sendGetRequest } from "../../utils/data";
import { API_BASE_URL } from "../../constants/url";
import { arraysAreEqual } from "../../utils/array";

type BreadcrumbsProps = {
  link: string;
  label: string | undefined;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ link, label }) => {
  const location = useLocation();
  const params = useParams();

  const pathnames = params ? (params["*"] ? params["*"].split("/") : []) : [];
  const [listNamesFolders, setListNamesFolders] = useState<string[]>([]);

  const [navigationItems, setNavigationItems] = useState<string[]>([]);

  const getFoldersAndFilesByParentId = async () => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(`${API_BASE_URL}/folders/names`, {
        Authorization: `Bearer ${token}`,
      });
      if (!arraysAreEqual(listNamesFolders, response)) {
        setListNamesFolders(response);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getFoldersAndFilesByParentId();
  }, [location.pathname]);

  useEffect(() => {
    const clickedFolderId = pathnames[pathnames.length - 1];
    const clickedFolderName = listNamesFolders[Number(clickedFolderId)];
    if (clickedFolderName) {
      setNavigationItems((prevNavigationItems) => {
        const index = prevNavigationItems.indexOf(clickedFolderName);
        if (index !== -1) {
          return prevNavigationItems.slice(0, index + 1);
        } else {
          return [...prevNavigationItems, clickedFolderName];
        }
      });
    }
  }, [location.pathname]);

  function findKeyByValue(value: any) {
    for (const key in listNamesFolders) {
      if (listNamesFolders[key] === value) {
        return key.toString();
      }
    }
    return null;
  }

  return (
    <Box sx={{ pt: 2, pb: 1 }}>
      <BreadcrumbsMUI aria-label="breadcrumb">
        <Link
          color="inherit"
          component={RouterLink}
          to={link}
          onClick={() => setNavigationItems([])}
        >
          {label}
        </Link>
        {navigationItems.map((value, index) => {
          const key = findKeyByValue(value);
          const path = navigationItems
            .slice(0, index + 1)
            .map((val) => findKeyByValue(val))
            .join("/");
          return (
            <Link
              color="inherit"
              key={index}
              component={RouterLink}
              to={`${path}`}
            >
              {value}
            </Link>
          );
        })}
      </BreadcrumbsMUI>
    </Box>
  );
};

export default Breadcrumbs;
