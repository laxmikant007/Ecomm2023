import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div
            // style={{
            //     position: 'relative',
            //     minHeight: '100vh',
            //     overflow: 'hidden',
            //     width: '100vw'
            // }}
        >
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>

            </Helmet>
            <Header />
            <main style={{ minHeight: "70vh" }}>
                {children}
                <ToastContainer position="top-center" autoClose={5000} />
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "Ecommerce App - shop now",
    description: "mern stack project",
    keywords: "mern , medical , node , mongodb",
    author: "Laxmikant Saraswat"


}

export default Layout