import { Grid,Link,MenuItem,Select, TextField } from "@mui/material";

export const columnsTableRequest = [
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
                            result === "Approved" ? "button-approved" : 
                            result === "Rejected" ? "button-rejected" :"button-pending"} 
                        >
                        {result}
                        </div>
                        </Grid>
                    <Grid item xs={6} >
                    <Link
                        underline="hover"
                        className="detail-request"
                        href={`/request/${params.id}}`}
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
const inputProps = {
  step: 300,
};

export const itemsRequest = () => ([
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
        return (
          <Select
            variant="outlined"
            sx={{
            width: "100%",
            height: 40,
            }}
            onChange={(e) => {}}
        >
            <MenuItem value="laptop">Laptop</MenuItem>
            <MenuItem value="printer">Printer</MenuItem>
        </Select>
        )
    }
  },
  {
    field: "qty",
    headerName: "Qty",
    headerClassName: "super-app-theme--header",
    editable: false,
    minWidth: 60,
    renderCell: (params) => {
      return (
        <TextField
          variant="outlined"
          onChange={(e) => {}}
          inputProps={inputProps}
          size="small"
          type="number"
        />
      )
    }
  },
  {
    field: "price",
    headerName: "Price",
    headerClassName: "super-app-theme--header",
    editable: false,
    minWidth: 60,
    renderCell: (params) => {
      return (
        <TextField
          variant="outlined"
          onChange={(e) => {}}
          inputProps={inputProps}
          size="small"
          type="number"
        />
      )
    }
  },
  {
    field: "description",
    headerName: "Description",
    headerClassName: "super-app-theme--header",
    editable: false,
    flex: 1,
    minWidth: 60,
    renderCell: (params) => {
      return (
        <TextField
          variant="outlined"
          onChange={(e) => {}}
          inputProps={inputProps}
          size="small"
        />
      )
    }
  },
]);

// service tabel
export const serviceRequest = () => ([
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
        return (
          <Select
            variant="outlined"
            sx={{
            width: "100%",
            height: 40,
            }}
            onChange={(e) => {}}
        >
            <MenuItem value="jasa">Jasa</MenuItem>
        </Select>
        )
    }
  },
  {
    field: "qty",
    headerName: "Qty",
    headerClassName: "super-app-theme--header",
    editable: false,
    minWidth: 60,
    renderCell: (params) => {
      return (
        <TextField
          variant="outlined"
          onChange={(e) => {}}
          inputProps={inputProps}
          size="small"
          type="number"
        />
      )
    }
  },
  {
    field: "price",
    headerName: "Price",
    headerClassName: "super-app-theme--header",
    editable: false,
    minWidth: 60,
    renderCell: (params) => {
      return (
        <TextField
          variant="outlined"
          onChange={(e) => {}}
          inputProps={inputProps}
          size="small"
          type="number"
        />
      )
    }
  },
  {
    field: "description",
    headerName: "Description",
    headerClassName: "super-app-theme--header",
    editable: false,
    flex: 1,
    minWidth: 60,
    renderCell: (params) => {
      return (
        <TextField
          variant="outlined"
          onChange={(e) => {}}
          inputProps={inputProps}
          size="small"
        />
      )
    }
  },
]);