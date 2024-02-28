import { CloudData } from "./DashboardMain.component";
import FilesList from "./FilesList.component";
import useSelectCards from "./hooks/useSelectCards";
import { Box } from "@mui/material";

type MyCloudTabProps = {
  cloudData: CloudData[];
};
const MyCloudTab: React.FC<MyCloudTabProps> = ({ cloudData }) => {
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
        isFavorite={false}
        isTrash={false}
        idCardsSelected={idCardsSelected}
        onAddSelectedCards={onAddSelectedCards}
      />
      <FilesList
        cloudData={cloudData}
        filterType={"file"}
        isFavorite={false}
        isTrash={false}
        idCardsSelected={idCardsSelected}
        onAddSelectedCards={onAddSelectedCards}
      />
    </Box>
  );
};

export default MyCloudTab;
