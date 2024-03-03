// import { Box } from "@mui/material";
// import {
//   FileData,
//   FolderData,
// } from "../../views/auth/dashboard/DashboardCloudView";
// import FoldersList from "./FoldersList.component";
// import FilesList from "./FilesList.component";
// // import FilesList from "./FilesList.component";
// // import useSelectCards from "./hooks/useSelectCards";

// type TrashTabProps = {
//   filesData: FileData[];
//   foldersData: FolderData[];
//   setAllFoldersSelected: () => void;
//   allFoldersSelected: boolean;
// };
// const TrashTab: React.FC<TrashTabProps> = ({
//   filesData,
//   foldersData,
//   allFoldersSelected,
//   setAllFoldersSelected,
// }) => {
//   // const { onAddSelectedCards, idCardsSelected } = useSelectCards({
//   //   tabActive: 2,
//   //   cloudData,
//   // });
//   return (
//     <Box
//       sx={{
//         // pt: 4,
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

// export default TrashTab;
