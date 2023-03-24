/** Libs */
import React , { useEffect, useState } from 'react';
import {Breadcrumbs,Link, Grid, Typography, Box, Divider, TextField} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';

import {Button as CustomizeButton} from 'components';
import RejectedDialog from '../component/rejectedDialog'


/** Assets */

/** Utils */
import {itemsApproval, serviceApproval} from 'contants/approvalTable'
import { serviceListRequest } from 'services/request';
import "../approval.css";
import Swal from 'sweetalert2';
import { updateApproval, addApproval } from 'services/approval';

export default function DetailApproval() {
    const navigate = useNavigate()
    let { id } = useParams();

    const {show} = useSelector((state) => state.general);
    const {listModule, uuidAproval} = useSelector((state) => state.approval);
    const [data, setData] = useState([])
    const [itemList, setItemList] = useState([])

    // dialog rejected
    const [openModal, setOpenModal] = useState(false);
    const [isConfirmed, setConfirmed] = useState(false);
    const [description, setDescription] = useState("");

    const handleApprove = (status) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "you want to approve this request",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Approved'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await updateApproval({
                    uuid:uuidAproval,
                    data:{"status": "APPROVED","explain": "Approved"}
                })

                if (data.approvalFnc == null) {
                    await addApproval(
                        {
                            "requestuuid": data.uuid,
                            "modulename": "ApprovalHeadFNC",
                            "explain": ""
                        }
                    );
                }
                if (response){
                    Swal.fire(
                        'Approved!',
                        'Request berhasil di approve.',
                        'success'
                    )
                    navigate('/approval')
                }
            }
          })
    }

    const handleReject = () =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "you want to reject this request",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Rejected'
          }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await updateApproval({
                    uuid:uuidAproval,
                    data:{
                        "status": "REJECTED",
                        "explain": description
                    }
                })
                if (response){
                    Swal.fire(
                        'Rejected!',
                        'Request berhasil di reject.',
                        'success'
                    )
                    navigate('/approval')
                }
            }
          })
    }


    // Use Effect

    const fetchData = async (id) => {
        const paramsTemp = {}
        if (listModule?.name === "ApprovalHeadDept") {
            paramsTemp.approvalheadid = id
        }
        if (listModule?.name === "ApprovalHeadFNC"){
            paramsTemp.approvalfncid = id
        }
        const response = await serviceListRequest(paramsTemp);
        if (response) {
            const detailsTemp = response[0].details

            detailsTemp.forEach((v,i)=> {
                v.id = i+1
                v.no = i+1
            });
            
            setData(response[0])
            setItemList(detailsTemp)

        }
    }

    useEffect(() => {
      if(id){
        fetchData(id)
      } // eslint-disable-next-line
    }, [id])
    
    useEffect(() => {
        if(isConfirmed){
            handleReject()
        }
        // eslint-disable-next-line
    },[isConfirmed])
    
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
                    href="/approval"
                >
                    Approval
                </Link>
            </Breadcrumbs>

            {/* header content */}
            <Typography className='title-page' variant="h4" component="h4" mt={2}> 
                Detail Approval
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
                            title="Reject"
                            btn="button-reject"
                            onClick={()=>setOpenModal(true)}
                        />
                    </Grid>
                    <Grid>
                        <CustomizeButton
                            title="Approve"
                            btn="button-approve"
                            onClick={()=>handleApprove()}
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
                    Department
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        sx={{
                            width: "512px",
                            height: 40,
                            }}
                        id="outlined-basic" variant="outlined" 
                        value={data?.department?.code}
                        disabled
                    />
                </Grid>
                <Grid item xs={4} mt={4}>
                    Request Type
                </Grid>
                <Grid item xs={8} mt={4}>
                <TextField
                    sx={{
                        width: "512px",
                        height: 40,
                        }}
                    id="outlined-basic" variant="outlined" 
                    value={data?.type?.type}
                    disabled
                />
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
                    id="outlined-basic" variant="outlined" 
                    value={data?.desc}
                    disabled
                />
                </Grid>
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
                    rows={itemList}
                    columns={data?.type?.type === "Item" ? itemsApproval() : serviceApproval()}
                    initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                    disableRowSelectionOnClick
                />
                </Box>
            <RejectedDialog
                isModal={openModal} 
                onClose={setOpenModal}
                onConfirm={setConfirmed}
                onDescription={setDescription}
            />
        </Grid>
        <Grid item xs={show ? 1 : 1}></Grid>
    </Grid>
)

}