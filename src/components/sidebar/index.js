import {useEffect, useState} from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';

import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Tooltip,
  Drawer,
  Grid,
  Menu
} from "@mui/material";

import {ChangePassword, CustomizeDialog} from 'components'

// icon
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import './sidebar.css'

// configs
import { openDrawer } from 'store/reducer-general';
import { clearAll } from "utils/storage";
import { setIslogin } from "store/reducer-auth";

const drawerWidth = 250;
const openedMixin = (theme) => ({
  width: drawerWidth,
  background: "#1B222C",

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  background: "#1B222C",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  // width: `calc(${theme.spacing(7)} + 1px)`,
  // [theme.breakpoints.up("sm")]: {
  //   width: `calc(${theme.spacing(9)} + 1px)`,
  // },
});

const DrawerHeader = styled("div")(({ theme,open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: open ?  "flex-end" :"center",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const CustomDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {listMenu} = useSelector((state) => state.general);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmed, setConfirmed] = useState(false);
  const [openDialog, openDialogInput] = useState(false);
  
  const [menu, setMenu] = useState([]);

  
  const handleDrawerOpen = () => {
    setOpen(!open);
    dispatch(openDrawer(!open));
  }

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openDialogChangePassword = ()=>{
    openDialogInput(true)
    setAnchorEl(null);
  }
  const handleMenu = (thePath) => {
    navigate(thePath);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>openDialogChangePassword()}>Change Password</MenuItem>
      {!open && <Divider />}
      {!open && 
        <MenuItem
          onClick={() => {
            localStorage.clear()
            const clearAllCookies = new Promise((resolve, reject) => {
              resolve(clearAll());
            });
            clearAllCookies
              .then(() => {
                handleMenuClose();
              })
              .then(() => {
                dispatch(setIslogin(false))
                localStorage.clear()
                navigate("/login");
              })
              .catch((er) => {
                console.log(er);
              });
          }}
        >
          Logout
        </MenuItem>
      }
    </Menu>
  );

  const menuItems = [
    {
      key: 'dashboard',
      path: '/',
      icon: <OtherHousesIcon />,
      title: 'Dashboard',
      type: 'route',
      slug: 'dashboard.index'
    },
    {
        key: 'Request',
        path: '/request',
        icon: <CalendarTodayIcon />,
        title: 'Request',
        type: 'route',
        slug: 'request.index'
      },
    {
        key: 'Approval',
        path: '/approval',
        icon: <CheckCircleIcon />,
        title: 'Approval',
        type: 'route',
        slug: 'approval.index'
      },
      {
        key: 'ManagementUsers',
        path: '/management-users',
        icon: <PeopleIcon />,
        title: 'Management User',
        type: 'route',
        slug: 'managementuser.index'
      },
      // {
      //   key: 'changePassword',
      //   path: '/change-password',
      //   icon: <LockIcon />,
      //   title: 'Ubah Kata Sandi',
      //   type: 'route'
      // },
  ];

 useEffect(() => {
    const mainRoute = menuItems
    const dataMenuRole = listMenu.length > 0 ? listMenu: []
    const filter = mainRoute.filter((elem) => dataMenuRole.find(({ slug }) => elem.slug === slug));
    setMenu(filter)// eslint-disable-next-line
  }, [])


  useEffect(() => {
    if (isConfirmed) {
      const clearAllCookies = new Promise((resolve, reject) => {
        resolve(clearAll());
      });
      clearAllCookies
        .then(() => {
          dispatch(setIslogin(false))
          localStorage.clear()
          navigate("/login");
        })
        .catch((er) => {
          console.log(er);
        });
    }
    // eslint-disable-next-line
  },[isConfirmed])

  const handleLogout = () =>{
    setOpenModal(true)
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomDrawer variant="permanent" open={open}>
        <DrawerHeader open={open}>
          <IconButton onClick={()=>handleDrawerOpen()} >
            {open ? (
              <ChevronLeftIcon style={{fill: "#FDFDFD"}} />
            ) : (
              <MenuIcon style={{fill: "#FDFDFD"}} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider style={{color: "#FDFDFD"}} />

        <Box style={{ height:"100vh",display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div>
            {menu.map((rute, id) =>
                rute.type === "route" ? (
                <Tooltip title={rute.title} key={"tooltip-menu-" + id}>
                    <MenuItem
                    onClick={(e) => {
                        e.preventDefault();
                        // handleDrawerClose()
                        handleMenu(rute.path);
                    }}
                    >
                        {
                            location.pathname === rute.path ? (
                                open ?
                                <div className="menu-active">
                                    {rute.icon} {rute.title}
                                </div>
                                :
                                <div className="menu-icon-active">
                                    {rute.icon}
                                </div>

                        ) : (
                            open ?
                                <div className="menu-close">
                                    {rute.icon} {rute.title}
                                </div>
                                :
                                <div className="menu-inactive">
                                    {rute.icon}
                                </div>
                        )
                        }
                    </MenuItem>
                </Tooltip>
                ) : null
            )}
        </div>
        <div className="menu-info">
            <Divider style={{color: "#FDFDFD"}} />
            {open ?
             <Grid 
                sx={{ flexGrow: 1 }}  
                container  
                direction="row"
                alignItems="center"
                spacing={2} 
                style={{marginTop:"20px"}}
            >
                <Grid item xs={8} >
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={6}>
                            <AccountCircleIcon onClick={(e)=>handleProfileMenuOpen(e)} style={{fill: "#FDFDFD",fontSize:"48px"}}/>
                        </Grid>
                        <Grid style={{textAlign:"start"}}>
                            <Grid className="menu-info-title">Admin</Grid>
                            <Grid className="menu-info-subtitle">Role</Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <LogoutIcon style={{fill: "#FDFDFD",cursor:"pointer"}} onClick={()=>handleLogout()}/>
                </Grid>
            </Grid>
            :
            <AccountCircleIcon onClick={(e)=>handleProfileMenuOpen(e)} style={{fill: "#FDFDFD",cursor:"pointer",marginTop:"20px"}}/>
            }
           
        </div>
        </Box>
      </CustomDrawer>
      <CustomizeDialog 
        title="Confirmation" 
        text="Are you sure want to logout?" 
        isModal={openModal} 
        onClose={setOpenModal}
        onConfirm={setConfirmed}
      />
      <ChangePassword open={openDialog} close={()=>openDialogInput(false)} />
    {renderMenu}
    </Box>
    );
}
export default Sidebar;
