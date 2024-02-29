// import { FileData, FolderData } from "../../../views/auth/dashboard/DashboardCloudView";
// import { CloudData } from "./../DashboardMain.component";
// import { useState } from "react";

// type UseSelectCardsProps = {
//   tabActive: number;
//   filesData: FileData[];
//   foldersData: FolderData[];
// };
// const useSelectCards = ({ tabActive, filesData, foldersData }: UseSelectCardsProps) => {
//   const [idCardsSelected, setIdCardsSelected] = useState<number[]>([]);
//   const [allCardsSelected, setAllCardsSelected] = useState(false);
//   const [allCheckboxesChecked, setAllCheckboxesChecked] = useState(false);

//   const onAddSelectedCards = (id: number) => {
//     let selectedIds: number[] = [];

//     if (idCardsSelected.includes(id)) {
//       switch (tabActive) {
//         case 1:
//           selectedIds = cloudData
//             .filter((data) => data.type === "folder" || data.type === "file")
//             .map((data) => data.id);
//           break;
//         case 2:
//           selectedIds = cloudData
//             .filter(
//               (data) =>
//                 (data.type === "folder" || data.type === "file") &&
//                 data.isFavorite
//             )
//             .map((data) => data.id);
//           break;
//         case 3:
//           selectedIds = cloudData
//             .filter(
//               (data) =>
//                 (data.type === "folder" || data.type === "file") && data.isTrash
//             )
//             .map((data) => data.id);
//           break;
//         default:
//           break;
//       }
//       setIdCardsSelected(selectedIds);

//       setAllCheckboxesChecked(false);
//       setIdCardsSelected([...idCardsSelected, id]);
//       if (idCardsSelected.includes(id)) {
//         setIdCardsSelected([id]);
//         setAllCheckboxesChecked(false);
//         if (idCardsSelected.includes(id)) {
//           setIdCardsSelected([id]);
//         }
//       }
//     } else {
//       setIdCardsSelected([...idCardsSelected, id]);
//     }
//   };
//   return { onAddSelectedCards, idCardsSelected };
// };
// export default useSelectCards;
