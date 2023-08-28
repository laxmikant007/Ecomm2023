import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Loader from '../components/Loader';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Filter from '../components/HomeComponent/Filter';
import HomeBanner from '../components/HomeComponent/HomeBanner';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useWishList } from '../context/wishlist';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import Skeleton from '../components/Skeleton';
import Skeleton from '@mui/material/Skeleton';

// import LinearProgress from '@mui/material/LinearProgress';









const HomePage = () => {
    const [cart, setCart] = useCart();
    const URL = process.env.REACT_APP_API;


    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [wishList, setWishList] = useWishList();
    const [loadingbar, setLoadingbar] = useState(false);





    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
            // console.log("this is total data frontend -->" , data);
            setTotal(data?.total);

        } catch (error) {
            console.log("Erorr while getting Total-->", error);
            toast.error("Something Went Wrong in Get Total!!")

        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    const loadMore = async () => {
        try {
            console.log("Loadmore ");
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log("Error while loadmore -->", error);
            setLoading(false);
        }
    }



    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    const getProducts = async () => {

        try {
            setLoading(true);
            setLoadingbar(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setLoadingbar(false);
            setProducts(data?.products);
            // console.log(data.products);

        } catch (error) {
            setLoading(false);
            console.log("Error while getting Products -->", error);
            toast.error("Something Went Wrong!!😢😢")
        }

    }

    const handleWishlist = (product) => {

        console.log("pro to add is ", product)

        setWishList([...wishList, product]);
        localStorage.setItem('wishList', JSON.stringify([...wishList, product]));


        toast.success(`${product.name} has been added to wishlist`)
    }


    const handleFilter = (value, id) => {
        try {
            let all = [...checked];
            if (value) {
                all.push(id);
            }
            else {
                all = all.filter((c) => c !== id);
            }
            setChecked(all);


        } catch (error) {
            console.log("Error whille filtering products-->", error);
            toast.error("Something went wrong !!")

        }
    }

    useEffect(() => {
        if (!checked.length || !radio.length) getProducts();
        getAllCategory();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();

    }, [checked, radio]);

    const filterProduct = async () => {

        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio })
            setProducts(data?.products)


        } catch (error) {
            console.log("Error in filterProduct-->", error);
            toast.error("Something went wrong!!")
        }

    }


    return (
        <Layout title={"All Products | Best offers "}>
            <HomeBanner />
            <div className="row">
                <div className="col-md-2 m-3">

                    <Filter handleFilter={handleFilter} setRadio={setRadio} categories={categories} Prices={Prices} />
                </div>
                <div className="col-md-9">

                    <h1 className='text-center'> All Products</h1>
                    <Box sx={{ pt: 0.5 }}>
                        {/* <Skeleton /> */}
                        <Skeleton animation="wave" variant="circular" width={40} height={40}  />
                        <Skeleton variant="rectangular" width={"20%"} height={118} />
                        <Skeleton width="20%" />
                    </Box>
                    {/* {JSON.stringify(radio , null , 4)} */}
                    {
                        loadingbar ? (<>
                            <Box>
                                <LinearProgress />
                            </Box>
                        </>) : (
                            <div className="d-flex flex-wrap">
                                <div className="d-flex flex-wrap justify-content-between ">

                                    {loadingbar ?
                                        <Box sx={{ width: '100%' }}>
                                            <CircularProgress color="success" />
                                        </Box>
                                        : (
                                            products?.map(product => (

                                                <div className="card m-2 card-box" style={{ width: '17rem' }}  >


                                                    {product.photo ? ( // Check if product has a photo
                                                        <Box sx={{ width: "100%", padding: "10px" }}>
                                                            <CircularProgress />
                                                        </Box>
                                                    ) : (
                                                        <img
                                                            src={`${URL}/api/v1/product/product-photo/${product._id}`}
                                                            className="card-img-top"
                                                            style={{ height: "200px", objectFit: "cover" }}
                                                            alt={product.name}
                                                        />
                                                    )}

                                                    <div className="d-flex justify-content-between p-2">

                                                        <FavoriteBorderIcon fontSize="large" sx={{ color: "#e91e63", cursor: "pointer" }} onClick={() => { handleWishlist(product) }} />
                                                        <VisibilityIcon color="secondary" sx={{ cursor: "pointer" }} fontSize="large" onClick={() => { navigate(`/product/${product.slug}`) }} />
                                                    </div>

                                                    <div className="card-body">
                                                        <h5 className="card-title">{product.name}</h5>
                                                        <p className="card-text">{product.description.substring(0, 25)}....</p>
                                                        <div className='pro-price'>
                                                            <div className="card-text fp">    ₹ {product.price - 500} </div>
                                                            <div className="card-text sp">  ₹ {product.price} </div>

                                                            <div className='off'> ( 10 % OFF ) </div>
                                                        </div>

                                                        <div className='card-btn'>

                                                            <button className='card-btn-details' onClick={() => { navigate(`/product/${product.slug}`) }}>More Details</button>
                                                            <button className='card-btn-add' onClick={() => {
                                                                setCart([...cart, product]);
                                                                localStorage.setItem('cart', JSON.stringify([...cart, product]));
                                                                toast.success(`${product.name} has been added to cart`);
                                                            }} >Add to cart</button>
                                                        </div>



                                                    </div>
                                                </div>
                                            ))






                                        )

                                    }

                                </div>
                                <div className="m-2 p-3">
                                    {
                                        products && products.length < total && (
                                            <button className='btn btn-warning ' onClick={(e) => {
                                                e.preventDefault();
                                                setPage(page + 1);


                                            }}>
                                                {loading ? "Loading..." : "Loadmore"}


                                            </button>

                                        )
                                    }
                                </div>

                                {/* <Loader/> */}

                            </div>

                        )
                    }



                </div>

            </div>

        </Layout>
    )
}

export default HomePage