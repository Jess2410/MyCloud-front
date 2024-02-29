import Grid from "@mui/material/Grid";

import trashIcon from "../../../assets/icons/trash-drawer.svg";
import starIcon from "../../../assets/icons/star-drawer.svg";
import fileIcon from "../../../assets/icons/file-drawer.svg";
import { useContext, useState } from "react";
import { Box } from "@mui/material";
import { mockDataCloud } from "./mockDataCloud";
import { UserContext } from "../../../context/UserContext";
import DeleteDialog from "../../../components/Dialog/DeleteDialog.component";
import FormDialog from "../../../components/Dialog/FormDialog.component";
import MyCloudTab from "../../../components/Tabs/MyCloudTab.component";
import ToolBar from "../../../components/Tabs/ToolBar.component";

export const tabsList = [
  {
    name: "Mon Cloud",
    key: 1,
    icon: fileIcon,
    url: "/dashboard-cloud",
  },
  {
    name: "Mes favoris",
    key: 2,
    icon: starIcon,
    url: "/dashboard-favorites",
  },
  {
    name: "Corbeille",
    key: 3,
    icon: trashIcon,
    url: "/dashboard-trash",
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

export default function DashboardCloudView() {
  const [showForm, setShowForm] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  const userContext = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionType, setActionType] = useState("");

  const displayForm = (type: string) => {
    setShowForm(!showForm);
    setTypeForm(type);
  }; //TODO sortir dans un composant a part car réutilisés sur les 3 pages (peu etre directement dan sla toolbar en fait)

  const displayDeleteModale = (actionType: string | null | undefined) => {
    setShowDeleteModal(!showDeleteModal);
    if (actionType) {
      setActionType(actionType);
    }
  };
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
    >
      <ToolBar
        // handleSelectAllCards={}
        displayForm={displayForm}
        displayDeleteModale={displayDeleteModale}
        def={true}
        restore={true}
        isTrash={false}
      />
      <Grid>
        <Box
          sx={{
            // pt: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <MyCloudTab cloudData={mockDataCloud} />
          {/* TODO Les 3 tabs se servent à rien je pense, meme cdoe dans les 3 remettre directement le code ici dans les 3 pages ou fair eun composant "CardList" réutilsié dans les 3 */}
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
}
