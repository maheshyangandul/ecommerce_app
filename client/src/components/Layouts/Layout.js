import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

const Layout = ({ children, description, title, author, keywords }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "80vh" }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
};

Layout.defaultProps = {
    title: "Ecommerce App - Shop now",
    description: "mern ecommerce app",
    keywords: "mern, react, node, mongodb, express",
    author: "Mahesh",
}

export default Layout