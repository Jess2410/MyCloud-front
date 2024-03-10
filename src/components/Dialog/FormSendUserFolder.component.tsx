import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { API_BASE_URL } from "../../constants/url";
import { sendGetRequest, sendPostRequest } from "../../utils/data";
import { toast } from "react-toastify";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { FolderData } from "../../views/auth/dashboard/DashboardCloudView";
import { Box, Typography } from "@mui/material";

type FormDialogProps = {
  handleClose: () => void;
  setFolders: React.Dispatch<React.SetStateAction<FolderData[]>>;
  fileToShare?: number | undefined;
};

export default function FormSendUserFolderDialog({
  handleClose,

  fileToShare,
}: FormDialogProps) {
  const [users, setUsers] = useState<string[]>([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendGetRequest(
        `${API_BASE_URL}/permissions/users`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setUsers(response);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const [permission, setPermission] = useState({
    read: false,
    write: false,
    email: "",
    folder_id: fileToShare,
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setPermission({ ...permission, [name as string]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPermission({ ...permission, [name]: checked });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      const response = await sendPostRequest(
        `${API_BASE_URL}/permission`,
        { Authorization: `Bearer ${token}` },
        {
          email: permission.email,
          read: permission.read,
          write: permission.write,
          folder_id: permission.folder_id,
        }
      );
      if (response.status === 200) {
        toast.update(loader, {
          render: "Permissions accordées avec succès !",
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

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Partagez votre dossier avec :</DialogTitle>
        <DialogContent>
          <InputLabel id="demo-multiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={permission.email}
            name="email"
            onChange={handleChange}
            input={<OutlinedInput label="Email" />}
            // MenuProps={MenuProps}
            sx={{ width: "100%" }}
          >
            {users.map((user) => (
              <MenuItem key={user} value={user}>
                {user}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ mt: 2 }}>
            <Typography>Droits autorisés</Typography>
            <FormControlLabel
              control={<Checkbox onChange={handleCheckboxChange} name="read" />}
              label="Lecture"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckboxChange} name="write" />
              }
              label="Ecriture"
            />
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
