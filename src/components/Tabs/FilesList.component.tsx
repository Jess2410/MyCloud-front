import Card from "../Card/Card";
import { FileData } from "../../views/auth/dashboard/DashboardCloudView";

type FilesListProps = {
  isFavorite: boolean;
  isTrash: boolean;
  filesData: FileData[];

  // idCardsSelected: number[];
  // onAddSelectedCards: (id: number) => void;
};

const FilesList: React.FC<FilesListProps> = ({
  filesData,
  isFavorite,
  isTrash,
  // idCardsSelected,
  // onAddSelectedCards,
}) => {
  return (
    <>
      {filesData.map((data: FileData) => {
        return (
          <Card
            key={data.id}
            id={data.id}
            // isSelected={idCardsSelected.includes(data.id)}
            creation_date={data.creation_date}
            isFavorite={data.isFavorite}
            name={data.name}
            // onAddSelectedCards={() => onAddSelectedCards(data.id)}
          />
        );
      })}
    </>
  );
};

export default FilesList;
