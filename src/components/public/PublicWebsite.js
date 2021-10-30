import React from 'react'

import './publicWebsite.scss'

import Nav from './sections/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const PublicWebsite = () => {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  )
}

export default PublicWebsite
