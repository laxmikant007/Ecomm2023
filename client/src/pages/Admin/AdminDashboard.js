import React from 'react';
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import { Divider, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';

const AdminDashboard = () => {

    const style = {
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: "none",
        borderRadius: '10px',
        boxShadow: 24,
        p: 2,
      };


    const [auth] = useAuth();
    return (
        <Layout title={"Dashboard - Admin"}>
            <div style={{ marginTop: "80px" }} className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div style={{display:"flex"  , justifyContent:"center" , alignItems:"center"}}  className="col-md-9 ">
                        <Box sx={style}>
                            <div style={{ textAlign: 'center', alignContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                                <Typography variant="h3" style={{ fontSize: '40px', fontWeight: 600, fontFamily: 'Poppins' }}>
                                    Hi! {auth?.user?.name} 
                                </Typography>
                                <Avatar

                                    alt={auth?.user?.name}
                                    src={"https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"}
                                    style={{ borderRadius: '50%', margin: 'auto', width: '150px', height: '150px' }}
                                />
                                <Typography
                                    variant="subtitle1"
                                    style={{ backgroundColor: 'gray.500', border:'1px solid gray', borderRadius:"20px" , fontSize: '18px', margin: '10px', fontFamily: 'Poppins' , fontWeight:'600' ,  }}
                                >
                                    Email: {auth?.user?.email}
                                    {/* Phone : {auth?.user?.phone} */}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    style={{ backgroundColor: 'gray.200', border:'1px solid gray', borderRadius:"20px" ,  fontSize: '18px', margin: '10px', fontFamily: 'Poppins' , fontWeight:'600' ,  }}
                                >
                                    {/* Email: {auth?.user?.email} */}
                                    Phone : {auth?.user?.phone}
                                </Typography>
                                <Box>


                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '20px' }}
                                        // onClick={handleFinance}
                                    >
                                        Payment Details
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '20px', marginLeft: '20px' }}
                                        // onClick={handleClickEdit}
                                    >
                                        Overview
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '20px', marginLeft: '20px' }}
                                        // onClick={handleClick}
                                    >
                                        Finance
                                    </Button>
                                </Box>
                            </div>
                        </Box>





                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default AdminDashboard;