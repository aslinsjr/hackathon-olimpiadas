import "./Header.css"

import { useState, useEffect } from "react"

const Header = ({ darkMode, handleMode }) => {

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
      <div className="light-and-dark">
        <i className={darkMode ? "bi bi-moon-fill" : "bi bi-moon"} onClick={(e) => handleMode(e)}></i>
        <h2>Dark Mode</h2>
      </div>
    </div>
  )
}

export default Header