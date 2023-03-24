/** Libs */
import * as React from 'react';
import {Breadcrumbs,Link, Grid, Divider, Typography} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import ChartStatus from './component/chartStatus';
import ChartUser from './component/chartUser';
import ChartDepartment from './component/chartDepartment';
import ChartRequest from './component/chartRequest';

import {data} from './contants'
/** Global Components */

/** Local Components */

/** Assets */

/** Utils */

export default function Home() {
    const {show} = useSelector((state) => state.general);
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
                    href="/"
                >
                    Dashboard
                </Link>
            </Breadcrumbs>

            {/* header content */}
            <Typography className='title-page' variant="h4" component="h4" mt={2}> 
                Dashboard
            </Typography>
            <Grid 
                container  
                direction="row"
                mt={4}
            >
                <Grid item xs={6}>
                    <Typography className='info-subtitle-page' variant="h7" component="h7" > 
                        Reporting dari seluruh aktivitas Procurement
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
                        {/* <CustomizeButton
                            title="Reject"
                            btn="button-reject"
                            onClick={()=>setOpenModal(true)}
                        /> */}
                    </Grid>
                </Grid>
                <Grid
                    container  
                    direction="row"
                    mt={4}
                >
                    <Grid item xs={6}><ChartStatus/></Grid>
                    <Grid item xs={6}><ChartRequest data={data} xKey="name" yKey="pv"/></Grid>
                    <Grid item xs={6}><ChartUser/></Grid>
                    <Grid item xs={6}><ChartDepartment/></Grid>


                </Grid>
                
            </Grid>
            
            <Divider style={{color:"#EAECF0", marginTop:"20px", marginBottom:"20px"}}/>
        </Grid>
        <Grid item xs={show ? 1 : 1}></Grid>
    </Grid>
)

}
