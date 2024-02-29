import { Box, Grid } from "@mui/material";

import DashboardHeader from "./DashboardHeader.component";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
// import { sendPostRequest } from "../../utils/data";
// import { DEV_DOMAIN } from "../../constants/url";
import useLogout from "./hooks/useLogout";
import FormDialog from "../Dialog/FormDialog.component";
import FavoritesTab from "./FavoritesTab.component";
import TrashTab from "./TrashTab.component";
import MyCloudTab from "./MyCloudTab.component";
import ToolBar from "./ToolBar.component";
import DeleteDialog from "../Dialog/DeleteDialog.component";

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

type DashboardMainProps = {
  tabActive: number;
  showForm?: boolean;
  typeForm?: string;
  setShowForm?: (value: boolean) => void;
  data: CloudData[];
};
const DashboardMain: React.FC<DashboardMainProps> = ({
  tabActive,
  //   showForm,
  //   typeForm,
  //   setShowForm,
  data,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  const userContext = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [allCardsSelectedCloud, setAllCardsSelectedCloud] = useState([]);
  const logout = useLogout();

  const getUserName = () => {
    if (userContext?.user) {
      const { firstname, lastname } = userContext.user;
      return `${firstname} ${lastname}`;
    }
    return "stranger";
  };

  // const onSelectedCardsCloud = () => {
  //   setAllCardsSelectedCloud(data.map((d)=>d.id))
  // };
  const displayForm = (type: string) => {
    setShowForm(!showForm);
    setTypeForm(type);
  };

  const displayDeleteModale = (actionType: string | null | undefined) => {
    setShowDeleteModal(!showDeleteModal);
    if (actionType) {
      setActionType(actionType);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        px: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DashboardHeader onLogout={logout} username={getUserName()} />
      <ToolBar
        tabActive={tabActive}
        // handleSelectAllCards={}
        displayForm={displayForm}
        displayDeleteModale={displayDeleteModale}
        def={true}
        restore={true}
      />
      <Grid sx={{ px: 4 }}>
        <Box
          sx={{
            pt: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {tabActive === 1 ? (
            <MyCloudTab cloudData={data} />
          ) : tabActive === 2 ? (
            <FavoritesTab cloudData={data} />
          ) : tabActive === 3 ? (
            <TrashTab cloudData={data} />
          ) : null}
          {showForm && (
            <FormDialog
              handleClose={() => setShowForm(false)}
              title={
                typeForm === "folder" ? "Nouveau dossier" : "Nouveau fichier"
              }
            />
          )}
          {showDeleteModal && (
            <DeleteDialog
              handleClose={() => setShowDeleteModal(false)}
              actionType={actionType}
            />
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default DashboardMain;
//TODO unused
