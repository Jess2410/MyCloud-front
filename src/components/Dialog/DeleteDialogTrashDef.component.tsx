import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

type DeleteDialogDefTrashProps = {
  handleClose: () => void;
  actionType?: string | null | undefined;
  deletedFolders?: number[];
  files: any;
  folders: any;
  handleDeleteDef: () => void;
};

const DeleteDialogTrashDef: FC<DeleteDialogDefTrashProps> = ({
  handleClose,
  deletedFolders,
  files,
  folders,
  handleDeleteDef,
}) => {
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Êtes-vous sûr(e) de vouloir vider la corbeille ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Retour</Button>
        <Button onClick={handleDeleteDef} autoFocus>
          Vider
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialogTrashDef;
