import Card from "../Card/Card";
import {
  FileData,
  FolderData,
} from "../../views/auth/dashboard/DashboardCloudView";

type FilesListProps = {
  isFavorite: boolean;
  isTrash: boolean;
  filesData: FileData[];
  foldersData: FolderData[];
  // idCardsSelected: number[];
  // onAddSelectedCards: (id: number) => void;
};

const FilesList: React.FC<FilesListProps> = ({
  filesData,
  foldersData,
  isFavorite,
  isTrash,
  // idCardsSelected,
  // onAddSelectedCards,
}) => {
  console.log("🚀 ~ foldersData:", foldersData);

  return (
    <>
      {foldersData.map((data: FolderData) => {
        if (data.isFavorite === isFavorite && data.isTrash === isTrash) {
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
        }
        return null;
      })}
      {filesData.map((data: FileData) => {
        if (data.isFavorite === isFavorite && data.isTrash === isTrash) {
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
        }
        return null;
      })}
    </>
  );
};

export default FilesList;
