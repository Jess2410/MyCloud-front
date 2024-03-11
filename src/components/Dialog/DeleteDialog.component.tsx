import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

type DeleteDialogProps = {
  handleClose: () => void;
  files: any;
  folders: any;
  handleDelete: () => void;
};

const DeleteDialog: FC<DeleteDialogProps> = ({ handleClose, handleDelete }) => {
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Êtes-vous sûr(e) de vouloir supprimer ce(s) élément(s) ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Retour</Button>
        <Button onClick={handleDelete} autoFocus>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
