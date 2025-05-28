import Sidebar from "@/layouts/DashSlidebar";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Chip, Button } from "@mui/material";
import PointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { useEffect, useCallback, useState } from "react";
import projectApi from "@/api/project";
import { ProjectI } from "@/types/project";
import taskApi from "@/api/task";
import { TaskI } from "@/types/task";
import { useParams } from "react-router-dom";
import { formatDate } from "@/utils/utils";
import TableTasks from "@/components/task/TableTasks";
import NewTask from "@/components/task/NewTask";

const Projects: React.FC = () => {
  const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false);
  const [Project, setProject] = useState<ProjectI>();
  const [Tasks, setTasks] = useState<TaskI[]>();
  const { id } = useParams<{ id: string }>();

  const fetchTask = useCallback(async () => {
    try {
      if (id) {
        const taskres = await taskApi.getTasksByProject(id);
        if (taskres) {
          setTasks(taskres);
        }
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  }, [id]);

  const fetchProject = useCallback(async () => {
    try {
      if (id) {
        const res = await projectApi.getAProject(id);
        if (res) {
          setProject(res);
        }

        fetchTask();
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }, [id, fetchTask]);

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
                <Grid container>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div className="mb-3">
                      <h1 className="text-3xl capitalize">
                        {Project?.name}
                      </h1>
                    </div>
                    <div className="my-3">
                      {Project?.tags.map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag.title}
                          className="me-2 capitalize"
                          sx={{ backgroundColor: tag.color, color: "white" }}
                          size="small"
                        />
                      ))}
                    </div>
                    <div className="font-bold">Descripción:</div>
                    <div className="mb-5 text-justify">{Project?.description}</div>
                    <div>
                      Administrador del proyecto: {Project?.createdBy.name}
                    </div>
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
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div className="flex justify-end">
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<PointOutlinedIcon />}
                        onClick={() => setOpenNewTaskDialog(true)}
                      >
                        Nueva Tarea
                      </Button>
                    </div>
                  </Grid>
                </Grid>

                <Grid container className="mt-6">
                  {!Tasks ? (
                    "Sin tareas Asignadas"
                  ) : (
                    <TableTasks tasks={Tasks} />
                  )}
                </Grid>
              </CardContent>
            </Card>

            {/* dialog proyecto nuevo  */}
            <NewTask
              projId={Project?._id}
              open={openNewTaskDialog}
              onSave={fetchTask}
              onClose={() => setOpenNewTaskDialog(false)}
            />
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default Projects;
