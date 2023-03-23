import { Grid, Typography} from "@mui/material";
import { setListModule, setUuidApproval } from "store/reducer-approval";

export const columnsTableApproval = (navigate,dispatch) => ([
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
    width: 200,
    renderCell: (params) => {
      return params.row.department.code
    }
  },
  // {
  //   field: "type",
  //   headerName: "Type",
  //   headerClassName: "super-app-theme--header",
  //   editable: false,
  //   width: 100,
  // },
  {
    field: "description",
    headerName: "Short Text",
    headerClassName: "super-app-theme--header",
    editable: false,
    flex:1,
    minWidth: 60,
  },
  {
    field: "createdon",
    headerName: "Date",
    headerClassName: "super-app-theme--header",
    editable: false,
    width: 240,
  },
  {
    field: "status",
    headerName: "Hasil",
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
                          status === "APPROVED" ? "info-approved" : 
                          status === "REJECTED" ? "info-rejected" :"info-pending"} 
                      >
                      {status}
                      </div>
                      </Grid>
                  <Grid item xs={6} >
                    <Typography className="detail-request" onClick={(e)=>{
                      navigate(`/approval/${params.id}`)
                      dispatch(setListModule(params.row.module))
                      dispatch(setUuidApproval(params.row.uuid))
                    }}>Detail</Typography>
                  {/* <Link
                      underline="hover"
                      className="detail-request"
                      // href={`/approval/${params.id}}`}
                  >
                      Detail
                  </Link> */}
                  </Grid>
              </Grid>
          )
          }
      }
  },
]);






// item table
export const itemsApproval = () => ([
  {
    field: "no",
    headerName: "No",
    headerClassName: "super-app-theme--header",
    editable: false,
    width: 40,
  },
  {
    field: "item",
    headerName: "Item",
    headerClassName: "super-app-theme--header",
    editable: false,
    width: 200,
    renderCell: (params) => {
      return params.row.item.name
    }
  },
  {
    field: "qty",
    headerName: "Qty",
    headerClassName: "super-app-theme--header",
    editable: false,
    minWidth: 60,
  },
  {
    field: "price",
    headerName: "Price",
    headerClassName: "super-app-theme--header",
    editable: false,
    minWidth: 60,
  },
  {
    field: "desc",
    headerName: "Description",
    headerClassName: "super-app-theme--header",
    editable: false,
    flex: 1,
    minWidth: 60,
  },
]);

// service tabel
export const serviceApproval = () => ([
  {
    field: "no",
    headerName: "No",
    headerClassName: "super-app-theme--header",
    editable: false,
    width: 40,
  },
  {
    field: "service",
    headerName: "Service Name",
    headerClassName: "super-app-theme--header",
    editable: false,
    width: 200,
    renderCell: (params) => {
      return params.row.service.name
    }
  },
  {
    field: "qty",
    headerName: "Qty",
    headerClassName: "super-app-theme--header",
    editable: false,
    minWidth: 60,
  },
  {
    field: "price",
    headerName: "Price",
    headerClassName: "super-app-theme--header",
    editable: false,
    minWidth: 60,
  },
  {
    field: "desc",
    headerName: "Description",
    headerClassName: "super-app-theme--header",
    editable: false,
    flex: 1,
    minWidth: 60,
  },
]);