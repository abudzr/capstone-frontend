import { Grid,Link,MenuItem,Select, TextField } from "@mui/material";
import { setValueRequest } from "store/reducer-request";


export const columnsTableRequest = [
    {
      field: "no",
      headerName: "No",
      headerClassName: "super-app-theme--header",
      editable: false,
      width: 40,
    },
    {
      field: "notrans",
      headerName: "No Transaksi",
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
      renderCell: (params) => {
        return params.row.type.type
      }
    },
    {
      field: "department",
      headerName: "department",
      headerClassName: "super-app-theme--header",
      editable: false,
      width: 180,
      renderCell: (params) => {
        return params.row.department.code
      }
    },
    {
      field: "desc",
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
        const result = params.row.approvalDpt
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
                            result?.status === "APPROVED" ? "info-approved" : 
                            result?.status === "REJECTED" ? "info-rejected" :"info-pending"} 
                        >
                        {result?.status}
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
            }else{
              return (
                <Grid
                    container  
                    direction="row"
                    spacing={2} 
                    alignItems="center"
                >
                    <Grid item xs={6} >
                        <div className={"info-pending"} 
                        >
                        PENDING
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


export const itemsRequest = (option,dispatch) => ([
  {
    field: "no",
    headerName: "No",
    headerClassName: "super-app-theme--header",
    editable: false,
    width: 40,
  },
  {
    field: "itemUuid",
    headerName: "Item",
    headerClassName: "super-app-theme--header",
    editable: false,
    width: 200,
    renderCell: (params) => {
        return (
          <Select
            name="itemUuid"
            variant="outlined"
            sx={{
            width: "100%",
            height: 40,
            }}
            onChange={(e) => dispatch(setValueRequest({
              value : e.target,
              id:params.id
            })) }
        >
          {option && option.map((item)=>{
            return <MenuItem value={item.uuid}>{item.name}</MenuItem>
          })}
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
          name="qty"
          variant="outlined"
          onChange={(e) => dispatch(setValueRequest({
            value : e.target,
            id:params.id
          })) }
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
          name="price"
          variant="outlined"
          onChange={(e) => dispatch(setValueRequest({
            value : e.target,
            id:params.id
          })) }
          size="small"
          type="number"
        />
      )
    }
  },
  {
    field: "desc",
    headerName: "Description",
    headerClassName: "super-app-theme--header",
    editable: false,
    flex: 1,
    minWidth: 60,
    renderCell: (params) => {
      return (
        <TextField
        name="desc"
        variant="outlined"
        onChange={(e) => dispatch(setValueRequest({
          value : e.target,
          id:params.id
        })) }
        size="small"
        />
      )
    }
  },
]);

// service tabel
export const serviceRequest = (option, dispatch) => ([
  {
    field: "no",
    headerName: "No",
    headerClassName: "super-app-theme--header",
    editable: false,
    width: 40,
  },
  {
    field: "serviceUuid",
    headerName: "Service Name",
    headerClassName: "super-app-theme--header",
    editable: false,
    width: 200,
    renderCell: (params) => {
        return (
          <Select
            name="serviceUuid"
            variant="outlined"
            sx={{
            width: "100%",
            height: 40,
            }}
            onChange={(e) => dispatch(setValueRequest({
              value : e.target,
              id:params.id
            })) }
        >
          {option && option.map((item)=>{
            return <MenuItem value={item.uuid}>{item.name}</MenuItem>
          })}
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
          name="qty"
          variant="outlined"
          onChange={(e) => dispatch(setValueRequest({
            value : e.target,
            id:params.id
          })) }
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
          name="price"
          variant="outlined"
          onChange={(e) => dispatch(setValueRequest({
            value : e.target,
            id:params.id
          })) }
          size="small"
          type="number"
        />
      )
    }
  },
  {
    field: "desc",
    headerName: "Description",
    headerClassName: "super-app-theme--header",
    editable: false,
    flex: 1,
    minWidth: 60,
    renderCell: (params) => {
      return (
        <TextField
          name="desc"
          variant="outlined"
          onChange={(e) => dispatch(setValueRequest({
            value : e.target,
            id:params.id
          })) }
          size="small"
        />
      )
    }
  },
]);