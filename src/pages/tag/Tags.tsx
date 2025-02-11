import Sidebar from "@/layouts/DashSlidebar";
//import Grid from "@mui/material/Grid2";
import { Card, CardContent } from "@mui/material";

const Tags: React.FC = () => {
  return (
    <>
      <div className="bg-slate-200 pt-12 w-full">
        <Sidebar>
          <div>
            <Card
              variant="outlined"
              className="my-3 w-full p-3"
              sx={{ borderRadius: "0.5rem" }}
            >
              <h1 className="text-3xl font-medium">Etiquetas</h1>
              <CardContent className="my-4" sx={{ padding: 0 }}>
                
              </CardContent>
            </Card>
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default Tags;
