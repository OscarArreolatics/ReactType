import Sidebar from "@/layouts/DashSlidebar";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Button } from "@mui/material";
import PointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "@/redux/slices/projectSlice";
import { RootState } from "@/redux/store";
import projectApi from "@/api/project";
import CardProject from "@/components/project/CardProject";
import NewProject from "@/components/project/NewProject";
import { useAuth } from "@/utils/RoleAuth";

const Projects: React.FC = () => {
  const dispatch = useDispatch();
  const [openNewProjectDialog, setOpenNewProjectDialog] = useState(false);
  const projects = useSelector((state: RootState) => state.projects.projects);

  const fetchProject = useCallback(async () => {
    try {
      const res = await projectApi.getProjects();
      if (res) {
        dispatch(setProjects(res));
        console.log(res);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return (
    <>
      <div className="bg-slate-200 pt-12 w-full">
        <Sidebar>
          <div>
            <Card
              variant="outlined"
              className="my-3 w-full p-1 md:p-3"
              sx={{ borderRadius: "0.5rem" }}
            >
              <div className="flex justify-between">
                <h1 className="text-3xl font-medium">Mis Proyectos</h1>

                {useAuth(["admin", "editor"]) && (
                  <div>
                    <Button
                      variant="contained"
                      color="success"
                      endIcon={<PointOutlinedIcon />}
                      onClick={() => setOpenNewProjectDialog(true)}
                    >
                      Nuevo Proyecto
                    </Button>
                  </div>
                )}
              </div>

              <CardContent>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                  }}
                >
                  {projects.map((project) => (
                    <Grid
                      size={{ xs: 12, md: 6, lg: 4, xl: 3 }}
                      key={project._id}
                    >
                      <CardProject project={project} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* dialog proyecto nuevo  */}
            <NewProject
              open={openNewProjectDialog}
              onSave={fetchProject}
              onClose={() => setOpenNewProjectDialog(false)}
            />
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default Projects;
