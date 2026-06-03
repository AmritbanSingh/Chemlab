import { useState } from 'react'

import { elements } from '../data/elements'
import Beaker from './Beaker'
import TestTube3D from './TestTube3D'

export default function ReactionLab({ leftEl: propLeftEl, setLeftEl: propSetLeftEl, rightEl: propRightEl, setRightEl: propSetRightEl }) {
  const [localLeftEl, localSetLeftEl] = useState(null)
  const [localRightEl, localSetRightEl] = useState(null)
  
  const leftEl = propLeftEl !== undefined ? propLeftEl : localLeftEl
  const setLeftEl = propSetLeftEl || localSetLeftEl
  
  const rightEl = propRightEl !== undefined ? propRightEl : localRightEl
  const setRightEl = propSetRightEl || localSetRightEl
  
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const [selectorSide, setSelectorSide] = useState('left') // 'left' or 'right'
  const [filterCategory, setFilterCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Reacting animation states
  const [isReacting, setIsReacting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [reactionProgress, setReactionProgress] = useState(0)
  const [reactionData, setReactionData] = useState(null)
  
  // Custom tilt animation angles for test tubes
  const [tiltAngle, setTiltAngle] = useState(0)

  // Chemical Reaction Logic Engine
  const analyzeReaction = (el1, el2) => {
    if (!el1 || !el2) return null
    
    // Sort elements by atomic number to simplify matching pairs
    const [first, second] = el1.atomicNumber <= el2.atomicNumber ? [el1, el2] : [el2, el1]
    const s1 = first.symbol
    const s2 = second.symbol
    
    // 1. Same Element
    if (first.atomicNumber === second.atomicNumber) {
      return {
        reactive: false,
        reactionType: 'none',
        title: `Homogeneous Mixture of ${first.name}`,
        equation: `${first.symbol} + ${second.symbol} \u2192 ${first.symbol} (mixture)`,
        description: `Mixing an element with itself results in no chemical reaction. The atoms mix physically but remain structurally identical.`,
        color: getElementColorHex(first),
        tempChange: 'None'
      }
    }
    
    // 2. SPECIFIC FAMOUS REACTION PAIRS
    // H + O -> H2O (Hydrogen Combustion)
    if (s1 === 'H' && s2 === 'O') {
      return {
        reactive: true,
        reactionType: 'explosive',
        title: 'Explosive Synthesis of Water',
        equation: '2H\u2082 + O\u2082 \u2192 2H\u2082O',
        description: 'An extremely explosive combustion reaction. Hydrogen gas acts as the fuel and oxygen acts as the oxidizer. When ignited, they combine instantly to release intense thermal energy and form pure water vapor.',
        color: '#e0f2fe',
        tempChange: 'Exothermic (Highly)'
      }
    }
    
    // Na + Cl -> NaCl (Sodium Chloride Synthesis)
    if (s1 === 'Na' && s2 === 'Cl') {
      return {
        reactive: true,
        reactionType: 'explosive',
        title: 'Synthesis of Sodium Chloride',
        equation: '2Na + Cl\u2082 \u2192 2NaCl',
        description: 'A violent redox reaction where soft, highly reactive metallic sodium burns in toxic greenish chlorine gas. Sodium transfers its outer electron to chlorine, releasing bright yellow flames and generating white table salt crystals.',
        color: '#f8fafc',
        tempChange: 'Exothermic (Extreme)'
      }
    }
    
    // Fe + O -> Rust (Iron Oxidation)
    if (s1 === 'O' && s2 === 'Fe') {
      return {
        reactive: true,
        reactionType: 'slow',
        title: 'Oxidation of Iron (Rusting)',
        equation: '4Fe + 3O\u2082 \u2192 2Fe\u2082O\u2083',
        description: 'A slow oxidation (corrosion) process. Iron metal reacts with atmospheric oxygen over time in the presence of moisture, slowly oxidizing to form hydrated iron(III) oxide, commonly known as reddish-brown rust.',
        color: '#78350f',
        tempChange: 'Exothermic (Very Slow)'
      }
    }

    // Cu + O -> Copper Oxide
    if (s1 === 'Cu' && s2 === 'O') {
      return {
        reactive: true,
        reactionType: 'slow',
        title: 'Synthesis of Copper(II) Oxide',
        equation: '2Cu + O\u2082 \u2192 2CuO',
        description: 'Under heating, copper metal reacts slowly with oxygen in the air. The bright reddish copper metal slowly oxidizes on its surface to form a dull black layer of copper(II) oxide.',
        color: '#1e3a8a',
        tempChange: 'Exothermic (Slow)'
      }
    }

    // Mg + O -> Magnesium Oxide Combustion
    if (s1 === 'Mg' && s2 === 'O') {
      return {
        reactive: true,
        reactionType: 'explosive',
        title: 'Magnesium Combustion',
        equation: '2Mg + O\u2082 \u2192 2MgO',
        description: 'A rapid combustion reaction. When ignited, magnesium metal reacts vigorously with oxygen in air, burning with a brilliant, blinding white flame. It releases extreme heat and leaves a fine white residue of magnesium oxide.',
        color: '#ffffff',
        tempChange: 'Exothermic (Intense)'
      }
    }

    // C + O -> Carbon Dioxide Combustion
    if (s1 === 'C' && s2 === 'O') {
      return {
        reactive: true,
        reactionType: 'fast',
        title: 'Combustion of Carbon',
        equation: 'C + O\u2082 \u2192 CO\u2082',
        description: 'A rapid combustion process. Solid carbon reacts with oxygen gas at elevated temperatures, forming gaseous carbon dioxide while releasing substantial heat energy.',
        color: '#1e293b',
        tempChange: 'Exothermic'
      }
    }

    // 3. GROUP-BASED CHEMICAL SIMILARITY REACTIONS
    
    // Noble gases (Inert)
    if (first.category === 'Noble gas' || second.category === 'Noble gas') {
      const gas = first.category === 'Noble gas' ? first : second
      const other = first.category === 'Noble gas' ? second : first
      return {
        reactive: false,
        reactionType: 'none',
        title: `Inert Mixture of ${gas.name} & ${other.name}`,
        equation: `${first.symbol} + ${second.symbol} \u2192 ${first.symbol} + ${second.symbol} (No Reaction)`,
        description: `${gas.name} is a noble gas with a completely filled valence electron shell, rendering it exceptionally stable and chemically inert. It does not react with ${other.name} under standard conditions, resulting in a simple physical gas mixture.`,
        color: mixColors(getElementColorHex(first), getElementColorHex(second), 0.5),
        tempChange: 'None'
      }
    }

    // Alkali Metals + Halogens (Extreme Salt Syntheses)
    if (
      (first.category === 'Alkali metal' && second.category === 'Halogen') ||
      (first.category === 'Halogen' && second.category === 'Alkali metal')
    ) {
      const alkali = first.category === 'Alkali metal' ? first : second
      const halogen = first.category === 'Halogen' ? first : second
      return {
        reactive: true,
        reactionType: 'explosive',
        title: `Alkali Halide Salt Synthesis`,
        equation: `2${alkali.symbol} + ${halogen.symbol}\u2082 \u2192 2${alkali.symbol}${halogen.symbol}`,
        description: `An extremely violent redox reaction. The highly electropositive alkali metal (${alkali.name}) rapidly transfers its single valence electron to the highly electronegative halogen (${halogen.name}). This reaction releases intense light and heat, forming an ionic salt.`,
        color: '#f1f5f9',
        tempChange: 'Exothermic (Violent)'
      }
    }

    // Alkali Metals + Liquid (e.g. Water/Bromine/Mercury)
    if (
      (first.category === 'Alkali metal' && second.standardState === 'Liquid') ||
      (first.standardState === 'Liquid' && second.category === 'Alkali metal')
    ) {
      const alkali = first.category === 'Alkali metal' ? first : second
      return {

        reactive: true,
        reactionType: 'explosive',
        title: `Vigorous Alkali Dissolution`,
        equation: `2${alkali.symbol} + 2H\u2082O \u2192 2${alkali.symbol}OH + H\u2082`,
        description: `Highly explosive reaction. The highly active alkali metal (${alkali.name}) reacts violently on contact with the liquid medium, releasing highly flammable hydrogen gas and creating a highly basic solution. The thermal energy generated often ignites the gas.`,
        color: '#fb7185',
        tempChange: 'Exothermic (Violent)'
      }
    }

    // Alkaline Earth Metals + Halogens
    if (
      (first.category === 'Alkaline earth metal' && second.category === 'Halogen') ||
      (first.category === 'Halogen' && second.category === 'Alkaline earth metal')
    ) {
      const alkaline = first.category === 'Alkaline earth metal' ? first : second
      const halogen = first.category === 'Halogen' ? first : second
      return {
        reactive: true,
        reactionType: 'fast',
        title: `Alkaline Earth Dihalide Synthesis`,
        equation: `${alkaline.symbol} + ${halogen.symbol}\u2082 \u2192 ${alkaline.symbol}${halogen.symbol}\u2082`,
        description: `A rapid oxidation-reduction reaction. The alkaline earth metal (${alkaline.name}) loses its two valence electrons to the halogen (${halogen.name}), forming a dihalide salt with considerable heat release.`,
        color: '#e2e8f0',
        tempChange: 'Exothermic'
      }
    }

    // Transition Metal + Halogen (Metal Halide Synthesis)
    if (first.category === 'Halogen' || second.category === 'Halogen') {
      const halogen = first.category === 'Halogen' ? first : second
      const metal = first.category === 'Halogen' ? second : first
      
      if (metal.category.includes('metal')) {
        return {
          reactive: true,
          reactionType: 'moderate',
          title: `Synthesis of ${metal.name} Halide`,
          equation: `${metal.symbol} + ${halogen.symbol}\u2082 \u2192 ${metal.symbol}${halogen.symbol}\u2082`,
          description: `Synthesis reaction. The transition/post-transition metal is oxidized by the highly active halogen, forming a colored metal halide complex inside the beaker.`,
          color: '#cbd5e1',
          tempChange: 'Exothermic'
        }
      }
    }

    // Two Metals (Alloy creation)
    if (first.category.includes('metal') && second.category.includes('metal')) {
      return {
        reactive: false,
        reactionType: 'none',
        title: `Metallic Solution / Alloy Phase`,
        equation: `${first.symbol} + ${second.symbol} \u2192 ${first.symbol}${second.symbol} (Alloy)`,
        description: `Metals do not react chemically under standard conditions. However, when heated and merged, they form homogenous solid mixtures called Alloys (like bronze or brass), which possess enhanced hardness and metallic properties.`,
        color: '#94a3b8',
        tempChange: 'None (Requires Heating)'
      }
    }

    // Halogen + Halogen (Interhalogen compounds)
    if (first.category === 'Halogen' && second.category === 'Halogen') {
      return {
        reactive: true,
        reactionType: 'moderate',
        title: `Covalent Interhalogen Synthesis`,
        equation: `${first.symbol}\u2082 + ${second.symbol}\u2082 \u2192 2${first.symbol}${second.symbol}`,
        description: `Direct combination of two different halogens. The less electronegative halogen shares electrons with the more electronegative one, forming a volatile covalent interhalogen compound.`,
        color: '#d8b4fe',
        tempChange: 'Exothermic'
      }
    }

    // DEFAULT COEXISTENCE (Physical mixture)
    return {
      reactive: false,
      reactionType: 'none',
      title: `Physical Mixture of ${first.name} & ${second.name}`,
      equation: `${first.symbol} + ${second.symbol} \u2192 ${first.symbol} + ${second.symbol} (Physical Mix)`,
      description: `No chemical reaction occurs between these two elements under standard conditions. They coexist physically as a mixture, retaining their individual atomic structures, oxidation states, and properties.`,
      color: mixColors(getElementColorHex(first), getElementColorHex(second), 0.5),
      tempChange: 'None'
    }
  }

  // Pouring Tilt Animation loop
  const triggerReaction = () => {
    if (!leftEl || !rightEl || isReacting) return
    
    setIsReacting(true)
    setIsCompleted(false)
    setReactionProgress(0)
    
    const reaction = analyzeReaction(leftEl, rightEl)
    setReactionData(reaction)
    
    let currentProg = 0
    const interval = setInterval(() => {
      currentProg += 0.01
      setReactionProgress(currentProg)
      
      // Calculate dynamic tilt angles for test tubes
      // Phase 1 (0 to 0.5): Tubes tilt down to pour
      if (currentProg < 0.35) {
        setTiltAngle((currentProg / 0.35) * 1.3) // Tilt up to 75 deg (1.3 rad)
      } else if (currentProg >= 0.35 && currentProg < 0.48) {
        setTiltAngle(1.3) // Hold pouring angle
      } else if (currentProg >= 0.48 && currentProg < 0.65) {
        // Return to normal
        const backFactor = (0.65 - currentProg) / 0.17
        setTiltAngle(backFactor * 1.3)
      } else {
        setTiltAngle(0)
      }
      
      if (currentProg >= 1.0) {
        clearInterval(interval)
        setIsReacting(false)
        setIsCompleted(true)
      }
    }, 40)
  }

  const handleReset = () => {
    setIsReacting(false)
    setIsCompleted(false)
    setReactionProgress(0)
    setReactionData(null)
    setTiltAngle(0)
  }

  const openSelector = (side) => {
    if (isReacting) return
    setSelectorSide(side)
    setIsSelectorOpen(true)
  }

  const selectElement = (el) => {
    if (selectorSide === 'left') {
      setLeftEl(el)
    } else {
      setRightEl(el)
    }
    setIsSelectorOpen(false)
    handleReset()
  }

  // Helper colors mapping
  function getElementColorHex(el) {
    if (!el) return '#3b82f6'
    
    const name = el.name
    if (name === 'Hydrogen') return '#e0f2fe'
    if (name === 'Oxygen') return '#93c5fd'
    if (name === 'Chlorine') return '#86efac'
    if (name === 'Bromine') return '#7c2d12'
    if (name === 'Mercury') return '#94a3b8'
    if (name === 'Sodium' || name === 'Lithium' || name === 'Potassium') return '#f43f5e'
    if (name === 'Gold') return '#fbbf24'
    if (name === 'Copper') return '#ea580c'
    if (name === 'Sulfur') return '#fde047'
    if (name === 'Carbon') return '#334155'
    if (name === 'Iodine') return '#a855f7'
    
    return '#64748b'
  }

  function mixColors(c1, c2, balance) {
    c1 = c1.replace('#', '')
    c2 = c2.replace('#', '')
    
    const r1 = parseInt(c1.substring(0, 2), 16)
    const g1 = parseInt(c1.substring(2, 4), 16)
    const b1 = parseInt(c1.substring(4, 6), 16)
    
    const r2 = parseInt(c2.substring(0, 2), 16)
    const g2 = parseInt(c2.substring(2, 4), 16)
    const b2 = parseInt(c2.substring(4, 6), 16)
    
    const r = Math.floor(r1 * (1 - balance) + r2 * balance).toString(16).padStart(2, '0')
    const g = Math.floor(g1 * (1 - balance) + g2 * balance).toString(16).padStart(2, '0')
    const b = Math.floor(b1 * (1 - balance) + b2 * balance).toString(16).padStart(2, '0')
    
    return `#${r}${g}${b}`
  }

  // Filter list of elements in modal
  const filteredSelectorList = elements.filter(el => {
    const nameMatch = el.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      el.atomicNumber.toString() === searchQuery
    const catMatch = !filterCategory || el.category === filterCategory
    return nameMatch && catMatch
  })

  // Set category colors in list items
  const getItemColor = (cat) => {
    switch (cat) {
      case 'Alkali metal': return 'var(--cat-alkali-metal)'
      case 'Alkaline earth metal': return 'var(--cat-alkaline-earth-metal)'
      case 'Transition metal': return 'var(--cat-transition-metal)'
      case 'Post-transition metal': return 'var(--cat-post-transition-metal)'
      case 'Metalloid': return 'var(--cat-metalloid)'
      case 'Nonmetal': return 'var(--cat-nonmetal)'
      case 'Halogen': return 'var(--cat-halogen)'
      case 'Noble gas': return 'var(--cat-noble-gas)'
      case 'Lanthanide': return 'var(--cat-lanthanide)'
      case 'Actinide': return 'var(--cat-actinide)'
      default: return 'var(--cat-unknown)'
    }
  }

  return (
    <div className="reaction-layout">
      {/* 3D Reaction Bench */}
      <div className="glass-card reaction-chamber">
        
        {/* Left Tube Station */}
        <div className={`tube-station ${isReacting && reactionProgress < 0.65 ? 'tilting-left' : ''}`}>
          <div className="tube-station-title">Left Tube</div>
          <div className="element-selector-tray">
            <button className="selector-btn" onClick={() => openSelector('left')}>
              {leftEl ? (
                <>
                  <span>{leftEl.symbol} - {leftEl.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>#{leftEl.atomicNumber}</span>
                </>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>Select Element...</span>
              )}
            </button>
          </div>
          <div style={{ width: '100%', height: '240px', position: 'relative' }}>
            {leftEl ? (
              <TestTube3D 
                element={leftEl} 
                isPouring={isReacting} 
                tiltAngle={tiltAngle} 
                pouringSide="left" 
              />
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                Empty Stand
              </div>
            )}
          </div>
        </div>

        {/* Central Beaker */}
        <div className="beaker-station">
          <div className="tube-station-title" style={{ marginBottom: '1rem' }}>Reaction Beaker</div>
          <div style={{ width: '100%', height: '240px', position: 'relative' }}>
            <Beaker 
              leftElement={leftEl}
              rightElement={rightEl}
              reactionProgress={reactionProgress}
              isReacting={isReacting}
              isCompleted={isCompleted}
              reactionType={reactionData ? reactionData.reactionType : 'none'}
              resultColor={reactionData ? reactionData.color : '#64748b'}
            />
          </div>
        </div>

        {/* Right Tube Station */}
        <div className={`tube-station ${isReacting && reactionProgress < 0.65 ? 'tilting-right' : ''}`}>
          <div className="tube-station-title">Right Tube</div>
          <div className="element-selector-tray">
            <button className="selector-btn" onClick={() => openSelector('right')}>
              {rightEl ? (
                <>
                  <span>{rightEl.symbol} - {rightEl.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>#{rightEl.atomicNumber}</span>
                </>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>Select Element...</span>
              )}
            </button>
          </div>
          <div style={{ width: '100%', height: '240px', position: 'relative' }}>
            {rightEl ? (
              <TestTube3D 
                element={rightEl} 
                isPouring={isReacting} 
                tiltAngle={tiltAngle} 
                pouringSide="right" 
              />
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                Empty Stand
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Action Controls */}
      <div className="action-hub">
        <button 
          className="action-btn action-btn-primary" 
          onClick={triggerReaction}
          disabled={!leftEl || !rightEl || isReacting}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4.5 16.5c-1.5 1.25-2.5 3-2.5 5h20c0-2-1-3.75-2.5-5M12 2v10M8 8l4-4 4 4" />
          </svg>
          Combine & React
        </button>
        
        <button 
          className="action-btn action-btn-secondary" 
          onClick={handleReset}
          disabled={isReacting || (!leftEl && !rightEl && !reactionData)}
        >
          Reset Lab
        </button>
      </div>

      {/* Detailed Chemical Report Card */}
      {reactionProgress >= 0.5 && reactionData && (
        <div 
          className={`glass-card result-card ${
            reactionData.reactionType === 'explosive' 
              ? 'explosive' 
              : reactionData.reactive 
                ? 'reactive' 
                : 'inert'
          }`}
          style={{ animation: 'fade-in 0.3s ease-out' }}
        >
          {isCompleted && (
            <div style={{
              background: 'var(--success-glow)',
              color: 'var(--success)',
              border: '1px solid var(--success)',
              borderRadius: '8px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              width: 'fit-content'
            }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', animation: 'pulse 1.5s infinite' }}></span>
              ✓ Reaction Concluded & Stable
            </div>
          )}
          
          <div className="result-header">
            <div className="result-title">{reactionData.title}</div>
            <span className={`reaction-speed-tag speed-${reactionData.reactionType}`}>
              Speed: {reactionData.reactionType}
            </span>
          </div>

          <div className="equation-box">
            {reactionData.equation}
          </div>

          <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            {reactionData.description}
          </p>

          <div className="result-properties">
            <div className="info-card">
              <div className="info-label">Thermodynamics</div>
              <div className="info-value" style={{ color: reactionData.tempChange.includes('Exo') ? 'var(--danger)' : 'var(--text-primary)' }}>
                {reactionData.tempChange}
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-label">Product State</div>
              <div className="info-value">
                {reactionData.reactionType === 'explosive' ? 'Gas / Plasma' : 'Aqueous Complex'}
              </div>
            </div>

            <div className="info-card">
              <div className="info-label">Visual Effect</div>
              <div className="info-value" style={{ textTransform: 'capitalize' }}>
                {reactionData.reactionType === 'explosive' ? 'Combustion & Smoke' : reactionData.reactive ? 'Bubbling Wave' : 'Uniform Color Merging'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reaction Table */}
      {reactionProgress >= 0.5 && reactionData && (
        <div className="glass-card reaction-table-wrap" style={{ animation: 'fade-in 0.3s ease-out' }}>
          <div className="reaction-table-title">Reaction Table</div>
          <div className="reaction-table-grid">
            <div className="reaction-table-cell">
              <div className="reaction-table-label">Reactant A (Left)</div>
              <div className="reaction-table-value">{leftEl ? `${leftEl.symbol} - ${leftEl.name}` : '—'}</div>
            </div>
            <div className="reaction-table-cell">
              <div className="reaction-table-label">Reactant B (Right)</div>
              <div className="reaction-table-value">{rightEl ? `${rightEl.symbol} - ${rightEl.name}` : '—'}</div>
            </div>

            <div className="reaction-table-cell">
              <div className="reaction-table-label">Reaction Type</div>
              <div className="reaction-table-value">{reactionData.reactionType}</div>
            </div>

            <div className="reaction-table-cell" style={{ gridColumn: 'span 2' }}>
              <div className="reaction-table-label">Equation</div>
              <div className="reaction-table-equation">{reactionData.equation}</div>
            </div>

            <div className="reaction-table-cell">
              <div className="reaction-table-label">Thermodynamics</div>
              <div className="reaction-table-value" style={{ color: reactionData.tempChange.includes('Exo') ? 'var(--danger)' : 'var(--text-primary)' }}>
                {reactionData.tempChange}
              </div>
            </div>

            <div className="reaction-table-cell">
              <div className="reaction-table-label">Product Visual</div>
              <div className="reaction-table-value">
                {reactionData.reactionType === 'explosive'
                  ? 'Gas / Plasma'
                  : 'Aqueous Complex / Mixture'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Select Element Overlay Modal popup */}

      {isSelectorOpen && (
        <div className="dropdown-overlay" onClick={() => setIsSelectorOpen(false)}>
          <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
            <div className="dropdown-search">
              <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
                Choose Element for {selectorSide === 'left' ? 'Left Tube' : 'Right Tube'}
              </h3>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {/* Search query input */}
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by symbol, name, or atomic number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '1rem' }}
                />
                
                {/* Group category filter */}
                <select
                  className="filter-select"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Nonmetal">Nonmetals</option>
                  <option value="Noble gas">Noble Gases</option>
                  <option value="Alkali metal">Alkali Metals</option>
                  <option value="Alkaline earth metal">Alkaline Earths</option>
                  <option value="Transition metal">Transition Metals</option>
                  <option value="Post-transition metal">Post-Transition</option>
                  <option value="Metalloid">Metalloids</option>
                  <option value="Halogen">Halogens</option>
                  <option value="Lanthanide">Lanthanides</option>
                  <option value="Actinide">Actinides</option>
                </select>
              </div>
            </div>

            <div className="dropdown-list">
              {filteredSelectorList.map(el => {
                const col = getItemColor(el.category)
                return (
                  <div 
                    key={el.atomicNumber} 
                    className="dropdown-item"
                    onClick={() => selectElement(el)}
                    style={{ '--item-color': col }}
                  >
                    <span className="dropdown-item-symbol" style={{ color: col }}>
                      {el.symbol}
                    </span>
                    <div className="dropdown-item-info">
                      <span className="dropdown-item-name">{el.name}</span>
                      <span className="dropdown-item-num">#{el.atomicNumber}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div style={{ padding: '1rem', textAlign: 'right', borderTop: '1px solid var(--border-color)' }}>
              <button 
                className="action-btn action-btn-secondary" 
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={() => setIsSelectorOpen(false)}
              >
                Close Selection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
