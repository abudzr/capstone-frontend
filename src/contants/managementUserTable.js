import { Grid} from "@mui/material";
import { Link } from "react-router-dom";

export const columnsTableUser = [
    {
      field: "no",
      headerName: "No",
      headerClassName: "super-app-theme--header",
      editable: false,
      width: 40,
    },
    {
      field: "department",
      headerName: "Department",
      headerClassName: "super-app-theme--header",
      editable: false,
      width: 100,
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "super-app-theme--header",
      editable: false,
      flex:1,
      minWidth: 60,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      editable: false,
      flex:1,
      minWidth: 60,
    },
    {
      field: "role",
      headerName: "Role",
      headerClassName: "super-app-theme--header",
      editable: false,
      flex:1,
      minWidth: 60,
    },
    {
      field: "date",
      headerName: "Date",
      headerClassName: "super-app-theme--header",
      editable: false,
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      editable: false,
      flex:1,
      minWidth: 120,
      renderCell: (params) => {
        const status = params.row.status
        if (status) {
            return (
                <Grid
                  container  
                  direction="row"
                  spacing={2} 
                  alignItems="center"
                >
                  <Grid item xs={6} >
                    <div className={
                        status === "Active" ? "info-approved" : 
                        status === "Inactive" ? "info-rejected" :"info-pending"} 
                    >
                    {status}
                    </div>
                  </Grid>
                  <Grid item xs={6} >
                    <Link
                      underline="hover"
                      className="detail-user"
                      to={`detail/${params.id}`}
                    >
                      Update
                    </Link>
                  </Grid>
                </Grid>
            )
            }
        }
    },
];