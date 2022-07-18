import React from 'react'
import Featured from '../../components/featured/Featured'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperty from '../../components/featuredPropertyList/FeaturedProperty'
import Mailer from '../../components/mailer/Mailer.jsx'
import Footer from '../../components/footer/footer'

import './Home.css'
function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <PropertyList />
        <FeaturedProperty />
        <Mailer />
        <Footer />
      </div>
    </div>
  )
}

export default Home