import Card from "../Card/Card";
import {
  FileData,
  FolderData,
} from "../../views/auth/dashboard/DashboardCloudView";
import CardFolder from "../Card/CardFolder";

type FoldersListProps = {
  isFavorite: boolean;
  isTrash: boolean;
  foldersData: FolderData[];
  // idCardsSelected: number[];
  // onAddSelectedCards: (id: number) => void;
};

const FoldersList: React.FC<FoldersListProps> = ({
  foldersData,
  isFavorite,
  isTrash,
  // idCardsSelected,
  // onAddSelectedCards,
}) => {
  console.log("🚀 ~ foldersData:", foldersData);

  return (
    <>
      {foldersData.map((data: FolderData) => (
        <CardFolder
          key={data.id}
          id={data.id}
          // isSelected={idCardsSelected.includes(data.id)}
          creation_date={data.creation_date}
          isFavorite={data.isFavorite}
          name={data.name}
          // onAddSelectedCards={() => onAddSelectedCards(data.id)}
        />
      ))}
    </>
  );
};

export default FoldersList;
