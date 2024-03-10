import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { FileData } from "../../views/auth/dashboard/DashboardCloudView";
import { Document, PDFViewer, Page, Text } from "@react-pdf/renderer";

type ModalFileViewerProps = {
  handleClose: () => void;
  selectedFile?: FileData;
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
          {selectedFile?.name}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {selectedFile?.extension === "pdf" && selectedFile?.url ? (
            <PDFViewer width="100%" height="500px">
              <Document>
                <Page>
                  <iframe src={selectedFile.url} width="100%" height="100%" />
                </Page>
              </Document>
            </PDFViewer>
          ) : (
            <img src={selectedFile?.url} alt="" />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
