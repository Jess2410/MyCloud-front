// import { FolderData } from "../../views/auth/dashboard/DashboardCloudView";
// import CardFolder from "../Card/CardFolder";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../../constants/url";
// import { sendPatchRequest } from "../../utils/data";
// import { toast } from "react-toastify";

// type FoldersListProps = {
//   isFavorite: boolean;
//   isTrash: boolean;
//   isSelected: boolean;
//   setSelectedFolder: () => void;
//   foldersData: FolderData[];
//   setAllFoldersSelected: () => void;
//   allFoldersSelected: boolean;
//   // idCardsSelected: number[];
//   // onAddSelectedCards: (id: number) => void;
// };

// const FoldersList: React.FC<FoldersListProps> = ({
//   foldersData,
//   isSelected,
//   setSelectedFolder,
//   setAllFoldersSelected,
//   allFoldersSelected,
//   // idCardsSelected,
//   // onAddSelectedCards,
// }) => {
//   const navigate = useNavigate();

//   const handleFolderDoubleClick = (folderId: number) => {
//     navigate(`/dashboard-folder/${folderId}`);
//   };

//   return (
//     <>
//       {foldersData?.map((data: FolderData) => (
//         <CardFolder
//           key={data.id}
//           id={data.id}
//           allFoldersSelected={allFoldersSelected}
//           setAllFoldersSelected={setAllFoldersSelected}
//           // allFoldersSelected={idCardsSelected.includes(data.id)}
//           moveToFavorites={() => moveToFavorites(data.id)}
//           creation_date={data.creation_date}
//           isSelected={isSelected}
//           setSelectedFolder={setSelectedFolder}
//           isFavorite={data.isFavorite}
//           name={data.name}
//           // onDoubleClick={() => handleFolderDoubleClick(data.id)}
//           // onAddSelectedCards={() => onAddSelectedCards(data.id)}
//         />
//       ))}
//     </>
//   );
// };

// export default FoldersList;
