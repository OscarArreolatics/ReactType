/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "@/css/tableTaskStyle.css";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Box } from "@mui/material";
import { formatDate } from "@/utils/utils";
import StatusTaskLabel from "@/components/task/StatusTaskLabel";
import PriorityTaskLabel from "@/components/task/PriorityTaskLabel";
import AvatarProject from "../avatar/AvatarProject";
import AvatarUser from "../avatar/AvatarUser";
import CommentTaskDialog from "@/components/task/CommentTaskDialog";
import { TaskI } from "@/types/task";


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
      cellClass: "flex justify-center items-center",
      minWidth: 350,
      flex: 1
    },
    {
      headerName: "Comentarios",
      field: "comments",
      cellClass: "flex justify-center items-center",
      cellRenderer: (params: any) => <CommentTaskDialog taskId={params.data._id} comments={params.data.comments} />,
      width: 120,
      sortable: false,
    },
    {
      headerName: "Proyecto",
      field: "projectId",
      cellRenderer: (params: any) => <AvatarProject project={params.data.projectId} />,
      width: 90,
      cellClass: "flex justify-center items-center",
    },
    {
      headerName: "Asignado a",
      field: "assignedTo.name",
      cellRenderer: (params: any) => <AvatarUser  user={params.data.assignedTo} />,
      width: 130,
      cellClass: "flex justify-center items-center",
    },
    {
      headerName: "Etapa",
      field: "stage",
      cellClass: "flex justify-center items-center",
      width: 170,
    },
    {
      headerName: "Estado",
      field: "status",
      cellRenderer: (params: any) => <StatusTaskLabel type={params.value} idTask={params.data._id} />,
      width: 170,
    },
    {
      headerName: "Prioridad",
      field: "priority",
      cellRenderer: (params: any) => <PriorityTaskLabel priority={params.value} idTask={params.data._id} />,
      width: 170,
    },
    {
      headerName: "Vencimiento",
      field: "dueDate",
      cellClass: "flex justify-center items-center",
      valueFormatter: (p) => formatDate(p.value),
      width: 170,
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
