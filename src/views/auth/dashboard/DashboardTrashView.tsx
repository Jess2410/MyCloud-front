import Grid from "@mui/material/Grid";

import { useContext, useState } from "react";
import { Box } from "@mui/material";
import { UserContext } from "../../../context/UserContext";
import { mockDataTrash } from "./mockDataTrash";
import TrashTab from "../../../components/Tabs/TrashTab.component";
import FormDialog from "../../../components/Dialog/FormDialog.component";
import DeleteDialog from "../../../components/Dialog/DeleteDialog.component";
import ToolBar from "../../../components/Tabs/ToolBar.component";

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

export default function DashboardTrashView() {
  const [showForm, setShowForm] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  const userContext = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionType, setActionType] = useState("");

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
      sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
    >
      <ToolBar
        // handleSelectAllCards={}
        displayForm={displayForm}
        displayDeleteModale={displayDeleteModale}
        def={true}
        restore={true}
        isTrash={true}
      />
      <Grid>
        <Box
          sx={{
            pt: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <TrashTab cloudData={mockDataTrash} />
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
