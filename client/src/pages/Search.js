// import { Layout } from 'antd'
import React from 'react';
import { useSearch } from '../context/search';
import Layout from '../components/Layout/Layout';

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout title='Search Results'>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{
                        values?.results.length < 1
                            ? 'No Product Found'
                            : `Found ${values?.results.length}`}

                    </h6>
                    <div className="d-flex flex-wrap">
                        <div className="d-flex flex-wrap">


                            {


                                values?.results.map((item) => (


                                    <div className="card m-4 " style={{ width: '18rem' }} key={item._id} >
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt={item.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.description.substring(0, 30)}...</p>
                                            <p className="card-text">{item.price}</p>

                                            <button className="btn btn-primary ms-2">Deatils</button>
                                            <button className="btn btn-success ms-2">Add To Cart</button>

                                        </div>
                                    </div>


                                ))}
                        </div>
                        {/* <div className="m-2 p-3">
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
                        </div> */}

                    </div>
                </div>
            </div>


        </Layout>

    )
}

export default Search