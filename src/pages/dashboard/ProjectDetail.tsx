import Sidebar from "@/layouts/DashSlidebar";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Chip } from "@mui/material";
import { useEffect, useCallback, useState } from "react";
import projectApi, { ProjectI } from "@/api/project";
import { useParams } from "react-router-dom";
import { formatDate } from "@/utils/utils"

const Projects: React.FC = () => {
  const [Project, setProject] = useState<ProjectI>();
  const { id } = useParams<{ id: string }>();

  const fetchProject = useCallback(async () => {
    try {
      if (id) {
        const res = await projectApi.getAProject(id);
        if (res) {
          setProject(res);
        }
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }, [id]);

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
              className="my-3 w-full"
              sx={{ borderRadius: "0.5rem" }}
            >
              <div
                className="py-2"
                style={{ backgroundColor: Project?.color }}
              ></div>

              <CardContent className="p-3">
                <div className="mb-3">
                  <h1 className="text-3xl font-medium capitalize">
                    {Project?.name}
                  </h1>
                </div>
                <div className="my-3">
                  {Project?.tags.map((tag, tagIndex) => (
                    <Chip
                      key={tagIndex}
                      label={tag}
                      className="me-2 capitalize"
                      color="success"
                      size="small"
                    />
                  ))}
                </div>
                <div className="capitalize">{Project?.description}</div>
                <div>Administrador del proyecto:</div>
                <div>
                  Fecha de inicio:{" "}
                  {Project?.startDate
                    ? formatDate(Project.startDate)
                    : "Sin fecha de inicio"}
                </div>
                <div>
                  Fecha de cierre:{" "}
                  {Project?.endDate
                    ? formatDate(Project.endDate)
                    : "Sin fecha de cierre"}
                </div>
                <Grid container></Grid>
              </CardContent>
            </Card>
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default Projects;
