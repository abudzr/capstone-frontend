/** Libs */
import React , {useEffect, useState} from 'react';
import {Breadcrumbs,Link, Grid, Typography, Box, Divider, Select, MenuItem, TextField} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
/** Global Components */

/** Assets */

/** Utils */
import {itemsRequest, serviceRequest} from 'contants/requestTable'
import "../request.css";
import { getSingleRequest } from 'services/request';
import { listServicetype, listOptionItem, listOptionService } from 'services/optionList';

export default function CreateRequest() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {show} = useSelector((state) => state.general);
    const { id } = useParams();
    const [dataHeader,setDataHeader] = useState({
        "description": '',
        "requestType": '' //uuid
    })

    const [requestType,setRequestType] = useState('');//value

    const [optionServicetype,setListServiceType] = useState([])
    const [optionDdlItem,setOptionDdlItem] = useState([])

    const [itemList, itemListSet] = useState([]);

    const fetchData = async () => {
        const response = await listServicetype();
        if(response?.data){
            setListServiceType(response?.data)
        }
    }

    const handleShowItem = (details, type) => {
        const allItem = [];
        details.map((item, idx) => {
            if(type === "Item"){
                const dataTemp = {
                        id: idx + 1,
                        no: idx + 1,
                        itemUuid: item.item.uuid,
                        qty: item.qty,
                        price: item.price,
                        desc: item.desc,
                    }
                allItem.push(dataTemp); 
            }else{
                const dataTemp = {
                        id: idx + 1,
                        no: idx + 1,
                        serviceUuid:item.service.uuid,
                        qty: item.qty,
                        price: item.price,
                        desc: item.desc
                    }
               allItem.push(dataTemp);
            }
        });
        itemListSet(allItem);
    }

    const getData = async () => {
        const response = await getSingleRequest({
            id: id
        });
        return response;
    }

    const getDataOption = async (type) => {
            // for ddl items table
            if (type === "Item") {
                const getOptionsItem = await listOptionItem();
                setOptionDdlItem(getOptionsItem)
            }else{
                const getOptionSerivice = await listOptionService();
                setOptionDdlItem(getOptionSerivice)
            }
    }

    useEffect(() => {
        fetchData();
    }, [])

    // Use Effect
    useEffect(() => {
        itemListSet([]);
        getData().then((data) => {
            setRequestType(data.type.type);
            getDataOption(data.type.type)
            setDataHeader({
                'description': data.desc,
                'requestType': data.type.uuid
            });
            handleShowItem(data.details, data.type.type);
        });
    }, []);


    
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
                    onClick = {
                        () => navigate("/request")
                    }
                >
                    Request
                </Link>
            </Breadcrumbs>

            {/* header content */}
            <Typography className='title-page' variant="h4" component="h4" mt={2}> 
                Detail Request
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
                    name='requestType'
                    variant="outlined"
                    sx={{
                        width: "512px",
                        height: 40,
                    }}
                    disabled
                    value={dataHeader.requestType}
                >
                   {optionServicetype && optionServicetype.map((item)=>{
                        return <MenuItem key={item.uuid} value={item.uuid}>{item.type}</MenuItem>
                    })}
                </Select>
                </Grid>
                <Grid item xs={4} mt={4}>
                    Keterangan
                </Grid>
                <Grid item xs={8} mt={4}>
                <TextField
                    name='description'
                    sx={{
                        width: "512px",
                        height: "139px",
                        }}
                        multiline
                        rows={4}
                        // maxRows={8}
                    id="outlined-basic" variant="outlined" placeholder='Isi Disini'
                    value={dataHeader.description}
                    disabled
                />
                </Grid>
            </Grid>
            
            {/* Item List */}

            <Box 
                sx={{ 
                    height: 350, width: '750px', marginTop:"20px", marginBottom:"20px",
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
                    rows={itemList}
                    columns={requestType === "Item" ? itemsRequest(optionDdlItem,dispatch) : serviceRequest(optionDdlItem, dispatch)}
                    initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                    disableRowSelectionOnClick
                    // onRowSelectionModelChange={(newRowSelectionModel) => {
                    //     setItemSelectionModel(newRowSelectionModel);
                    // }}
                    // rowSelectionModel={itemSelection}
                />
                </Box>
        </Grid>
        <Grid item xs={show ? 1 : 1}></Grid>
    </Grid>
)

}