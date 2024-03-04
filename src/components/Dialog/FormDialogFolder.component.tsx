import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { API_BASE_URL } from "../../constants/url";
import { sendPostRequest } from "../../utils/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FolderData } from "../../views/auth/dashboard/DashboardCloudView";

type FormDialogProps = {
  handleClose: () => void;
  setFolders: React.Dispatch<React.SetStateAction<FolderData[]>>;
};

export default function FormDialogFolder({
  handleClose,
  setFolders,
}: FormDialogProps) {
  const createFolder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const nameFolder = formJson.name;
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPostRequest(
        `${API_BASE_URL}/folder`,
        { Authorization: `Bearer ${token}` },
        {
          name: nameFolder,
        }
      );
      if (response.status === 201) {
        toast.update(loader, {
          render: "Dossier créé avec succès !",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });

        handleClose();
        setFolders((prev) => [...prev, response[0]]);
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
          onSubmit: createFolder,
        }}
      >
        <DialogTitle>Nouveau dossier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nom"
            type="text"
            fullWidth
            variant="standard"
          />
          {/* {title === "Nouveau fichier" && (
            <TextField type="file" variant="standard" />
          )} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Retour</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
