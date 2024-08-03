import { useState, useEffect } from 'react'

import Header from './components/Header'
import FilterSearchComponent from './components/FilterSearchComponent'

import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [showingNation, setShowingNations] = useState(false)
  const [nationClicked, setNationClicked] = useState({})
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [newData, setNewData] = useState([])
  const [filterArray, setFilterArray] = useState([])
  const [delay, setDelay] = useState(false)

  setTimeout(() => {
    setDelay(true)
  }, 1500)

  async function getData() {
    try {
      const response = await fetch("https://apis.codante.io/olympic-games/countries")

      const orders = await response.json()

      setData(orders.data)

    } catch (error) {
      console.log(error)
    }
  }

  function handleMode(e) {
    if (e.target.className.includes("fill")) {
      setDarkMode(false)

    } else {
      setDarkMode(true)

    }
  }

  function handleScroll() {
    window.scrollTo(0, 100)
  }

  function handleClean() {
    const input = document.querySelector("input")

    input.value = ""

    setSearch("")
  }

  function handleSearch(e) {
    setSearch(e.target.value.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()))
  }

  function handleFilter(e) {
    const region = e.target.value.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())

    const filterRegionArray = data.filter((nation) => {
      return nation.region.includes(region)
    })

    setFilterArray(filterRegionArray)
  }

  useEffect(() => {

    getData()
    setNewData(data)

  }, [delay])

  useEffect(() => {
    const newArray = data.filter((nation) => {
      return nation.name.includes(search)
    })

    setNewData(newArray)
  }, [search])

  useEffect(() => {
    if (filterArray.length == 0) {
      setNewData(data)
    } else {
      setNewData(filterArray)
    }
  }, [filterArray])



  return (
    <div className={darkMode ? "app-container dark" : "app-container"}>
      <Header handleMode={handleMode} darkMode={darkMode} />
        <div className="inner-app">
          <FilterSearchComponent handleClean={handleClean} handleSearch={handleSearch} handleFilter={handleFilter} darkMode={darkMode} />
          <h1 style={darkMode ? {backgroundColor: "var(--dark-blue)", boxShadow: "1px 1px 0.3rem 1px var(--white)"} : {backgroundColor: "var(--white)" , boxShadow: "1px 1px 0.5rem 1px var(--dark-blue)"}}>Quadro de Medalhas</h1>
          <div className='countries-container'>
            {newData.map((nation) => {
              return (
                <div className={darkMode ? 'countrie-box dark-box' : 'countrie-box'} key={nation.id} id={nation.name}>
                  <img className='flag-img' src={nation.flag_url} alt={nation.name + " Flag"} />
                  <h2 className='countrie-name'>{nation.name}</h2>
                  <p className='medals'>Medalhas de Ouro: <span>{nation.gold_medals}🥇</span></p>
                  <p className='medals'>Medalhas de Prata: <span>{nation.silver_medals}🥈</span></p>
                  <p className='medals'>Medalhas de Bronze: <span>{nation.bronze_medals}🥉</span></p>
                  <p id='nation-rank' style={darkMode ? {color: "var(--dark-blue)"} : {}}>{`${nation.rank}° lugar`}</p>
                </div>)
            })}
          </div>
        </div>
      <button id='scroll-btn' onClick={() => handleScroll()} style={darkMode ? {backgroundColor: 'var(--dark-blue)', boxShadow: "1px 1px 0.3rem 1px var(--white)"} : {}}><i className="bi bi-arrow-up" style={darkMode ? {color: 'var(--white)'} : {}}></i></button>
    </div>
  )
}

export default App
