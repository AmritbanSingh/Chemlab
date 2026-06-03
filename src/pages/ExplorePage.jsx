import { useState } from 'react'
import ElementDetails from '../components/ElementDetails'
import PeriodicTable from '../components/PeriodicTable'

export default function ExplorePage() {
  const [selectedElement, setSelectedElement] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [stateFilter, setStateFilter] = useState('')

  const handleResetFilters = () => {
    setSearchTerm('')
    setCategoryFilter('')
    setStateFilter('')
  }

  return (
    <div className="page-view explore-page">
      {/* Floating title block directly on background, matching the mockup */}
      <div className="explore-header-floating">
        <h1 className="explore-title">Interactive Periodic Table</h1>
        <p className="explore-subtitle">Click on any element to discover its properties, state, and common uses.</p>
      </div>

      <section id="periodic-table-section">
        {/* Sleek transparent search and filters bar */}
        <div className="controls-bar-floating">
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by symbol, name, or atomic number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Nonmetal">Nonmetals</option>
              <option value="Noble gas">Noble Gases</option>
              <option value="Alkali metal">Alkali Metals</option>
              <option value="Alkaline earth metal">Alkaline Earths</option>
              <option value="Transition metal">Transition Metals</option>
              <option value="Post-transition metal">Post-Transition Metals</option>
              <option value="Metalloid">Metalloids</option>
              <option value="Halogen">Halogens</option>
              <option value="Lanthanide">Lanthanides</option>
              <option value="Actinide">Actinides</option>
            </select>

            <select
              className="filter-select"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="">All States (STP)</option>
              <option value="Solid">Solid</option>
              <option value="Liquid">Liquid</option>
              <option value="Gas">Gas</option>
            </select>

            {(searchTerm || categoryFilter || stateFilter) && (
              <button className="action-btn action-btn-secondary filter-clear-btn" onClick={handleResetFilters}>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <PeriodicTable
          onSelectElement={setSelectedElement}
          activeElement={selectedElement}
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          stateFilter={stateFilter}
        />
      </section>

      {selectedElement && (
        <ElementDetails
          element={selectedElement}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </div>
  )
}
