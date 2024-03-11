import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { API_BASE_URL } from "../../constants/url";
import { sendPatchRequest } from "../../utils/data";
import { toast } from "react-toastify";
import { FileData } from "../../views/auth/dashboard/DashboardCloudView";

type FormDialogProps = {
  handleClose: () => void;
  setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
  fileToEdit: any;
  files: FileData[];
};

export default function EditFileDialog({
  handleClose,
  setFiles,
  fileToEdit,
  files,
}: FormDialogProps) {
  const [formData, setFormData] = useState<any>({
    name: "",
  });

  const editFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPatchRequest(
        `${API_BASE_URL}/files/edit`,
        { Authorization: `Bearer ${token}` },
        {
          id: fileToEdit.id,
          name: formJson.name,
        }
      );

      if (response.status === 200) {
        toast.update(loader, {
          render: "Fichier modifié avec succès !",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        const updatedFiles = files.map((file) => {
          if (file.id === response.file.id) {
            return {
              ...file,
              name: response.file.name,
            };
          }
          return file;
        });

        setFiles(updatedFiles);

        handleClose();
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

  return (
    <>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: editFile,
        }}
      >
        <DialogTitle>Renommer le fichier</DialogTitle>
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            variant="standard"
            defaultValue={fileToEdit.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Retour</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
