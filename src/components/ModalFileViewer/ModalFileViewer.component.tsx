import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { sendGetRequest } from "../../utils/data";
import { API_BASE_URL } from "../../constants/url";
// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

type ModalFileViewerProps = {
  handleClose: () => void;
  selectedFile?: string;
};

export default function ModalFileViewer({
  handleClose,
  selectedFile,
}: ModalFileViewerProps) {
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        // onSubmit: createFile,
      }}
    >
      <DialogActions>
        <Button onClick={handleClose}>Retour</Button>
      </DialogActions>
      <DialogContent>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Contenu du fichier
        </Typography>
        <Box sx={{ mt: 2 }}>
          <img src={selectedFile} alt="" />
          <iframe src={selectedFile} width="100%" height="500px" />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
