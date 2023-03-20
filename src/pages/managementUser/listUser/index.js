/** Libs */
import React , { useEffect, useState } from 'react';
import {Breadcrumbs,Link, Grid, Typography, Box} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from "js-cookie";
import moment from "moment";
import { setIslogin } from 'store/reducer-auth';
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'

/** Global Components */
import {Button as CustomizeButton} from 'components';

/** Assets */

/** Utils */
import {columnsTableUser} from 'contants/managementUserTable'
import "../managementUser.css";
import { serviceUsers } from 'services/users';

export default function ListUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {show} = useSelector((state) => state.general);
    const [listData, setListData] = useState([]);
    const token = Cookies.get("token");

    const getUser = async () => {
        const data = await serviceUsers({
            token: token
        });
        return data;
    }
    
    // Use Effect
    useEffect(() => {
        getUser().then( users => {
            if (users.message === 'Request failed with status code 401') {
                dispatch(setIslogin(false));
                navigate('/login');
            }
            const newData = users.data.map((val, idx) => {
                return {
                    id: val.uuid,
                    no: idx + 1,
                    username: val.username,
                    department: val.departments[0].code,
                    email: val.email,
                    status: val.active ? 'Active' : 'Inactive',
                    date: moment(val.createdon).format('DD-MM-YYYY H:mm:ss'),
                    role: val.roles[0].name,
                };
            });
            setListData(newData);
        });
    })
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
                    href="/management-user"
                >
                    Management User
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
                        Management User
                    </Typography>
                </Grid>
                <Grid>
                    <CustomizeButton
                        title="Create"
                        btn="button-create"
                        color="blue"
                        onClick={()=>navigate("/management-users/create")}
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
                    columns={columnsTableUser}
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