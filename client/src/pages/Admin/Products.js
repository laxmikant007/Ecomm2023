
import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProducts = async () => {

        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            setProducts(data.products);
            setLoading(false);
            // console.log(data);

        } catch (error) {
            console.log("Error while getting Products -->", error);
            toast.error("Something Went Wrong!!😢😢")
        }

    }

    useEffect(() => {
        getProducts();
    }, []);





    return (
        <Layout>
            <div style={{ marginTop: "80px" }} className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Product ({products?.length === 0 ?  <CircularProgress />
                            : products?.length})</h1>

                        <div className="d-flex flex-wrap">

                            {
                                loading ? (
                                    <div className="d-flex justify-content-center w-100">
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress />
                                        </Box>

                                    </div>

                                ) : (<>
                                    {


                                        products?.map((item) => (
                                            <Link className='product-link' key={item._id} to={`/dashboard/admin/product/${item.slug}`}>

                                                <div className="card m-4 " style={{ width: '18rem' }} >
                                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt={item.name}
                                                        style={{ width: '200px', height: 'auto' }}

                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        {/* <p className="card-text font-weight-bold">Description : {item.description}</p> */}
                                                        <p className="card-text">{item.description.substring(0, 40)}....</p>
                                                        <p className="card-text"> Price :{item?.price}</p>
                                                        <a href="#" className="btn btn-primary">Deatils</a>
                                                    </div>
                                                </div>

                                            </Link>
                                        ))
                                    }
                                </>)

                            }


                        </div>
                    </div>
                </div>
            </div>


        </Layout>

    )
}

export default Products