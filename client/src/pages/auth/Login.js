
// import React, { useState } from 'react'
// import Layout from '../../components/Layout/Layout'
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate , useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/auth';



// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [auth , setAuth] = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // const data = {
//     //   email, password
//     // }

//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
//         email, password
//       });

//       if ( res && res.data.success) {
//         toast.success(res.data.message);
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token
//         }); 
//         localStorage.setItem("auth" , JSON.stringify(res.data));
//         setTimeout(() => {
//           navigate( location.state || "/")
//         }, 1000)

//       } else {
//         toast.error(res.data.message)
//       }
//     } catch (error) {
//       console.log("Error while Submitting data in frontEnd --> ", error);
//       if(error.response){
//         toast.error(error.response.data.message)
//       }
//       if(error.AxiosError){
//         toast.error(error.AxiosError.message)
//       }
//       if (error.message === "Network Error") {
//         toast.error("Network error occurred. Please check your internet connection and try again.");
//       }
//       // toast.error(error.response.data.message)
//     }



//   }



//   return (
//     <Layout >
//       <div className="register">

//         <form className='formRegister' onSubmit={handleSubmit}>
//           <h1 style={{ color: "white" }}>Login</h1>
//           <div className="form-group">
//             <input type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail"
//               placeholder="Enter Email"
//               required />
//           </div>
//           <div className="form-group">
//             <input type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Password"
//               required
//             />
//           </div>
//           <div className="mb-3">
//           <button type="button" onClick={()=>{navigate("/forgot-password")}} className="btn btn-primary">Forgot Password</button>
//           </div>
//           <button type="submit" className="btn btn-primary">Login</button>
//         </form>

//       </div>
//     </Layout>
//   )
// }

// export default Login


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import loginGif from "./img/login.gif";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://laxmikant.co">
        Mahaveer Medicos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email, password
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/")
        }, 1000)

      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log("Error while Submitting data in frontEnd --> ", error);
      if (error.response) {
        toast.error(error.response.data.message)
      }
      if (error.AxiosError) {
        toast.error(error.AxiosError.message)
      }
      if (error.message === "Network Error") {
        toast.error("Network error occurred. Please check your internet connection and try again.");
      }
   
    }



  }
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${loginGif})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              // backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <GoogleOAuthProvider clientId="195337239909-bpjg0qe850h5n4npsfk8r969ki2f89u6.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    var decoded = jwt_decode(credentialResponse.credential);
                    localStorage.setItem("google", JSON.stringify(decoded));

                    console.log(decoded);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />;
              </GoogleOAuthProvider>;







              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgot-password" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}