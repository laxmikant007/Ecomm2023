import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios';

import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Container from '@mui/material/Container';


const Profile = () => {
    const [auth, setAuth] = useAuth();
    

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(()=>{
        const {name , email , phone , address} = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    },[auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const d = {
            name, password, phone, address
        }
        console.log(d);


        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, d);
            console.log("this is resposnse in front--->", data);
            if(data?.error){
                toast.error(data?.error)
            }else{
                setAuth({...auth , user : data?.updatedUser});
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                console.log("ls is ",ls)
                ls.user = data?.updatedUser;
                localStorage.setItem("auth" , JSON.stringify(ls));
                toast.success("Profile Updated Successfully!!");
            }

        } catch (error) {
            console.log("Error while Submitting data in frontEnd --> ", error);
            toast.error("Something Went Wrong!!:😢😢")
        }



    }



    return (
        <Layout title={"Dashboard - Profile "}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        {/* <h1>Your Profile</h1> */}
                        <div>
                            <Container component="main" maxWidth="xs">
                                {/* <CssBaseline /> */}
                                <Box
                                    sx={{
                                        // marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        // backgroundImage: `url(${loginGif})`,
                                        // backgroundSize: 'cover',
                                        // backgroundPosition: 'center',

                                    }}
                                >
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    {/* <Typography component="h1" variant="h5">
                                        Sign up to Mahaveer Medicos👋
                                    </Typography> */}
                                    {/* <div className="google-btn">
                                        <div className="google-icon-wrapper">
                                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                                        </div>
                                    </div> */}

                                        <p className="btn-text"><b>Update Your Details</b></p>
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    autoComplete="given-name"
                                                    name="Name"
                                                    
                                                    fullWidth
                                                    id="firstName"
                                                    label="Name"
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    
                                                    fullWidth
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    id="exampleInputPhone"
                                                    label="Phone No."
                                                    name="phoneno"
                                                    autoComplete="phone"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="new-password"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    fullWidth
                                                    name="address"
                                                    label="Enter Your Address"
                                                    type="text"
                                                    id="exampleInputAddress"
                                                    autoComplete="address"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Update
                                        </Button>

                                       
                                    </Box>
                                </Box>
                              
                            </Container>
                        </div>
                    </div>
                </div>
            </div>




        </Layout>

    )
}

export default Profile