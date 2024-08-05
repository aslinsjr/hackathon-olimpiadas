import './FilterSearchComponent.css'

const FilterSearchComponent = ({handleSearch, handleFilter, darkMode, handleClean}) => {
  return (
    <div className='filter-container' >
      <div className={darkMode ? "input-controll dark-input" : "input-controll"} style={darkMode ? {boxShadow: "1px 1px 0.3rem 1px var(--white)"} : {}}>
        <i className="bi bi-search"></i>
        <input className={darkMode ? "search-input dark-input" : "search-input"} onChange={(e) => handleSearch(e)} type="text" />
        <i className="bi bi-x-lg" onClick={() => handleClean()}></i>
      </div>
      <select onChange={(e) => handleFilter(e)} name="region-select" className={darkMode ? "region-select dark-input" : "region-select"} style={darkMode ? {boxShadow: "1px 1px 0.3rem 1px var(--white)"} : {}}>
        <option value="filter-by-region" selected>Filtre por Continente</option>
        <option value="AFR">Africa</option>
        <option value="AME">Americas</option>
        <option value="ASI">Asia</option>
        <option value="EUR">Europe</option>
        <option value="OCE">Oceania</option>
      </select>
      <button><i className="bi bi-search"></i></button>
    </div>
  )
}

export default FilterSearchComponent
