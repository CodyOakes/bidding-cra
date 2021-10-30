import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'

const Nav = () => {
  const [darknav, setDarknav] = useState(false)

  const scrollToTop = () => {
    scroll.scrollToTop()
  }

  const navbarDark = () => {
    if (window.scrollY > window.innerHeight - 100) {
      setDarknav(true)
    } else {
      setDarknav(false)
    }
  }
  window.addEventListener('scroll', navbarDark)
  return (
    <section id='nav' className={darknav ? 'darkBg' : undefined}>
      <div className='container'>
        <img
          src='img/larrys-logo.svg'
          alt='Larrys Electric & Heating'
          onClick={scrollToTop}
        />
        <nav>
          <li>
            <ScrollLink
              to='hero'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to='about'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              About
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to='services'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Services
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to='contact'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Contact
            </ScrollLink>
          </li>
          <li>
            <Link to='/login'>Log In</Link>
          </li>
        </nav>
      </div>
    </section>
  )
}

export default Nav
