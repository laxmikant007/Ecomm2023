import React from 'react'
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
        <div className="container">
            <div className="row">
                {categories?.map((c) =>(
                    <div className="col-md-6" key={c._id}>
                        
                            <Link className='btn btn-success m-2' to={`/category/${c.slug}`}>
                            {c.name}

                            </Link>
                        
                    </div>
                ))}
            </div>
        </div>


    </Layout>
  )
}

export default Categories