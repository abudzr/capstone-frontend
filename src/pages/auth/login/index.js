import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// import { useAuth } from "hooks/auth";
import { serviceInfoUser, serviceLogin } from "services/auth";

// component
import { Button } from "../../../components"

// assets
import backgroundLogin from '../../../assets/image/background-login.svg'
import vectorLogin from "../../../assets/image/login-side-left.svg"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../auth.css'
import { setIslogin } from "store/reducer-auth";
import { useDispatch } from "react-redux";
import { setListMenu } from "store/reducer-general";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export default function Login() {
  const dispatch = useDispatch();
  const [isShow,setShow] = useState(false);
  const { register,getValues, formState: { errors, touchedFields } } = useForm({ mode: 'onBlur' });

  // const {isLoggedIn, isLoggedInSet} = useAuth();
  let navigate = useNavigate();
  // Func
  const handleLogin = async () => {
    const values = getValues()
    const response = await serviceLogin({
      username: values?.username,
      password: values?.password,
    });
    if (response.httpStatus === "OK") {
      let token = response?.data
      if (token) {

        const infoUser = await serviceInfoUser({
          token: token,
          username: values?.username
        });
        if (infoUser?.data) {
          dispatch(setListMenu(infoUser?.data))
          Cookies.set("token", token)
          Cookies.set("username", values?.username)
          dispatch(setIslogin(true))
          navigate('/');
        }
      }
    }else{
      Toastify({
        text: "Username tidak terdaftar",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#CB605A",
        },
      }).showToast();
    }
  }

  return (
      <Grid
        sx={{ flexGrow: 1 }}  
        container  
        direction="row"
      >
        <Grid item xs={8} className="auth-login-side-left">
          <img className="background-login-img" src={backgroundLogin} alt="vector-background-login"/>
          <Typography className="auth-login-side-left-title">Welcome to Procurement Management System</Typography>
          <Typography mt={4} className="auth-login-side-left-subtitle">Please sign in to continue</Typography>
          <img className="vector-login-img" src={vectorLogin} alt="vector-login"/>
        </Grid>
        <Grid item xs={4} className="auth-login-side-right">
            <div className="mb-3" style={{width:"100%"}}>
              <input {...register("username", { required: { value: true, message: 'username Required!' } })} type="email" id="email" placeholder="email" />
              <div className="error">
                {touchedFields?.email && errors?.email && errors?.email?.message}
              </div>
            </div>
            <div style={{marginBottom:"50px"}} className="password">
              <input {...register("password", { required: true, minLength: 6 })} type={isShow ? "text":"password"}  id="pass" placeholder="password" />
              <div className="icon" onClick={()=>setShow(!isShow)}>{isShow ? <VisibilityOffIcon/>:<VisibilityIcon/>}</div>
            </div>
            <Button
              btn="button-login"
              title="Login"
              onClick={()=>handleLogin()}
            />
        </Grid>
      </Grid>
  )
}