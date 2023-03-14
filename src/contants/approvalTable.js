import { Grid,Link} from "@mui/material";

export const columnsTableApproval = [
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
    },
    {
      field: "type",
      headerName: "Type",
      headerClassName: "super-app-theme--header",
      editable: false,
      width: 100,
    },
    {
      field: "shortText",
      headerName: "Short Text",
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
      width: 240,
    },
    {
      field: "result",
      headerName: "Hasil",
      headerClassName: "super-app-theme--header",
      editable: false,
      flex:1,
      minWidth: 120,
      renderCell: (params) => {
        const result = params.row.result
        if (result) {
            return (
                <Grid
                    container  
                    direction="row"
                    spacing={2} 
                    alignItems="center"
                >
                    <Grid item xs={6} >
                        <div className={
                            result === "Approved" ? "info-approved" : 
                            result === "Rejected" ? "info-rejected" :"info-pending"} 
                        >
                        {result}
                        </div>
                        </Grid>
                    <Grid item xs={6} >
                    <Link
                        underline="hover"
                        className="detail-request"
                        href={`/approval/${params.id}}`}
                    >
                        Detail
                    </Link>
                    </Grid>
                </Grid>
            )
            }
        }
    },
];

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
    field: "description",
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
    field: "description",
    headerName: "Description",
    headerClassName: "super-app-theme--header",
    editable: false,
    flex: 1,
    minWidth: 60,
  },
]);