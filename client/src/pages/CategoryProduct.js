import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);


    useEffect(() => {
        // console.log("Hello this i sbyyy");
        // console.log("thisbi is -->",params)
        if (params?.slug) { getProductsByCat() }

    }, [params?.slug]);
    const getProductsByCat = async () => {
        try {
            // console.log("THis is GetProduct By cat");
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);


        } catch (error) {
            console.log("Error While Getting Product Catgory-->", error);
            toast.error("Something Went Wrong in getProductByCat!!");

        }
    }


    return (
        <Layout>
            <div className="container mt-2">
                <h4 className='text-center'>Category -{category?.name}</h4>
                <h6 className='text-center'>{products?.length} result found!!</h6>
                <div className="row">
                    {/* <div className="d-flex flex-wrap"> */}
                        <div className="d-flex flex-wrap">
                            {products?.length === 0 ? (
                                <div className="d-flex justify-content-center w-100">
                                    <h1 style={{ color: "red" }} className='text-center'>No Products Found For this Category!!!</h1>
                                </div>
                            ) : (

                                products?.map((item) => (
                                    <div className="card m-4 " style={{ width: '18rem' }} key={item._id} >
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt={item.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.description.substring(0, 30)}...</p>
                                            <p className="card-text">{item.price}</p>
                                            <button className="btn btn-primary ms-2" onClick={() => navigate(`/product/${item.slug}`)} >More Details</button>
                                            <button className="btn btn-success ms-2">Add To Cart</button>
                                        </div>
                                    </div>
                                ))

                            )


                            }
                        </div>
                    {/* </div> */}
                </div>

            </div>
        </Layout>
    )
}

export default CategoryProduct