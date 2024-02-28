import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import trashIcon from "../../../assets/icons/trash-drawer.svg";
import deftrashIcon from "../../../assets/icons/trash-definitive-icon.png";
import starIcon from "../../../assets/icons/star-drawer.svg";
import fileIcon from "../../../assets/icons/file-drawer.svg";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, ButtonBase } from "@mui/material";
import DashboardDrawer from "../../../components/Drawer/DashboardDrawer.component";
// import Button from "../../../components/Button/Button";
// import IconButton from "../../../components/IconButton/IconButton";
// import SearchWithFilter from "../../../components/SearchBarFilter/SearchBarFilter.component";
// import { UserContext } from "../../../context/UserContext";
// import { toast } from "react-toastify";
// import { DEV_DOMAIN } from "../../../constants/url";
// import { sendGetRequest, sendPostRequest } from "../../../utils/data";
// import FormDialog from "../../../components/Dialog/FormDialog.component";
// import Card from "../../../components/Card/Card";
import { mockData } from "./mockData";
import { UserContext } from "../../../context/UserContext";
import DashboardMain from "../../../components/Tabs/DashboardMain.component";

const tabsList = [
  {
    name: "Mon Cloud",
    key: 1,
    icon: fileIcon,
  },
  {
    name: "Mes favoris",
    key: 2,
    icon: starIcon,
  },
  {
    name: "Corbeille",
    key: 3,
    icon: trashIcon,
  },
];

export type CloudData = {
  id: number;
  type: string;
  name: string;
  isTrash: boolean;
  isFavorite: boolean;
  extension?: string;
  url?: string;
  size?: number;
  creation_date: string;
  owner_id?: number;
  folder_id?: number;
  parent_folder_id?: number;
};

export default function DashboardView() {
  // const userContext = useContext(UserContext);
  // const navigate = useNavigate();
  const [tabActive, setTabActive] = useState<number>(1);

  // const [newName, setNewName] = useState("");
  // const [name, setName] = useState("");
  const [cloudData, setCloudData] = useState<CloudData[]>([]);

  //TODO RENAME A FOLDER OR A FILE
  // const renameFolderOrFile = (id, type, e) => {
  //   e.preventDefault();
  //   setNewName(e.target.value);
  //   Patch name in DB
  // };

  // const handleSelectAllCards = () => {
  //   setAllCardsSelected(!allCardsSelected);
  //   setAllCheckboxesChecked(!allCheckboxesChecked);
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setName(e.target.value);
  // };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const loader = toast.loading("Veuillez patienter...");
  //   try {
  //     const response = await sendPostRequest(
  //       `${DEV_DOMAIN}/folder`,
  //       undefined,
  //       { name }
  //     );
  //     if (response.status === 201) {
  //       toast.update(loader, {
  //         render: "Le dossier a bien été créé !",
  //         type: "success",
  //         autoClose: 2000,
  //         isLoading: false,
  //       });
  //       navigate("/dashboard");
  //       return;
  //     }
  //     toast.update(loader, {
  //       render: `Une erreur est survenue : ${response.message}.`,
  //       type: "error",
  //       autoClose: 2000,
  //       isLoading: false,
  //     });
  //     throw new Error(response.message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const getCloudData = async () => {
      try {
        // const getFolders = await sendGetRequest(`${DEV_DOMAIN}/folders`);
        // const getFiles = await sendGetRequest(`${DEV_DOMAIN}/files`);
        // const [files, folders] = await Promise.all([getFolders, getFiles]);
        setCloudData(mockData);
      } catch (error) {
        console.log(error);
      }
    };
    getCloudData();
  }, []);

  // useEffect(() => {
  //   let newArray: number[] = [];
  //   if (allCardsSelected) {
  //     cloudData.forEach((data) => newArray.push(data.id));

  //     setIdCardsSelected(newArray);
  //   } else {
  //     setIdCardsSelected([]);
  //   }
  // }, [allCardsSelected]);

  // useEffect(() => {
  //   if (idCardsSelected.length !== cloudData.length) {
  //     setAllCardsSelected(false);
  //   }
  // }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100vh", px: 6 }}
    >
      <CssBaseline />
      <Toolbar />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <DashboardDrawer tabsList={tabsList} setTabActive={setTabActive} />
        <DashboardMain tabActive={tabActive} />
      </Box>
    </Box>
  );
}
