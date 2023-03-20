/** Libs */
import * as React from 'react';
import {Breadcrumbs,Link, Grid} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }
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
                    href="/material-ui/getting-started/installation/"
                >
                    Dashboard
                </Link>
            </Breadcrumbs>
        </Grid>
        <Grid item xs={show ? 1 : 1}></Grid>
    </Grid>
)

}