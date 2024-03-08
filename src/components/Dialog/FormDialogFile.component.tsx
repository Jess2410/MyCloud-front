import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { API_BASE_URL } from "../../constants/url";
import { sendPostFileRequest, sendPostRequest } from "../../utils/data";
import { toast } from "react-toastify";

type FormDialogProps = {
  handleClose: () => void;
};

export default function FormDialogFile({ handleClose }: FormDialogProps) {
  const [formData, setFormData] = useState<any>({
    name: "",
    file: null as File | null,
  });

  const [file, setFile] = useState(null);

  const createFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    console.log("🚀 ~ createFile ~ formData:", formJson.image);
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPostFileRequest(
        `${API_BASE_URL}/file`,
        { Authorization: `Bearer ${token}` },
        {
          name: formJson.name,
          file: formJson.image,
        }
      );
      if (!formJson.image) {
        toast.error("Veuillez sélectionner un fichier.");
        return;
      }
      if (response.status === 201) {
        toast.update(loader, {
          render: "Fichier créé avec succès !",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
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
          onSubmit: createFile,
        }}
      >
        <DialogTitle>Nouveau fichier</DialogTitle>
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
          />
          {/* 
          <TextField
            type="file"
            name="file"
            variant="standard"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              const file = target.files && target.files[0];
              if (file) {
                setFormData({ ...formData, file: file });
              }
            }}
            // onChange={(e: any) => {
            //   setFile(e.target.files?.length ? e.target?.files[0] : null);
            // }}
          /> */}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg, .pdf"
            placeholder="fichier"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              const file = target.files && target.files[0];
              if (file) {
                setFormData({ ...formData, file: file });
              }
            }}
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
