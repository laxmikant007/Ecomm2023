import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';


const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);


    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProducts(data?.product._id, data?.product.category._id);

        } catch (error) {
            console.log("Error while getting Single product-->", error);
            toast.error("Something went wrong ");

        }
    }

    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products)

        } catch (error) {
            console.log("Error while getting similar Products-->", error);
            toast.error("Error in getting Similar Produts!!");

        }
    }

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    return (
        <Layout title='Product Deatils '>

            <div className="row container mt-4">
                <div className="col-md-6">
                    <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="img-fluid img-thumbnail" alt={product?.name}
                    //  height={"450px"}
                    //  width={"450px"}

                    />
                </div>
                <div className="col-md-6 ">
                    <h1 className='text-center'>Product Details</h1>
                    <h5>Product Name : {product?.name}</h5>
                    <h5>Product Description : {product?.description}</h5>

                    <h5>Product Price : {product?.price}</h5>
                    <h5>Product Category : {product?.category?.name}</h5>
                    <button className="btn btn-success ms-2">Add To Cart</button>



                </div>
            </div>
            <hr />
            <div className="row container">
                <h1 className='text-center'>Similar Products</h1>
                {relatedProducts.length < 1 && (<h4 className='text-center'>NO Similar Products Found😢</h4>)}
                <div className="d-flex flex-wrap">


                    {


                        relatedProducts?.map((item) => (


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


                        ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails;