import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FolderData } from "../../views/auth/dashboard/DashboardCloudView";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../constants/url";
import { sendPatchRequest } from "../../utils/data";
import { useNavigate } from "react-router-dom";

type DeleteDialogTrashProps = {
  handleClose: () => void;
  actionType?: string | null | undefined;
  deletedFolders?: number[];
};

const DeleteDialogTrash: FC<DeleteDialogTrashProps> = ({
  handleClose,
  actionType,
  deletedFolders,
}) => {
  const navigate = useNavigate();

  const deleteFoldersDefinitively = async () => {
    const loader = toast.loading("Veuillez patienter...");
    try {
      const token = localStorage.getItem("@userToken");
      // const response = await sendDeleteRequest(
      //   `${API_BASE_URL}/folders/isTrash`,
      //   { Authorization: `Bearer ${token}` },
      //   { id: deletedFolders }
      // );
      // if (response.status === 200) {
      //   toast.update(loader, {
      //     render: response.message,
      //     type: "success",
      //     autoClose: 2000,
      //     isLoading: false,
      //   });
      //   navigate("/dashboard-trash"); //TODO implémentation à refaire
      //   return;
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          "Êtes-vous sûr(e) de vouloir supprimer ce(s) élément(s) ?"
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Retour</Button>
        <Button onClick={deleteFoldersDefinitively} autoFocus>
          {actionType === "restore" ? "Restaurer" : "Supprimer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialogTrash;
