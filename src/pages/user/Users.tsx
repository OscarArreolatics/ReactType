/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useEffect, useCallback, useState } from "react";
import { Card, CardContent, Button, Switch } from "@mui/material";
import { ControlPointOutlined } from "@mui/icons-material";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import Sidebar from "@/layouts/DashSlidebar";
import user from "@/api/user";
import { UserCoI } from "@/types/user";
import { formatDate } from "@/utils/utils";
import AvatarUser from "@/components/avatar/AvatarUser";
import UserNew from "@/components/user/UserNew";

ModuleRegistry.registerModules([AllCommunityModule]);

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserCoI[]>([]);
  const [openNewUser, setOpenNewUser] = useState<boolean>(false);

  const [colDefs] = useState<ColDef<UserCoI>[]>([
    {
      cellRenderer: (params: any) => <AvatarUser  user={{_id: params.data._id, name: params.data.name}} />,
      width: 130,
      cellClass: "flex justify-center items-center",
      sortable: false,
    },
    {
      field: "name",
      headerName: "Nombre",
      cellClass: "flex justify-center items-center",
      flex: 1
    },
    {
      field: "role",
      headerName: "Rol",
      cellClass: "flex justify-center items-center",
      flex: 1
    },
    {
      field: "email",
      headerName: "Correo Electrónico",
      cellClass: "flex justify-center items-center",
      flex: 1
    },
    {
      field: "createdAt",
      headerName: "Fecha de Creación",
      cellClass: "flex justify-center items-center",
      valueFormatter: (p) => formatDate(p.value),
      flex: 1
    },
    {
      field: "updatedAt",
      headerName: "Fecha de Actualización",
      cellClass: "flex justify-center items-center",
      valueFormatter: (p) => formatDate(p.value),
      flex: 1
    },
    {
      headerName: "status",
      cellClass: "flex justify-center items-center",
      cellRenderer: (params: any) => (
        <Switch
          checked={params.data.status}
          onChange={async () => {
            const newStatus = !params.data.status;
            params.data.status = newStatus;
            await handleDeleteUser(params.data._id);
            fetchUsers();
          }}
          color="primary"
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
      flex: 1
    },
  ]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await user.getUser();
      if (res) {
        setUsers(res);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const handleDeleteUser = async (userId: string) => {
    console.log("Delete user with ID:", userId);
    
  }

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
               <div className="flex justify-between">
              <h1 className="text-3xl font-medium">Usuarios</h1>
              <div>
                <Button
                    variant="contained"
                    color="success"
                    endIcon={<ControlPointOutlined />}
                    onClick={() => setOpenNewUser(true)}
                  >
                    Nueva Usuario
                  </Button>
                  </div>
              </div>
              <CardContent className="my-4" sx={{ padding: 0 }}>
                <div className="ag-theme-alpine" style={{ height: "auto" }}>
                  <AgGridReact
                    rowData={users}
                    columnDefs={colDefs}
                    domLayout="autoHeight"
                    rowHeight={50}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </Sidebar>
      </div>

      <UserNew 
        open={openNewUser}
        onClose={() => setOpenNewUser(false)}
        onSave={fetchUsers} />
    </>
  );
};

export default Users;
