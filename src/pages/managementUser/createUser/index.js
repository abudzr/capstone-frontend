/** Libs */
<<<<<<< Updated upstream
import React , {useState} from 'react';
import {Breadcrumbs,Link, Grid, Typography, Divider, Select, MenuItem, TextField} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
=======
import React , {useEffect, useState} from 'react';
import {Breadcrumbs,Link, Grid, Typography, Divider, Select, MenuItem, Input} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
>>>>>>> Stashed changes
/** Global Components */
import {Button as CustomizeButton} from 'components';

/** Assets */

/** Utils */
import "../managementUser.css";
<<<<<<< Updated upstream

export default function CreateUser() {
    const {show} = useSelector((state) => state.general);
    const [data,setData] = useState({
        requestType:'item',
        desciption:''
    })
    // Use Effect
=======
import { serviceAddDepartment, serviceAddRole, serviceAddUser, serviceDepartments, serviceRoles } from 'services/users';

export default function CreateUser() {
    const navigate = useNavigate();
    const {show} = useSelector((state) => state.general);
    const { register, formState: { errors, touchedFields } } = useForm({ mode: 'onBlur' });
    const token = Cookies.get("token");
    const [matchPass, matchPassSet] = useState(true);
    const [roles, rolesSet] = useState([]);
    const [departments, departmentsSet] = useState([]);
    const [isGetData, isGetDataSet] = useState(false);
    const [data,setData] = useState({
        username:'',
        email:'',
        password1:'',
        password2:'',
        department: '',
        role: ''
    })

    // funciton
    const matchPassword = (pass1, pass2) => {
        return pass1 === pass2;
    }

    const getRoles = async () => {
        const data = await serviceRoles({
            token: token
        });
        return data;
    }

    const getDepartments = async () => {
        const data = await serviceDepartments({
            token: token
        });
        return data;
    }

    const addUser = async () => {
        const response = await serviceAddUser({
            token: token,
            data: {
                username: data.username,
                email: data.email,
                password: data.password2,
                active: true,
                createdby: "system",
                lastupdatedby: "system"
            }
        });
        return response;
    }

    const addRole = async (useruuid) => {
        const response = await serviceAddRole({
            token: token,
            data: {
                useruuid: useruuid,
                roleuuid: data.role
            }
        });
        return response;
    }

    const addDepartment = async (useruuid) => {
        const response = await serviceAddDepartment({
            token: token,
            data: {
                useruuid: useruuid,
                departmentuuid: data.department
            }
        })
        return response;
    }


    const saveHandler = async () => {
        addUser().then( async (val) => {
            await addRole(val.data[0].uuid);
            await addDepartment(val.data[0].uuid);
            navigate("/management-users")
        }).catch((err) => {
            console.log(err);
        })
    }
    // Use Effect
    useEffect(() => {
        matchPassSet(matchPassword(data.password1, data.password2));
    }, [data])

    useEffect(() => {
        if (!isGetData) {
            getRoles().then(roles => {
                const role = roles.data.map( val => {
                    return {
                        name: val.name,
                        uuid: val.uuid
                    }
                })
                rolesSet(role);
            });
    
            getDepartments().then(departments => {
                const department = departments.map(val => {
                    return {
                        name: val.name,
                        uuid: val.uuid,
                        code: val.code
                    }
                })
                departmentsSet(department);
            })
        }
        isGetDataSet(true);
    }, [roles, departments]);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
                    href="/management-users"
=======
                    onClick = {
                        () => navigate("/management-users")
                    }
>>>>>>> Stashed changes
                >
                    Management Users
                </Link>
            </Breadcrumbs>

            {/* header content */}
            <Typography className='title-page' variant="h4" component="h4" mt={2}> 
                Add User
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
                            title="Simpan"
                            btn="button-create"
                            color="blue"
<<<<<<< Updated upstream
=======
                            onClick={saveHandler}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
                {/* username */}
                <Grid item xs={4}>
                    Username
                </Grid>
                <Grid item xs={8}>
                    <Input
                    {...register("username", { required: { value: true, message: 'Username Required!' } })}
                    variant="outlined"
                    sx={{
                        width: "512px",
                        height: 40,
                        marginBottom: "1rem"
                    }}
                    type="text"
                    autoComplete = 'off'
                    value={data.username}
                    onChange={(e) => setData({...data, username:e.target.value})}
                    placeholder="Username"/>
                </Grid>
                <Grid item xs = {4} className = "error" >
                </Grid>
                <Grid item xs={8} className = "error" sx={{ marginBottom: "1rem" }}>
                    {touchedFields?.username && errors?.username && errors?.username?.message}
                </Grid>
                {/* email */}
                <Grid item xs={4}>
                    Email
                </Grid>
                <Grid item xs={8}>
                    <Input
                    {...register("email", { required: { value: true, message: 'Email Required!' } })}
                    variant="outlined"
                    sx={{
                        width: "512px",
                        height: 40,
                        marginBottom: "1rem"
                    }}
                    type="email"
                    autoComplete = 'off'
                    value={data.email}
                    onChange={(e) => setData({...data, email:e.target.value})}
                    placeholder="Email"/>
                </Grid>
                <Grid item xs = {4} className = "error" >
                </Grid>
                <Grid item xs={8} className = "error" sx={{ marginBottom: "1rem" }}>
                    {touchedFields?.email && errors?.email && errors?.email?.message}
                </Grid>
                {/* password1 */}
                <Grid item xs={4}>
                    Password
                </Grid>
                <Grid item xs={8}>
                    <Input
                    {...register("password1", { required: { value: true, message: 'Password Required!' } })}
                    variant="outlined"
                    sx={{
                        width: "512px",
                        height: 40,
                        marginBottom: "1rem"
                    }}
                    type="password"
                    autoComplete = "new-password"
                    value={data.password1}
                    onChange={(e) => setData({...data, password1:e.target.value})}
                    placeholder="Password"/>
                </Grid>
                <Grid item xs = {4} className = "error" >
                </Grid>
                <Grid item xs={8} className = "error" sx={{ marginBottom: "1rem" }}>
                    {touchedFields?.password1 && errors?.password1 && errors?.password1?.message}
                </Grid>
                {/* password 2 */}
                <Grid item xs={4}>
                    Confirm Password
                </Grid>
                <Grid item xs={8}>
                    <Input
                    {...register("password2", { required: { value: true, message: 'Password Required!' } })}
                    variant="outlined"
                    sx={{
                        width: "512px",
                        height: 40,
                        marginBottom: "1rem"
                    }}
                    type="password"
                    autoComplete = 'off'
                    value={data.password2}
                    onChange={(e) => setData({...data, password2:e.target.value})}
                    placeholder="Password"/>
                </Grid>
                <Grid item xs = {4} className = "error" >
                </Grid>
                <Grid item xs={8} className = "error" sx={{ marginBottom: "1rem" }}>
                    {touchedFields?.password2 && errors?.password2 && errors?.password2?.message}
                    {!matchPass && "Password Not Match"}
                </Grid>
                {/* departments */}
                <Grid item xs={4}>
                    Department
                </Grid>
                <Grid item xs={8}>
                    <Select
                        variant="outlined"
                        sx={{
                            width: "512px",
                            height: 40,
                            marginBottom: "1rem"
                        }}
                        value={data.department}
                        onChange={(e) => setData({...data, department:e.target.value})}
                    >
                        {
                            [...departments].map(val => (
                                <MenuItem value={val.uuid} key={val.uuid}>{val.name}</MenuItem>
                            ))
                        }
                    </Select>
                </Grid>
                {/* role */}
                <Grid item xs={4}>
                    Role
                </Grid>
                <Grid item xs={8}>
                    <Select
                        variant="outlined"
                        sx={{
                            width: "512px",
                            height: 40,
                            marginBottom: "1rem"
                        }}
                        value={data.role}
                        onChange={(e) => setData({...data, role:e.target.value})}
                    >
                        {
                            [...roles].map(val => (
                                <MenuItem value={val.uuid} key={val.uuid}>{val.name}</MenuItem>
                            ))
                        }
                    </Select>
>>>>>>> Stashed changes
                </Grid>
            </Grid>
           

        </Grid>
        <Grid item xs={show ? 1 : 1}></Grid>
    </Grid>
)

}