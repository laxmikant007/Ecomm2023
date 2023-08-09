

import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate  } from 'react-router-dom';


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer , setAnswer] =  useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = {
    //   email, password
    // }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
        email, newPassword , answer
      });

      if ( res && res.data.success) {
        toast.success(res.data.message);
       
     
        setTimeout(() => {
          navigate( "/login")
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
        <Layout title={"Forgot Password - Ecommerce App"}>
            <div className="register">

                <form className='formRegister' onSubmit={handleSubmit}>
                    <h1 style={{ color: "white" }}>Reset Your Password</h1>
                    <div className="form-group">
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter Email"
                            required />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter your favourite sport.."
                            required />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter New Password"
                            required
                        />
                    </div>
                 
                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>

            </div>

        </Layout>

    )
}

export default ForgotPassword