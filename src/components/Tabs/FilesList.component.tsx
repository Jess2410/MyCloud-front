import { Box } from "@mui/material";
import Card from "../Card/Card";
import { CloudData } from "./DashboardMain.component";

type FilesListProps = {
  filterType: string;
  isFavorite: boolean;
  isTrash: boolean;
  cloudData: CloudData[];
  idCardsSelected: number[];
  onAddSelectedCards: (id: number) => void;
};

const FilesList: React.FC<FilesListProps> = ({
  cloudData,
  filterType,
  isFavorite,
  isTrash,
  idCardsSelected,
  onAddSelectedCards,
}) => {
  return (
    <>
      {cloudData.map((data) => {
        if (
          data.type === filterType &&
          data.isFavorite === isFavorite &&
          data.isTrash === isTrash
        ) {
          return (
            <Card
              key={data.id}
              id={data.id}
              type={data.type}
              extension={data.extension}
              isSelected={idCardsSelected.includes(data.id)}
              creation_date={data.creation_date}
              isFavorite={data.isFavorite}
              name={data.name}
              onAddSelectedCards={() => onAddSelectedCards(data.id)}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default FilesList;
