/** Libs */
import React , {useEffect, useState} from 'react';
import {Breadcrumbs,Link, Grid, Typography, Divider, Select, MenuItem, Input} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
/** Global Components */
import {Button as CustomizeButton} from 'components';

/** Assets */

/** Utils */
import "../managementUser.css";
import { serviceAddDepartment, serviceAddRole, serviceDeleteDepartment, serviceDeleteRole, serviceDepartments, serviceGetUser, serviceRoles } from 'services/users';

export default function DetailUser() {
    const navigate = useNavigate();
    const {show} = useSelector((state) => state.general);
    const { register, formState: { errors, touchedFields } } = useForm({ mode: 'onBlur' });
    const token = Cookies.get("token");
    const [roles, rolesSet] = useState([]);
    const [departments, departmentsSet] = useState([]);
    const [isGetData, isGetDataSet] = useState(false);
    const [old, oldSet] = useState({});
    let { id } = useParams();
    const [data,setData] = useState({
        username:'',
        email:'',
        department: '',
        role: ''
    })

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

    const getUser = async (id) => {
        const data = await serviceGetUser({
            token: token,
            id: id
        });
        return data;
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

    const deleteRole = async () => {
        const response = await serviceDeleteRole({
            token: token,
            useruuid: id,
            roleuuid: old.role
        })
        return response;
    }

    const deleteDepartment = async () => {
        const response = await serviceDeleteDepartment({
            token: token,
            useruuid: id,
            departmentuuid: old.department
        })
        return response;
    }


    const saveHandler = async () => {
        if (data.role !== old.role) {
            if (old.role != null) await deleteRole();
            await addRole(id);
        }

        if (data.department !== old.department) {
            if (old.department != null) await deleteDepartment()
            await addDepartment(id);
        }
        navigate("/management-users");
    }
    // Use Effect
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

            getUser(id).then(user => {
                user.data.map( usr => {
                    oldSet({ department: usr.departments[0]?.uuid, role: usr.roles[0]?.uuid});
                    setData({
                        username: usr.username,
                        email: usr.email,
                        department: usr.departments[0]?.uuid,
                        role: usr.roles[0]?.uuid
                    });
                })
            })
        }
        
        isGetDataSet(true);
    }, [roles, departments]);
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
                        () => navigate("/management-users")
                    }
                >
                    Management Users
                </Link>
            </Breadcrumbs>

            {/* header content */}
            <Typography className='title-page' variant="h4" component="h4" mt={2}> 
                Detail User
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
                <Grid 
                    container  
                    direction="row"
                    item xs={6}
                    justifyContent="end"
                    gap={2}
                    >
                    <Grid>
                        <CustomizeButton
                            title="Update"
                            btn="button-create"
                            color="blue"
                            onClick={saveHandler}
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
                    readOnly
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
                    readOnly
                    onChange={(e) => setData({...data, email:e.target.value})}
                    placeholder="Email"/>
                </Grid>
                <Grid item xs = {4} className = "error" >
                </Grid>
                <Grid item xs={8} className = "error" sx={{ marginBottom: "1rem" }}>
                    {touchedFields?.email && errors?.email && errors?.email?.message}
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
                </Grid>
            </Grid>
           

        </Grid>
        <Grid item xs={show ? 1 : 1}></Grid>
    </Grid>
)

}