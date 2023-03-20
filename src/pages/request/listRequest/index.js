/** Libs */
import React , { useEffect } from 'react';
import {Breadcrumbs,Link, Grid, Typography, Box} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom'

/** Global Components */
import {Button as CustomizeButton} from 'components';

/** Assets */

/** Utils */
import {columnsTableRequest} from 'contants/requestTable'
import "../request.css";
import { serviceListRequest } from 'services/request';
import { setListData } from 'store/reducer-request';

export default function ListRequest() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {show,department} = useSelector((state) => state.general);
    const {listData} = useSelector((state) => state.request);

    const fetchData = async (state) => {
        const response = await serviceListRequest({
            departmentid:department[0].id,
        })
        dispatch(setListData(response));
    }

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line
    }, [])
    

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
            <Grid 
                container  
                direction="row"
                justifyContent="space-between"
            >
                <Grid>
                    <Typography className='title-page' variant="h4" component="h4" mt={2} > 
                        Request
                    </Typography>
                </Grid>
                <Grid>
                    <CustomizeButton
                        title="Create"
                        btn="button-create"
                        color="blue"
                        onClick={()=>navigate("/request/create")}
                    />
                </Grid>
            </Grid>
            
            {/* list table */}
            <Box 
                sx={{ 
                    height: 700, width: '100%', marginTop:"20px",
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
                    columns={columnsTableRequest}
                    initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                    pageSizeOptions={[5,10]}
                    disableRowSelectionOnClick
                />
                </Box>
        </Grid>
        <Grid item xs={show ? 1 : 1}></Grid>
    </Grid>
)

}