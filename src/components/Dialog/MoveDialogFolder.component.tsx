import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { API_BASE_URL } from "../../constants/url";
import { sendPatchRequest, sendPostRequest } from "../../utils/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FolderData } from "../../views/auth/dashboard/DashboardCloudView";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type MoveDialogProps = {
  handleClose: () => void;
  // setFolders: React.Dispatch<React.SetStateAction<FolderData[]>>;
  folders: any;
  folderToMove?: number;
};

export default function MoveDialogFolder({
  handleClose,
  folders,
  folderToMove,
}: // setFolders,
MoveDialogProps) {
  const [newLocation, setNewLocation] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setNewLocation(event.target.value as string);
  };
  const moveFolder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const parent_folder_id = formJson.parent_folder_id;
    const loader = toast.loading("Veuillez patienter...");

    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPatchRequest(
        `${API_BASE_URL}/folders/move`,
        { Authorization: `Bearer ${token}` },
        {
          id: folderToMove,
          parent_folder_id: parent_folder_id,
        }
      );
      if (response.status === 200) {
        toast.update(loader, {
          render: "Dossier déplacé avec succès !",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });

        handleClose();
        // setFolders((prev) => [...prev, response[0]]);
        return;
      }
      toast.update(loader, {
        render: `Une erreur est survenue : ${response.message}.`,
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
      handleClose();
      throw new Error(response.message);
    } catch (error) {
      handleClose();
      console.log(error);
    }
  };

  // const handleSubmitFolder = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const formJson = Object.fromEntries((formData as any).entries());
  //   const nameFolder = formJson.name;
  //   handleClose();
  // };

  return (
    <>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: moveFolder,
        }}
      >
        <DialogTitle>Nouvel emplacement</DialogTitle>
        <DialogContent>
          {/* <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nom"
            type="text"
            fullWidth
            variant="standard"
          /> */}
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Emplacement</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newLocation}
                label="Nouvel emplacement"
                onChange={handleChange}
                name="parent_folder_id"
              >
                <MenuItem value={undefined}>Racine</MenuItem>
                {folders.map(
                  (folder: FolderData) =>
                    folder.id !== folderToMove && (
                      <MenuItem value={folder.id}>{folder.name}</MenuItem>
                    )
                )}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Retour</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
