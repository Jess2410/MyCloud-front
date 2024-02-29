import {
  FileData,
  FolderData,
} from "../../views/auth/dashboard/DashboardCloudView";
import FilesList from "./FilesList.component";
// import useSelectCards from "./hooks/useSelectCards";
import { Box } from "@mui/material";

type MyCloudTabProps = {
  filesData: FileData[];
  foldersData: FolderData[];
};
const MyCloudTab: React.FC<MyCloudTabProps> = ({ filesData, foldersData }) => {
  console.log("🚀 ~ foldersData:", foldersData);
  // const { onAddSelectedCards, idCardsSelected } = useSelectCards({
  //   tabActive: 2,
  //   filesData,
  //   foldersData,
  // });

  return (
    <Box
      sx={{
        pt: 4,
        maxWidth: "800px",
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <FilesList
        foldersData={foldersData}
        isFavorite={false}
        isTrash={false}
        // idCardsSelected={idCardsSelected}
        // onAddSelectedCards={onAddSelectedCards}
      />
      <FilesList
        filesData={filesData}
        isFavorite={false}
        isTrash={false}
        // idCardsSelected={idCardsSelected}
        // onAddSelectedCards={onAddSelectedCards}
      />
    </Box>
  );
};

export default MyCloudTab;
