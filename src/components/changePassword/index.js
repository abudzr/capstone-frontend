import React, {useState} from 'react'
import {Dialog,DialogTitle,DialogContent,DialogActions,DialogContentText,Grid, Typography} from "@mui/material"

import {Button as CustomizeButton} from 'components'
import './changePassword.css'

function ChangePassword(props) {

    const [data,setData]=useState({
        currentPassword:"",
        newPassword:"",
        confirmPassword:""
    })
    const handleChange = (e) => {
        const dataNew = { ...data };
        dataNew[e.target.name] = e.target.value;
        setData(dataNew);
      };

    
    const handleSubmit=()=>{
        // logic here for change password
        
    }
    
  return (
    <Dialog
            fullWidth={true}
            maxWidth="md"
            open={props.open}
            onClose={props.close}
          >
            <DialogTitle>Ubah Kata Sandi</DialogTitle>
            <DialogContent dividers>
            <DialogContentText className="dialog-changePass">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label htmlFor="currentPassword">Current Password</label>
              </Grid>
              <Grid item xs={8}>
                  <input type="password" id="currentPassword" name="currentPassword" value={data.currentPassword} onChange={handleChange} />
              </Grid>
              <Grid item xs={4}>
                <label htmlFor="newPassword">New Password</label>
              </Grid>
              <Grid item xs={8}>
                 <input type="password" id="newPassword" name="newPassword" value={data.newPassword} onChange={handleChange}/>
                <Typography className='info'>Password must be min. 8 characters, consisted of aphanumeric, uppercase, lowercase, and special character (!@#$%^&*)</Typography>
              </Grid>
              <Grid item xs={4}>
                <label htmlFor="confirmPassword">Confirm Password</label>
              </Grid>
              <Grid item xs={8}>
                  <input type="password" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} />
              </Grid>
            </Grid>
            
          </DialogContentText>
            </DialogContent>
           <DialogActions>
                    <CustomizeButton
                        onClick={props.close}
                        btn="button-reset"
                        title="Cancel"
                    />
                     <CustomizeButton
                        title="Submit"
                        btn="button-create"
                        color="blue"
                        onClick={handleSubmit}
                    />
        </DialogActions>
          </Dialog>
  )
}

export default ChangePassword