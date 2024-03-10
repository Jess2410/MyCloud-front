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
  files: any;
  fileToMove?: number;
  folders: any;
};

export default function MoveDialogFile({
  handleClose,
  files,
  fileToMove,
  folders,
}: MoveDialogProps) {
  console.log("🚀 ~ fileToMove:", fileToMove);
  console.log("🚀 ~ files:", files);
  const [newLocation, setNewLocation] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setNewLocation(event.target.value as string);
  };
  const moveFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const folder_id = formJson.folder_id;
    console.log("🚀 ~ moveFile ~ folder_id:", folder_id);
    const loader = toast.loading("Veuillez patienter...");

    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPatchRequest(
        `${API_BASE_URL}/files/move`,
        { Authorization: `Bearer ${token}` },
        {
          id: fileToMove,
          folder_id: folder_id,
        }
      );
      if (response.status === 200) {
        toast.update(loader, {
          render: "Fichier déplacé avec succès !",
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
          onSubmit: moveFile,
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
                name="folder_id"
              >
                <MenuItem value={undefined}>Racine</MenuItem>
                {folders.map((folder: FolderData) => (
                  <MenuItem value={folder.id}>{folder.name}</MenuItem>
                ))}
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
