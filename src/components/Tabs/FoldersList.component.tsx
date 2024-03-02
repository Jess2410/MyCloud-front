import Card from "../Card/Card";
import {
  FileData,
  FolderData,
} from "../../views/auth/dashboard/DashboardCloudView";
import CardFolder from "../Card/CardFolder";
import { useNavigate } from "react-router-dom";

type FoldersListProps = {
  isFavorite: boolean;
  isTrash: boolean;
  foldersData: FolderData[];
  setAllFoldersSelected: () => void;
  allFoldersSelected: boolean;
  // idCardsSelected: number[];
  // onAddSelectedCards: (id: number) => void;
};

const FoldersList: React.FC<FoldersListProps> = ({
  foldersData,
  setAllFoldersSelected,
  allFoldersSelected,
  // idCardsSelected,
  // onAddSelectedCards,
}) => {
  const navigate = useNavigate();

  const handleFolderDoubleClick = (folderId: number) => {
    navigate(`/dashboard-folder/${folderId}`);
  };

  return (
    <>
      {foldersData.map((data: FolderData) => (
        <CardFolder
          key={data.id}
          id={data.id}
          allFoldersSelected={allFoldersSelected}
          setAllFoldersSelected={setAllFoldersSelected}
          // allFoldersSelected={idCardsSelected.includes(data.id)}
          creation_date={data.creation_date}
          isFavorite={data.isFavorite}
          name={data.name}
          // onDoubleClick={() => handleFolderDoubleClick(data.id)}
          // onAddSelectedCards={() => onAddSelectedCards(data.id)}
        />
      ))}
    </>
  );
};

export default FoldersList;
