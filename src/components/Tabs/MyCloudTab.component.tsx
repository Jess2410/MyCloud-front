// import {
//   FileData,
//   FolderData,
// } from "../../views/auth/dashboard/DashboardCloudView";
// import FilesList from "./FilesList.component";
// // import useSelectCards from "./hooks/useSelectCards";
// import { Box } from "@mui/material";
// import FoldersList from "./FoldersList.component";

// type MyCloudTabProps = {
//   filesData: FileData[];
//   foldersData: FolderData[];
//   setAllFoldersSelected: () => void;
//   allFoldersSelected: boolean;
// };
// const MyCloudTab: React.FC<MyCloudTabProps> = ({
//   filesData,
//   foldersData,
//   setAllFoldersSelected,
//   allFoldersSelected,
// }) => {
//   // console.log("🚀 ~ foldersData:", foldersData);
//   // const { onAddSelectedCards, idCardsSelected } = useSelectCards({
//   //   tabActive: 2,
//   //   filesData,
//   //   foldersData,
//   // });

//   return (
//     <Box
//       sx={{
//         pt: 4,
//         maxWidth: "800px",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "16px",
//         justifyContent: "flex-start",
//         alignItems: "flex-start",
//       }}
//     >
//       <FoldersList
//         foldersData={foldersData}
//         isFavorite={false}
//         isTrash={false}
//         allFoldersSelected={allFoldersSelected}
//         setAllFoldersSelected={setAllFoldersSelected}
//         // idCardsSelected={idCardsSelected}
//         // onAddSelectedCards={onAddSelectedCards}
//       />
//       <FilesList
//         filesData={filesData}
//         isFavorite={false}
//         isTrash={false}
//         // idCardsSelected={idCardsSelected}
//         // onAddSelectedCards={onAddSelectedCards}
//       />
//     </Box>
//   );
// };

// export default MyCloudTab;
