import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

type DeleteDialogProps = {
  handleClose: () => void;
  actionType?: string | null | undefined;
};

const DeleteDialog: FC<DeleteDialogProps> = ({ handleClose, actionType }) => {
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {actionType === "def"
            ? "Êtes-vous sûr(e) de vouloir supprimer définitivement ce(s) élément(s) ?"
            : actionType === "restore"
            ? "Êtes-vous sûr(e) de vouloir restaurer ce(s) élément(s) ?"
            : actionType === "none"
            ? "Êtes-vous sûr(e) de vouloir supprimer ce(s) élément(s) ?"
            : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Retour</Button>
        <Button onClick={() => console.log("supprimer")} autoFocus>
          {actionType === "restore" ? "Restaurer" : "Supprimer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
