
import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate , useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth , setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = {
    //   email, password
    // }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email, password
      });

      if ( res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        }); 
        localStorage.setItem("auth" , JSON.stringify(res.data));
        setTimeout(() => {
          navigate( location.state || "/")
        }, 1000)

      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log("Error while Submitting data in frontEnd --> ", error);
      if(error.response){
        toast.error(error.response.data.message)
      }
      if(error.AxiosError){
        toast.error(error.AxiosError.message)
      }
      if (error.message === "Network Error") {
        toast.error("Network error occurred. Please check your internet connection and try again.");
      }
      // toast.error(error.response.data.message)
    }



  }



  return (
    <Layout >
      <div className="register">

        <form className='formRegister' onSubmit={handleSubmit}>
          <h1 style={{ color: "white" }}>Login</h1>
          <div className="form-group">
            <input type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Email"
              required />
          </div>
          <div className="form-group">
            <input type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
          <button type="button" onClick={()=>{navigate("/forgot-password")}} className="btn btn-primary">Forgot Password</button>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

      </div>
    </Layout>
  )
}

export default Login