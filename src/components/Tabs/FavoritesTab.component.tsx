import { Box } from "@mui/material";
import { CloudData } from "./DashboardMain.component";
import FilesList from "./FilesList.component";
import useSelectCards from "./hooks/useSelectCards";

type FavoritesTabProps = {
  cloudData: CloudData[];
};
const FavoritesTab: React.FC<FavoritesTabProps> = ({ cloudData }) => {
  const { onAddSelectedCards, idCardsSelected } = useSelectCards({
    tabActive: 2,
    cloudData,
  });
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <FilesList
        cloudData={cloudData}
        filterType={"folder"}
        isFavorite={true}
        isTrash={false}
        idCardsSelected={idCardsSelected}
        onAddSelectedCards={onAddSelectedCards}
      />
      <FilesList
        cloudData={cloudData}
        filterType={"file"}
        isFavorite={true}
        isTrash={false}
        idCardsSelected={idCardsSelected}
        onAddSelectedCards={onAddSelectedCards}
      />
    </Box>
  );
};

export default FavoritesTab;
