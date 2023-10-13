// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import AdminMenu from '../../components/Layout/AdminMenu'

// const Users = () => {
//     return (
//         <Layout title={"Dashboard - All Users"}>
//             <div style={{marginTop : "80px"}} className="container-fluid m-3 p-3">
//                 <div className="row ">
//                     <div className="col-md-3">
//                         <AdminMenu />
//                     </div>
//                     <div className="col-md-9">
//                         <h1> All  2345tyuUsers</h1>
//                     </div>

//                 </div>
//             </div>
//         </Layout>
//     )// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import AdminMenu from '../../components/Layout/AdminMenu'

// const Users = () => {
//   return (
//     <Layout title={"All-Users"}>
//         <div className="container-fluid m-3 p-3">

//       <div className='row'> 
//       <div className='col-md-3'>
//         <AdminMenu/>
//       </div>

//       <div className="col-md-9">
//       <h1>All users</h1>
//       </div>
//       </div>
//       </div>
//     </Layout>
//   )
// }

// export default Users


import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
// import { getAllUsersAdmin } from '../../services/ProductApi';
import moment from 'moment';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

// import "../../../src/style/adminStyle/adminMenu.css";
import axios from 'axios';



const { Option } = Select;

const AdminUsers = () => {

    const URL = process.env.REACT_APP_API;


    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Canceled"]);

    const [changeStatus, setChangeStatus] = useState("");

    const [auth] = useAuth();


    const getUsersList = async () => {
        //  const data= await getAllUsersAdmin();
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-users`);
        //  return data;

        console.log("admin users is ", data);

        setUsers(data);

    }
    useEffect(() => {
        if (auth?.token) {
            getUsersList()
        }

    }, [auth?.token])

    return (
        <Layout>


            <div style={{ marginTop: "80px" }} className=" row container-fluid m-3 p-3" >
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">

                    <h1 className='text-center'>
                        All Users ({users?.length === 0 ? <CircularProgress />
                            : users?.length})
                    </h1>

                    <div className="border shadow">
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Phone</th>
                                    <th scope='col'>Address</th>
                                    <th scope='col'>Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map((u, i) => (
                                        <>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{u?.name}</td>

                                                <td>{u?.email}
                                                </td>
                                                <td>{u?.phone}</td>
                                                <td>{u?.address}</td>
                                                <td style={{ color: u?.role ? "green" : "red" }}>{u?.role ? "Admin" : "User"}</td>
                                            </tr>
                                        </>


                                    ))
                                }

                            </tbody>

                        </table>
                    </div>

                </div>



            </div>

        </Layout>
    )
}

export default AdminUsers;
// }

// export default Users