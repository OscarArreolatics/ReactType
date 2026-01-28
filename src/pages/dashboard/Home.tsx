import React, { useState, useCallback, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Grid from "@mui/material/Grid2";
import Sidebar from "@/layouts/DashSlidebar";
import { Card, CardContent } from "@mui/material";

import ProjectsApi from "@/api/project";
import { ProjectTaskReportI } from "@/types/project";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<ProjectTaskReportI[]>([]);

  const fecthProjects = useCallback(async () => {
    try {
      const res = await ProjectsApi.getProjectsTaskReport();
      if (res) {
        setProjects(res);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, []);

  useEffect(() => {
    fecthProjects();
  }, [fecthProjects]);

  return (
    <div className="bg-slate-200 pt-12 w-full">
      <Sidebar>
        <h1 className="text-3xl font-medium py-3">Dashboard</h1>
        <Grid container spacing={2} className="mb-4">
          <Grid size={{ xs: 12, md: 6, lg: 6 }} className="flex items-center">
            <Card className="w-full pt-4">
              <h2 className="text-2xl font-medium text-center">Estatus de tareas por proyectos</h2>
              <CardContent>
                <ResponsiveContainer width="100%" minHeight={400}>
                  <BarChart
                    height={300}
                    data={projects}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      interval={0}
                      tickFormatter={(value) =>
                        value.length > 10 ? value.substring(0, 10) + "…" : value
                      }
                    />

                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completadas" stackId="a" fill="#60a5fa" />
                    <Bar dataKey="pendientes" stackId="a" fill="#94a3b8" />
                    <Bar dataKey="en_proceso" stackId="a" fill="#34d399" />
                    <Bar dataKey="canceladas" stackId="a" fill="#f87171" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Sidebar>
    </div>
  );
};

export default Home;
