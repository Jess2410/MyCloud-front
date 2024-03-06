// import Grid from "@mui/material/Grid";
// import trashIcon from "../../../assets/icons/trash-drawer.svg";
// import starIcon from "../../../assets/icons/star-drawer.svg";
// import fileIcon from "../../../assets/icons/file-drawer.svg";
// import { useEffect, useState } from "react";
// import { Box } from "@mui/material";
// import DeleteDialog from "../../../components/Dialog/DeleteDialog.component";
// import ToolBar from "../../../components/Tabs/ToolBar.component";
// import { sendGetRequest } from "../../../utils/data";
// import { API_BASE_URL } from "../../../constants/url";
// import { arraysAreEqual } from "../../../utils/array";
// import CardFolder from "../../../components/Card/CardFolder";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs.component";
// import FormDialogFolder from "../../../components/Dialog/FormDialogFolder.component";
// import FormDialogFile from "../../../components/Dialog/FormDialogFile.component";
// import Card from "../../../components/Card/Card";
// import useToolbar from "../../../components/Tabs/hooks/useToolbar";
// import CardFile from "../../../components/Card/Card";

// export const tabsList = [
//   {
//     name: "Mon Cloud",
//     key: 1,
//     icon: fileIcon,
//     url: "/dashboard-cloud",
//   },
//   {
//     name: "Mes favoris",
//     key: 2,
//     icon: starIcon,
//     url: "/dashboard-favorites",
//   },
//   {
//     name: "Corbeille",
//     key: 3,
//     icon: trashIcon,
//     url: "/dashboard-trash",
//   },
// ];

// export type FolderData = {
//   id: number;
//   name: string;
//   isFavorite: boolean;
//   isTrash: boolean;
//   creation_date: string;
//   owner_id?: number;
//   parent_folder_id?: number;
// };
// export type FileData = FolderData & {
//   extension?: string;
//   url?: string;
//   size?: number;
//   folder_id?: number;
// };

// export default function DashboardCloudView() {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const tabActive = tabsList.find((tab) => pathname.includes(tab.url));

//   const [folders, setFolders] = useState<FolderData[]>([]);

//   const [files, setFiles] = useState([]);
//   const [lastPathnameId, setLastPathnameId] = useState("");

//   const {
//     showFormFolder,
//     setShowFormFolder,
//     showFormFile,
//     setShowFormFile,
//     actionType,
//     deletedFolders,
//     displayDeleteModale,
//     handleSelectFolder,
//     handleSelectAllCards,
//     handleSearchInputChange,
//     allFoldersSelected,
//     setAllFoldersSelected,
//     searchValue,
//     setSearchValue,
//     selectedFoldersIds,
//     setSelectedFoldersIds,
//     filteredFolders,
//     setFilteredFolders,
//     showDeleteModal,
//     setShowDeleteModal,
//   } = useToolbar(folders, files);

//   const getFolders = async (foldersRequestPath: string) => {
//     try {
//       const token = localStorage.getItem("@userToken");
//       const response = await sendGetRequest(
//         `${API_BASE_URL}/folders${foldersRequestPath}`,
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       );
//       if (!arraysAreEqual(folders, response)) {
//         setFolders(response);
//       }
//     } catch (error) {
//       console.log("error");
//     }
//   };

//   const getFiles = async (filesRequestPath: string) => {
//     try {
//       const token = localStorage.getItem("@userToken");
//       const response = await sendGetRequest(
//         `${API_BASE_URL}/files${filesRequestPath}`,
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       );
//       if (!arraysAreEqual(files, response)) {
//         setFiles(response);
//       }
//     } catch (error) {
//       console.log("error");
//     }
//   };

//   const getFoldersFromParent = async (foldersRequestPath: string) => {
//     try {
//       const token = localStorage.getItem("@userToken");
//       const response = await sendGetRequest(
//         `${API_BASE_URL}/folders/parent/${foldersRequestPath}`,
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       );
//       if (!arraysAreEqual(folders, response)) {
//         console.log(response);
//         setFolders(response);
//       }
//       console.log("arraysAreEqual(folders, response)");
//     } catch (error) {
//       console.log("error");
//     }
//   };

//   const getFilesFromParent = async (filesRequestPath: string) => {
//     setFiles([]);
//     // try {
//     //   const token = localStorage.getItem("@userToken");
//     //   const response = await sendGetRequest(
//     //     `${API_BASE_URL}/files/parent/${filesRequestPath}`,
//     //     {
//     //       Authorization: `Bearer ${token}`,
//     //     }
//     //   );
//     //   if (!arraysAreEqual(files, response)) {
//     //     setFiles(response);
//     //   }
//     // } catch (error) {
//     //   console.log("error");
//     // }
//   };

//   // const parsePathname = (): string[] => {
//   //   console.log(pathname);
//   //   // console.log(pathname.substring(pathname.indexOf("/") + 1).split("/"));
//   //   // return pathname.substring(pathname.indexOf("/") + 1).split("/");
//   //   console.log(pathname.substring(1).substring(pathname.lastIndexOf("/") + 1));
//   //   return pathname.substring(1).substring(pathname.lastIndexOf("/") + 1);
//   // };

//   useEffect(() => {
//     console.log(pathname);
//     const pathnameWithoutRoot = pathname.substring(pathname.indexOf("/") + 1);
//     console.log(pathnameWithoutRoot);
//     console.log(
//       pathnameWithoutRoot.substring(pathnameWithoutRoot.lastIndexOf("/") + 1)
//     );
//     setLastPathnameId(
//       pathnameWithoutRoot.substring(pathnameWithoutRoot.lastIndexOf("/") + 1)
//     );
//   }, [pathname]);

//   const parsePathname = (currentpathname: string): string => {
//     console.log(currentpathname);
//     // console.log(pathname.substring(pathname.indexOf("/") + 1).split("/"));
//     // return pathname.substring(pathname.indexOf("/") + 1).split("/");
//     const pathnameWithoutRoot = currentpathname.substring(
//       currentpathname.indexOf("/") + 1
//     );
//     console.log(
//       pathnameWithoutRoot.substring(pathnameWithoutRoot.lastIndexOf("/") + 1)
//     );
//     return pathnameWithoutRoot.substring(
//       pathnameWithoutRoot.lastIndexOf("/") + 1
//     );
//   };

//   useEffect(() => {
//     console.log(lastPathnameId); ///TODO pas encore modifié par la ligne 181 a ce moement la
//     const param = parsePathname(pathname);
//     if (param.length == 0) getFiles("");
//     else getFilesFromParent(param);
//   }, [pathname]);

//   useEffect(() => {
//     console.log(lastPathnameId);
//     const param = parsePathname(pathname);
//     if (param.length == 0) getFolders("");
//     else getFoldersFromParent(param);
//   }, [pathname]);

//   // useEffect(() => {
//   //   if (allFoldersSelected) {
//   //     setSelectedFoldersIds(folders?.map((folder: FolderData) => folder.id));
//   //   } else {
//   //     setSelectedFoldersIds([]);
//   //   }
//   // }, [allFoldersSelected]);

//   // useEffect(() => {
//   //   if (allFoldersSelected) {
//   //     setSelectedFoldersIds(folders?.map((folder: FolderData) => folder.id));
//   //   } else {
//   //     setSelectedFoldersIds([]);
//   //   }
//   // }, [allFoldersSelected]);

//   return (
//     <Box
//       component="main"
//       sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
//     >
//       <ToolBar
//         setShowFormFolder={() => setShowFormFolder(!showFormFolder)}
//         setShowFormFile={() => setShowFormFile(!showFormFile)}
//         handleSelectAllCards={handleSelectAllCards}
//         allFoldersSelected={allFoldersSelected}
//         displayDeleteModale={displayDeleteModale}
//         def={true}
//         restore={true}
//         isTrash={false}
//         handleSearchInputChange={handleSearchInputChange}
//         searchValue={searchValue}
//       />
//       <Breadcrumbs label={tabActive?.name} link="/dashboard-cloud" />
//       <Grid>
//         <Box
//           sx={{
//             pt: 4,
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "16px",
//             justifyContent: "flex-start",
//             alignItems: "flex-start",
//           }}
//         >
//           {(searchValue !== "" ? filteredFolders : folders).map(
//             (data: FolderData) => (
//               <CardFolder
//                 key={data.id}
//                 id={data.id}
//                 isFolderSelected={selectedFoldersIds.includes(data.id)}
//                 onSelectFolder={handleSelectFolder}
//                 allFoldersSelected={allFoldersSelected}
//                 creation_date={data.creation_date}
//                 isFavorite={data.isFavorite}
//                 name={data.name}
//               />
//             )
//           )}
//           {(searchValue !== "" ? filteredFolders : files).map(
//             (data: FileData) => (
//               <CardFile
//                 key={data.id}
//                 id={data.id}
//                 // isFolderSelected={selectedFoldersIds.includes(data.id)}
//                 // onSelectFolder={handleSelectFolder}
//                 extension={data.extension}
//                 allFoldersSelected={allFoldersSelected}
//                 creation_date={data.creation_date}
//                 isFavorite={data.isFavorite}
//                 name={data.name}
//               />
//             )
//           )}

//           {showFormFolder && (
//             <FormDialogFolder
//               handleClose={() => setShowFormFolder(false)}
//               setFolders={setFolders}
//             />
//           )}
//           {showFormFile && (
//             <FormDialogFile handleClose={() => setShowFormFile(false)} />
//           )}
//           {showDeleteModal && (
//             <DeleteDialog
//               deletedFolders={deletedFolders}
//               handleClose={() => setShowDeleteModal(false)}
//               actionType={actionType}
//             />
//           )}
//         </Box>
//       </Grid>
//     </Box>
//   );
// }
