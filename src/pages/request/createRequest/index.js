/** Libs */
import React , {useEffect, useState} from 'react';
import {Breadcrumbs,Link, Grid, Typography, Box, Divider, Select, MenuItem, TextField} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate} from "react-router-dom";

/** Global Components */
import {Button as CustomizeButton} from 'components';

/** Assets */

/** Utils */
import {itemsRequest, serviceRequest} from 'contants/requestTable'
import "../request.css";
import { listServicetype, listOptionItem, listOptionService } from 'services/optionList';
import { setItemListRedux } from 'store/reducer-request';
import { addRequest } from 'services/request';
import { addApproval } from 'services/approval';

export default function CreateRequest() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {show} = useSelector((state) => state.general);
    const {itemListRedux} = useSelector((state) => state.request);

    const [dataHeader,setDataHeader] = useState({
        "description": '',
        "requestType": '' //uuid
    })

    const [requestType,setRequestType] = useState('');//value

    const [optionServicetype,setListServiceType] = useState([])
    const [optionDdlItem,setOptionDdlItem] = useState([])

    const [countItem,setCountItem] = useState(0)
    const [itemSelection, setItemSelectionModel] = React.useState([]);

    const fetchData = async () => {
        const response = await listServicetype();
        if(response?.data){
            setListServiceType(response?.data)
        }
    }

    const handleChangeHeader = async (e) => {
        const dataTemp = dataHeader;
        dataTemp[e.name] = e.value;
        setDataHeader(dataTemp);

        if(e.name === 'requestType'){
            const findRequestType = optionServicetype.find((item)=>item.uuid === e.value)
            setRequestType(findRequestType?.type)

            // for ddl items table
            if (findRequestType?.type === "Item") {
                const getOptionsItem = await listOptionItem();
                setOptionDdlItem(getOptionsItem)
            }else{
                const getOptionSerivice = await listOptionService();
                setOptionDdlItem(getOptionSerivice)
                
            }
        }
        
    }
    
    const handleAddItem = (number) => {
        number += 1;
        setCountItem(number);

        if(requestType === "Item"){
            const dataTemp = [
                ...itemListRedux,
                {
                  id: number,
                  no: number,
                  itemUuid: '',
                  qty: null,
                  price: null,
                  desc:''
                },
            ]
            // setItemList(dataTemp);
            dispatch(setItemListRedux(dataTemp))
        }else{
            const dataTemp = [
                ...itemListRedux,
                {
                id: number,
                no: number,
                itemUuid:'',
                qty: null,
                price: null,
                desc:''
                },
            ]
            // setItemList(dataTemp);
            dispatch(setItemListRedux(dataTemp));
        }
       
    }

    const handleDeleteItem = () => {
        if(itemSelection.length > 0){
            const dateTemp = itemListRedux
            const filterData = dateTemp.filter(item => !itemSelection.includes(item.no));
            dispatch(setItemListRedux(filterData));
            // setItemList(filterData)
        }
    }

    const handleCreate = () => {
        const newArr = itemListRedux.map(({itemUuid, serviceUuid, qty,price,desc}) => {
            return {itemUuid, serviceUuid, qty,price,desc};
          });

        const dataTemp = {
            "header": {
                "typeUuid": dataHeader.requestType,
                "description": dataHeader.description
            },
            details:newArr
        }
        createRequest(dataTemp)
    }


    const createRequest = async (data) =>{
        const response = await addRequest(data);
        if(response?.requestUuid){
            const callApiApproval = await addApproval(
                {
                    "requestuuid": response?.requestUuid,
                    "modulename": "ApprovalHeadDept",
                    "explain": ""
                }
            );

            if (callApiApproval){
                navigate("/request")
            }
        }
    }

    // Use Effect
    useEffect(() => {
        fetchData()
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
                            onClick={(e)=>handleCreate()}
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
                    name='requestType'
                    variant="outlined"
                    sx={{
                    width: "512px",
                    height: 40,
                    }}
                    value={dataHeader.typeUuid}
                    onChange={(e) =>  handleChangeHeader(e.target)}
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
                    // onChange={(e) =>  handleChangeHeader(e.target)}

                    onChange={(e) => setDataHeader({...dataHeader, description:e.target.value})}
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
                    onClick={()=>handleAddItem(countItem)}
                />
                <CustomizeButton
                    title="Delete"
                    btn="button-delete"
                    color="red"
                    onClick={()=>handleDeleteItem()}
                    disabled={itemSelection.length <= 0 && true}
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
                    rows={itemListRedux}
                    columns={requestType === "Item" ? itemsRequest(optionDdlItem,dispatch) : serviceRequest(optionDdlItem, dispatch)}
                    initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setItemSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={itemSelection}
                />
                </Box>
        </Grid>
        <Grid item xs={show ? 1 : 1}></Grid>
    </Grid>
)

}