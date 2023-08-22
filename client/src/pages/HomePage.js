import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button, Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';




const HomePage = () => {
    const [cart , setCart]  = useCart();

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)


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
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data?.products);
            // console.log(data.products);

        } catch (error) {
            setLoading(false);
            console.log("Error while getting Products -->", error);
            toast.error("Something Went Wrong!!😢😢")
        }

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
            <div className="row">
                <div className="col-md-3 mt-3">
                    <h4 className='text-center'> Filters by Category</h4>

                    <div className="d-flex flex-column m-4">
                        {
                            categories?.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            ))
                        }
                    </div>
                    <h4 className='text-center'> Filters by Price</h4>
                    <div className="d-flex flex-column m-4">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>

                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column m-4">
                        <button className='btn btn-danger ' onClick={() => window.location.reload()}>RESET FILTERS</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'> All Products</h1>
                    {/* {JSON.stringify(radio , null , 4)} */}
                    <div className="d-flex flex-wrap">
                        <div className="d-flex flex-wrap">


                            {


                                products?.map((item) => (


                                    <div className="card m-4 " style={{ width: '18rem' }} key={item._id} >
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt={item.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.description.substring(0, 30)}...</p>
                                            <p className="card-text">{item.price}</p>

                                            <button className="btn btn-primary ms-2" onClick={()=>navigate(`/product/${item.slug}`)} >More Details</button>
                                            <button className="btn btn-success ms-2"
                                            onClick={()=>{
                                                setCart([...cart , item]);
                                                toast.success("Product Added to Cart Successfully!!")
                                                
                                            }}
                                            
                                            >Add To Cart</button>

                                        </div>
                                    </div>


                                ))}
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

                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default HomePage