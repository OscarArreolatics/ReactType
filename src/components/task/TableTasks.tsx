/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Box } from "@mui/material";
import { TaskI } from "@/api/task";
import { formatDate } from "@/utils/utils";
import StatusLabel from "../StatusLabel";
import PriorityLabel from "../PriorityLabel";
import AvatarProject from "../AvatarProject";
import AvatarUser from "../AvatarUser";
import "@/css/tableTaskStyle.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const TableTask: React.FC<{ tasks: TaskI[] }> = ({ tasks }) => {

  const [colDefs] = useState<ColDef<TaskI>[]>([
    {
      headerName: "Tarea",
      field: "title",
      cellClass: "flex justify-center items-center",
    },
    {
      headerName: "Descripcion",
      field: "description",
      flex: 2,
      cellClass: "flex justify-center items-center",
    },
    {
      headerName: "Proyecto",
      cellRenderer: (params: any) => <AvatarProject project={params.data.projectId} />,
      width: 100,
      cellClass: "flex justify-center items-center",
    },
    {
      headerName: "Asignado a",
      cellRenderer: (params: any) => <AvatarUser  user={params.data.assignedTo} />,
      width: 120,
      cellClass: "flex justify-center items-center",
    },
    {
      headerName: "Etapa",
      field: "stage",
      cellClass: "flex justify-center items-center",
    },
    {
      headerName: "Estado",
      field: "status",
      cellRenderer: (params: any) => <StatusLabel type={params.value} />,
    },
    {
      headerName: "Prioridad",
      field: "priority",
      cellRenderer: (params: any) => <PriorityLabel priority={params.value} />,
    },
    {
      headerName: "Vencimiento",
      field: "dueDate",
      cellClass: "flex justify-center items-center",
      valueFormatter: (p) => formatDate(p.value),
    },
  ]);

  return (
    <Box sx={{ width: "100%" }}>
      <div className="ag-theme-alpine" style={{ height: "auto" }}>
        <AgGridReact
          rowData={tasks}
          columnDefs={colDefs}
          domLayout="autoHeight"
          rowHeight={50}
        />
      </div>
    </Box>
  );
};

export default TableTask;
