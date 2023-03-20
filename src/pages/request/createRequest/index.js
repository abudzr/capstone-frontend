/** Libs */
import React , {useState} from 'react';
import {Breadcrumbs,Link, Grid, Typography, Box, Divider, Select, MenuItem, TextField} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

/** Global Components */
import {Button as CustomizeButton} from 'components';

/** Assets */

/** Utils */
import {itemsRequest, serviceRequest} from 'contants/requestTable'
import "../request.css";

export default function CreateRequest() {
    const {show} = useSelector((state) => state.general);
    const [data,setData] = useState({
        requestType:'item',
        desciption:''
    })
    const listData = [
        {
            id:1,
            no:1,
            item:'Laptop',
            qty:1,
            price:"1.500.000",
            description:"Macbook",
        },
        {
            id:2,
            no:2,
            item:'Laptop',
            qty:1,
            price:"1.500.000",
            description:"Macbook",
        },
        {
            id:3,
            no:3,
            item:'Laptop',
            qty:1,
            price:"1.500.000",
            description:"Macbook",
        }
    ]
    // Use Effect

    return (
    <Grid
        sx={{ flexGrow: 1 }}  
        container  
        direction="row"
        alignItems="center"
        spacing={3} 
        style={{marginTop:"20px"}}
        gap={show && 4}
    >
        <Grid item xs={show ? 2 : 1}></Grid>
        <Grid item xs={show ? 9 :10}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                </Link>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/request"
                >
                    Request
                </Link>
            </Breadcrumbs>

            {/* header content */}
            <Typography className='title-page' variant="h4" component="h4" mt={2}> 
                Create Request
            </Typography>
            <Grid 
                container  
                direction="row"
                mt={4}
            >
                <Grid item xs={6}>
                    <Typography className='info-title-page' variant="h6" component="h6" > 
                        Informasi Dasar
                    </Typography>
                    <Typography className='info-subtitle-page' variant="h7" component="h7" > 
                        Periksa kembali pastikan data sudah benar.
                    </Typography>
                </Grid>
                <Grid 
                    container  
                    direction="row"
                    item xs={6}
                    justifyContent="end"
                    gap={2}
                    >
                    <Grid>
                        <CustomizeButton
                            title="Atur Ulang"
                            btn="button-reset"
                        />
                    </Grid>
                    <Grid>
                        <CustomizeButton
                            title="Simpan"
                            btn="button-create"
                            color="blue"
                        />
                    </Grid>
                </Grid>
            </Grid>
            
            <Divider style={{color:"#EAECF0", marginTop:"20px", marginBottom:"20px"}}/>

            {/* content */}
            <Grid  
                container  
                direction="row"
            >
                <Grid item xs={4}>
                    Request Type
                </Grid>
                <Grid item xs={8}>
                <Select
                    variant="outlined"
                    sx={{
                    width: "512px",
                    height: 40,
                    }}
                    value={data.requestType}
                    onChange={(e) => setData({...data, requestType:e.target.value})}
                >
                    <MenuItem value="item">Item</MenuItem>
                    <MenuItem value="service">Service</MenuItem>
                </Select>
                </Grid>
                <Grid item xs={4} mt={4}>
                    Keterangan
                </Grid>
                <Grid item xs={8} mt={4}>
                <TextField
                    sx={{
                        width: "512px",
                        height: "139px",
                        }}
                        multiline
                        rows={4}
                        maxRows={8}
                    id="outlined-basic" variant="outlined" placeholder='Isi Disini'
                    value={data.desciption}
                    onChange={(e) => setData({...data, desciption:e.target.value})}
                />
                </Grid>
            </Grid>
            
            {/* button action item list */}
            <Grid
                container  
                direction="row"
                gap={3}
                mt={4}
            >
                <CustomizeButton
                    title="Add"
                    btn="button-create"
                    color="navy"
                />
                <CustomizeButton
                    title="Delete"
                    btn="button-delete"
                    color="red"
                />
            </Grid>
            {/* Item List */}

            <Box 
                sx={{ 
                    height: 350, width: '700px', marginTop:"20px", marginBottom:"20px",
                    "& .super-app-theme--header": {
                        backgroundColor: "#EAECF0",
                        color: "#344054",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: "bold",
                      },
                }}>
                <DataGrid
                    sx={{
                        "& .MuiDataGrid-cell:hover": {
                          color: "primary.main",
                        },
                        "& .MuiDataGrid-cell": {
                          fontFamily: "Inter",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#344054",
                        },
                        borderRadius: "12px",
                      }}
                    rows={listData}
                    columns={data.requestType === "item" ? itemsRequest() : serviceRequest()}
                    initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
                </Box>
        </Grid>
        <Grid item xs={show ? 1 : 1}></Grid>
    </Grid>
)

}