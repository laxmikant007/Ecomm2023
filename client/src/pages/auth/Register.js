import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from "react-toastify";
import axios from "axios";
import {  useNavigate } from 'react-router-dom';


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
         const data = {
            name, email , password , phone , address , answer
         }
         console.log(data);
         
         
        //  console.log(process.env.REACT_APP_API)

         try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register` ,data);
                console.log("this is resposnse in front--->",res)
            if(res.data.success){
                toast.success(res.data.message);
                setTimeout(()=>{
                    navigate("/login")
                },1000)
                // navigate("/login")
            }else{
                toast.error(res.data.message)
            }

                

            
         } catch (error) {
            console.log("Error while Submitting data in frontEnd --> " ,error);
            toast.error("Something Went Wrong!!:😢😢")
         }



    }

    return (
        <Layout >
            <div className="register">

                <form className='formRegister' onSubmit={handleSubmit}>
                <h1 style={{color:"white"}}>Register</h1>
                    <div className="form-group">
                        <input type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter Name" 
                            required 
                            />
                            
                    </div>
                    <div className="form-group">
                        <input type="text"
                         value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter Email"
                            required />
                    </div>
                    <div className="form-group">
                        <input type="password" 
                         value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        className="form-control"
                         id="exampleInputPassword1"
                          placeholder="Password" 
                            required
                          />
                    </div>
                    <div className="form-group">
                        <input type="text"
                         value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder="Enter Phone no."
                            required />
                    </div>
                    <div className="form-group">
                        <input type="text"
                         value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="Enter Your Address" 
                                required
                            />
                    </div>
                    <div className="form-group">
                        <input type="text"
                         value={answer}
                            onChange={(e)=>setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputgame"
                            placeholder="What is your favourite sports?" 
                                required
                            />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>


            </div>
        </Layout>
    )
}

export default Register