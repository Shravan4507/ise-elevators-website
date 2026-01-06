import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import About from '../../pages/About'
import Products from '../../pages/Products'
import Services from '../../pages/Services'
import Contact from '../../pages/Contact'

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Contact />} />
        </Routes>
    )
}

export default PublicRoutes
