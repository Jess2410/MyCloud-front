// import Grid from "@mui/material/Grid";

// import { useContext, useEffect, useState } from "react";
// import { Box } from "@mui/material";
// import { UserContext } from "../../../context/UserContext";
// import { mockDataTrash } from "./mockDataTrash";
// import TrashTab from "../../../components/Tabs/TrashTab.component";
// import FormDialog from "../../../components/Dialog/FormDialog.component";
// import DeleteDialog from "../../../components/Dialog/DeleteDialog.component";
// import ToolBar from "../../../components/Tabs/ToolBar.component";
// import { toast } from "react-toastify";
// import { sendGetRequest, sendPostRequest } from "../../../utils/data";
// import { API_BASE_URL } from "../../../constants/url";
// import { useNavigate } from "react-router-dom";
// import { FolderData } from "./DashboardCloudView";

// export default function DashboardTrashView() {
//   const [showForm, setShowForm] = useState(false);
//   const [typeForm, setTypeForm] = useState("");
//   const userContext = useContext(UserContext);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [actionType, setActionType] = useState("");
//   const [allFoldersSelected, setAllFoldersSelected] = useState(false);
//   const [selectedFoldersIds, setSelectedFoldersIds] = useState<number[]>([]);

//   const [folders, setFolders] = useState([]);
//   const [nameFolder, setNameFolder] = useState("");
//   const [files, setFiles] = useState([]);

//   const displayForm = (type: string) => {
//     setShowForm(!showForm);
//     setTypeForm(type);
//   };

//   const displayDeleteModale = (actionType: string | null | undefined) => {
//     setShowDeleteModal(!showDeleteModal);
//     if (actionType) {
//       setActionType(actionType);
//     }
//   };

//   const createFolder = async (name: string) => {
//     setNameFolder(name);
//     const loader = toast.loading("Veuillez patienter...");
//     try {
//       const token = localStorage.getItem("@userToken");
//       const response = await sendPostRequest(
//         `${API_BASE_URL}/folders`,
//         { Authorization: `Bearer ${token}` },
//         {
//           name: nameFolder,
//         }
//       );
//       if (response.status === 201) {
//         toast.update(loader, {
//           render: "Dossier créé avec succès !",
//           type: "success",
//           autoClose: 2000,
//           isLoading: false,
//         });
//         return;
//       }
//       toast.update(loader, {
//         render: `Une erreur est survenue : ${response.message}.`,
//         type: "error",
//         autoClose: 2000,
//         isLoading: false,
//       });
//       throw new Error(response.message);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const getTrashFolders = async () => {
//       try {
//         const token = localStorage.getItem("@userToken");
//         const response = await sendGetRequest(`${API_BASE_URL}/folders/trash`, {
//           Authorization: `Bearer ${token}`,
//         });
//         setFolders(response);
//       } catch (error) {
//         console.log("error");
//       }
//     };
//     getTrashFolders();
//   }, []);

//   useEffect(() => {
//     if (allFoldersSelected) {
//       setSelectedFoldersIds(folders?.map((folder: FolderData) => folder.id));
//     } else {
//       setSelectedFoldersIds([]);
//     }
//   }, [allFoldersSelected]);
//   console.log(
//     "🚀 ~ DashboardCloudView ~ allFoldersSelected:",
//     allFoldersSelected
//   );

//   console.log("🚀 ~ useEffect ~ selectedFoldersIds:", selectedFoldersIds);

//   return (
//     <Box
//       component="main"
//       sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
//     >
//       <ToolBar
//         handleSelectAllCards={() => console.log("à changer")}
//         displayForm={displayForm}
//         displayDeleteModale={displayDeleteModale}
//         def={true}
//         restore={true}
//         isTrash={true}
//         allFoldersSelected={allFoldersSelected}
//         setAllFoldersSelected={() => setAllFoldersSelected(!allFoldersSelected)}
//       />
//       <Grid>
//         <Box
//           sx={{
//             pt: 4,
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "16px",
//             justifyContent: "center",
//             alignItems: "flex-start",
//           }}
//         >
//           <TrashTab
//             foldersData={folders}
//             filesData={files}
//             allFoldersSelected={allFoldersSelected}
//             setAllFoldersSelected={() =>
//               setAllFoldersSelected(!allFoldersSelected)
//             }
//           />
//           {showForm && (
//             <FormDialog
//               handleClose={() => setShowForm(false)}
//               handleCreateFolder={createFolder}
//               title={
//                 typeForm === "folder" ? "Nouveau dossier" : "Nouveau fichier"
//               }
//             />
//           )}
//           {showDeleteModal && (
//             <DeleteDialog
//               handleClose={() => setShowDeleteModal(false)}
//               actionType={actionType}
//             />
//           )}
//         </Box>
//       </Grid>
//     </Box>
//   );
// }
