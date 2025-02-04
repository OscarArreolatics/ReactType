import React from "react";
import Sidebar from "@/layouts/DashSlidebar";
import {
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useCallback, useState } from "react";
import task, { TaskI } from "@/api/task";
import TableTasks from "@/components/task/TableTasks";

const MyWork: React.FC = () => {
  const [TasksBefore, setTasksBefore] = useState<TaskI[]>();
  const [TasksToday, setTasksToday] = useState<TaskI[]>();
  const [TasksNextWeek, setTasksNextWeek] = useState<TaskI[]>();
  const [TasksAfter, setTasksAfter] = useState<TaskI[]>();
  const [TasksNoDate, setTasksNoDate] = useState<TaskI[]>();

  const fetchProject = useCallback(async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remover horas para comparar solo la fecha

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7); // Definir la siguiente semana

    const nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + 1); // Definir el siguiente dia
    try {
      const res = await task.getTasksUser();
      if (res) {
        const resul = res.filter((task) => task.status !== "completado");
        setTasksBefore(
          resul.filter((task) => task.dueDate && new Date(task.dueDate) < today)
        );
        setTasksToday(
          resul.filter(
            (task) =>
              task.dueDate &&
              new Date(task.dueDate).toDateString() === today.toDateString()
          )
        );
        setTasksNextWeek(
          resul.filter(
            (task) =>
              task.dueDate &&
              new Date(task.dueDate) >= nextDay &&
              new Date(task.dueDate) < nextWeek
          )
        );
        setTasksAfter(
          resul.filter(
            (task) => task.dueDate && new Date(task.dueDate) >= nextWeek
          )
        );
        setTasksNoDate(res.filter((task) => !task.dueDate));
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }, []);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return (
    <div className="bg-slate-200 pt-12 w-full">
      <Sidebar>
        <div>
          <Card
            variant="outlined"
            className="my-3 w-full p-3"
            sx={{ borderRadius: "0.5rem" }}
          >
            <h1 className="text-3xl font-medium">Mi Trabajo</h1>
            <CardContent>
              <Accordion className="border border-amber-900">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div>
                    <span className="text-amber-900 font-bold text-lg">
                      Fecha Pasadas
                    </span>
                    <span className="font-bold"> ({TasksBefore?.length})</span>{" "}
                    Elementos
                  </div>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: 0, paddingRight: 0 }}>
                  {!TasksBefore ? (
                    "Sin tareas Asignadas"
                  ) : (
                    <TableTasks tasks={TasksBefore} />
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion className="border border-cyan-600 mt-1">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <div>
                    <span className="text-cyan-600 font-bold text-lg">Hoy</span>
                    <span className="font-bold">
                      {" "}
                      ({TasksToday?.length})
                    </span>{" "}
                    Elementos
                  </div>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: 0, paddingRight: 0 }}>
                  {!TasksToday ? (
                    "Sin tareas Asignadas"
                  ) : (
                    <TableTasks tasks={TasksToday} />
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion className="border border-emerald-400 mt-1">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <div>
                    <span className="text-emerald-400 font-bold text-lg">
                      Proxima Semana
                    </span>
                    <span className="font-bold">
                      {" "}
                      ({TasksNextWeek?.length})
                    </span>{" "}
                    Elementos
                  </div>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: 0, paddingRight: 0 }}>
                  {!TasksNextWeek ? (
                    "Sin tareas Asignadas"
                  ) : (
                    <TableTasks tasks={TasksNextWeek} />
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion className="border border-amber-600 mt-1">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4-content"
                  id="panel4-header"
                >
                  <div>
                    <span className="text-amber-600 font-bold text-lg">
                      Mas adelante
                    </span>
                    <span className="font-bold"> ({TasksAfter?.length})</span>{" "}
                    Elementos
                  </div>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: 0, paddingRight: 0 }}>
                  {!TasksAfter ? (
                    "Sin tareas Asignadas"
                  ) : (
                    <TableTasks tasks={TasksAfter} />
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion className="border border-blue-800 mt-1">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5-content"
                  id="panel5-header"
                >
                  <div>
                    <span className="text-blue-800 font-bold text-lg">
                      Fin fecha
                    </span>
                    <span className="font-bold"> ({TasksNoDate?.length})</span>{" "}
                    Elementos
                  </div>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: 0, paddingRight: 0 }}>
                  {!TasksNoDate ? (
                    "Sin tareas Asignadas"
                  ) : (
                    <TableTasks tasks={TasksNoDate} />
                  )}
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  );
};

export default MyWork;
