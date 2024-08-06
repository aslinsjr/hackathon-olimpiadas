import "./Header.css"

import { useState, useEffect } from "react"

const Header = ({ darkMode, handleMode, handleMobile, mobileSearch }) => {

  const [logoSize, setLogoSize] = useState(400)
  const [windowY, setWindowY] = useState(0)

  useEffect(()=> {

    if(windowY !== 0) {
      setLogoSize(50)
    } else {
      setLogoSize(400)
    }
    
  }, [windowY])
  

  document.addEventListener('scroll', () => {
    setWindowY(window.scrollY)
  })

  return (
    <div className="header-container" style={darkMode ? { backgroundColor: "var(--dark-blue)", boxShadow: "1px 1px 0.5rem 1px var(--dark-gray)"} : {}}>
      <div className="image-box">
        <img style={{width : logoSize + "px"}} src={darkMode ? "./logo-invertida.png" : "./logo.png"} alt="Logo" />
      </div>
      <div className="light-and-dark" style={logoSize == 400 ? {opacity:'0.5'} : {}}>
        <i className={darkMode ? "bi bi-moon-fill" : "bi bi-moon"} onClick={(e) => handleMode(e)}></i>
        <h2 style={logoSize == 400 ? {display:'none'} : {}}><span style={darkMode ? {color:"var(--dark-gray)", fontWeight: "bolder"} : {}}>Dark</span> / <span style={!darkMode ? {color:"var(--dark-gray)", fontWeight: "lighter"} : {}}>Light</span></h2>
      </div>
      <div className="mobile-search" style={logoSize == 400 ? {opacity:'0.5'} : {}}>
      <i className={mobileSearch ? "bi bi-x" : "bi bi-search"} onClick={() => handleMobile()}></i>
        <h2 style={logoSize == 400 ? {display:'none'} : {}}>Pesquisa</h2>
      </div>
      
    </div>
  )
}

export default Header