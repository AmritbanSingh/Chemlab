import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Award, RotateCcw, AlertTriangle, ArrowRight, Award as Trophy, Zap, Clock, HelpCircle, CheckCircle, XCircle } from 'lucide-react'

// ============================================================
// 🧪 THE COMPLETE 50 CHEMISTRY QUESTIONS DATABASE
// ============================================================
const chemistryQuestions = [
  {
    id: 1,
    category: "General Chemistry",
    difficulty: "Easy",
    question: "What is the most abundant element in the universe?",
    options: ["Oxygen", "Hydrogen", "Helium", "Carbon"],
    answerIndex: 1,
    explanation: "Hydrogen (H) is the simplest and most abundant chemical substance in the universe, making up approximately 75% of all baryonic (visible) mass."
  },
  {
    id: 2,
    category: "Periodic Table",
    difficulty: "Easy",
    question: "What is the chemical symbol for Gold?",
    options: ["Gd", "Ag", "Au", "Go"],
    answerIndex: 2,
    explanation: "The chemical symbol for gold is 'Au', derived from the Latin word 'aurum', which translates to 'shining dawn'."
  },
  {
    id: 3,
    category: "Periodic Table",
    difficulty: "Easy",
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Lithium", "Oxygen"],
    answerIndex: 1,
    explanation: "Hydrogen has exactly one proton in its nucleus, giving it the atomic number 1. It is the first element in the periodic table."
  },
  {
    id: 4,
    category: "Periodic Table",
    difficulty: "Medium",
    question: "Which non-metal is a liquid at room temperature?",
    options: ["Bromine", "Mercury", "Chlorine", "Iodine"],
    answerIndex: 0,
    explanation: "Bromine (Br) is the only nonmetallic element that is a liquid under standard temperature and pressure conditions, exhibiting a dark reddish-brown color."
  },
  {
    id: 5,
    category: "Periodic Table",
    difficulty: "Easy",
    question: "Which metallic element is liquid at room temperature?",
    options: ["Gallium", "Mercury", "Cesium", "Sodium"],
    answerIndex: 1,
    explanation: "Mercury (Hg), traditionally called quicksilver, is the only metallic element that remains liquid at standard room temperature and pressure."
  },
  {
    id: 6,
    category: "Atomic Structure",
    difficulty: "Easy",
    question: "What is the electrical charge of a neutron?",
    options: ["Positive (+1)", "Negative (-1)", "Neutral (0)", "Variable"],
    answerIndex: 2,
    explanation: "Neutrons are subatomic particles located in the atomic nucleus that carry no electrical charge (they are electrically neutral)."
  },
  {
    id: 7,
    category: "Periodic Table",
    difficulty: "Easy",
    question: "What is the common group name for elements in Group 18 of the periodic table?",
    options: ["Alkali Metals", "Halogens", "Noble Gases", "Lanthanides"],
    answerIndex: 2,
    explanation: "Group 18 elements are called Noble Gases. They possess completely filled outer valence electron shells, making them highly stable and chemically inert."
  },
  {
    id: 8,
    category: "Acids & Bases",
    difficulty: "Medium",
    question: "Which acid is primary constituent of car batteries?",
    options: ["Hydrochloric Acid", "Nitric Acid", "Sulfuric Acid", "Phosphoric Acid"],
    answerIndex: 2,
    explanation: "Lead-acid car batteries use Sulfuric Acid (H₂SO₄) diluted with water as the electrolyte to conduct electricity during chemical discharge cycles."
  },
  {
    id: 9,
    category: "General Chemistry",
    difficulty: "Easy",
    question: "Which gas constitutes approximately 78% of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    answerIndex: 2,
    explanation: "Nitrogen gas (N₂) is the most abundant gas in Earth's atmosphere, accounting for roughly 78.08%, while Oxygen makes up about 20.95%."
  },
  {
    id: 10,
    category: "General Chemistry",
    difficulty: "Easy",
    question: "What is the common name for solid Carbon Dioxide?",
    options: ["Dry Ice", "Liquid Nitrogen", "Slush Ice", "Quartz"],
    answerIndex: 0,
    explanation: "Solid carbon dioxide is called 'Dry Ice' because it undergoes sublimation—converting directly from a solid to a gas without melting into liquid."
  },
  {
    id: 11,
    category: "Atomic Structure",
    difficulty: "Medium",
    question: "Which subatomic particle was discovered by J.J. Thomson in 1897 using cathode ray tubes?",
    options: ["Proton", "Neutron", "Electron", "Quark"],
    answerIndex: 2,
    explanation: "J.J. Thomson discovered the electron, showing that atoms contain small, negatively charged fundamental particles, which disproved the indivisible atom theory."
  },
  {
    id: 12,
    category: "General Chemistry",
    difficulty: "Easy",
    question: "What is the chemical formula for common table salt?",
    options: ["NaCO₃", "HCl", "NaCl", "NaOH"],
    answerIndex: 2,
    explanation: "Table salt is Sodium Chloride, represented by the chemical formula NaCl. It is an ionic lattice comprised of equal parts sodium and chlorine ions."
  },
  {
    id: 13,
    category: "Acids & Bases",
    difficulty: "Easy",
    question: "What is the pH of chemically pure water at standard room temperature?",
    options: ["1", "5", "7", "14"],
    answerIndex: 2,
    explanation: "Pure water is neutral on the pH scale, having a pH of exactly 7.0 at 25°C because the concentration of hydronium and hydroxide ions is perfectly balanced."
  },
  {
    id: 14,
    category: "Chemical Reactions",
    difficulty: "Easy",
    question: "What substance increases the rate of a chemical reaction without being consumed in the process?",
    options: ["Reactant", "Solvent", "Catalyst", "Inhibitor"],
    answerIndex: 2,
    explanation: "A catalyst speeds up a reaction by providing an alternative reaction pathway with a lower activation energy, remaining completely unchanged at the end."
  },
  {
    id: 15,
    category: "Periodic Table",
    difficulty: "Medium",
    question: "Which is the lightest and most highly reactive halogen element?",
    options: ["Chlorine", "Fluorine", "Bromine", "Astatine"],
    answerIndex: 1,
    explanation: "Fluorine (F) is the first element in Group 17 (Halogens). It is a pale yellow gas and is the most chemically reactive and electronegative element in existence."
  },
  {
    id: 16,
    category: "Chemical Bonding",
    difficulty: "Easy",
    question: "What type of chemical bond is formed when two atoms share a pair of electrons?",
    options: ["Ionic Bond", "Covalent Bond", "Metallic Bond", "Hydrogen Bond"],
    answerIndex: 1,
    explanation: "A covalent bond consists of the mutual sharing of one or more pairs of electrons between two non-metallic atoms to achieve stable noble gas configurations."
  },
  {
    id: 17,
    category: "Chemical Bonding",
    difficulty: "Easy",
    question: "What type of bond is formed by the electrostatic attraction between oppositely charged ions?",
    options: ["Covalent Bond", "Ionic Bond", "Coordinate Bond", "Metallic Bond"],
    answerIndex: 1,
    explanation: "An ionic bond forms when one or more electrons are completely transferred from a metal atom (forming a cation) to a non-metal atom (forming an anion)."
  },
  {
    id: 18,
    category: "Atomic Structure",
    difficulty: "Easy",
    question: "How many valence electrons does a neutral Carbon atom possess?",
    options: ["2", "4", "6", "8"],
    answerIndex: 1,
    explanation: "Carbon has the atomic number 6, with an electron configuration of 1s² 2s² 2p². The outer shell (n=2) contains 4 valence electrons, allowing it to form 4 covalent bonds."
  },
  {
    id: 19,
    category: "General Chemistry",
    difficulty: "Medium",
    question: "What is the chemical formula of Ozone?",
    options: ["O₂", "O₃", "CO₂", "H₂O"],
    answerIndex: 1,
    explanation: "Ozone is a triatomic allotrope of oxygen, consisting of three oxygen atoms bonded together, represented chemically as O₃."
  },
  {
    id: 20,
    category: "Periodic Table",
    difficulty: "Easy",
    question: "Which synthetic element was named to honor the legendary physicist Albert Einstein?",
    options: ["Fermium", "Nobelium", "Einsteinium", "Mendelevium"],
    answerIndex: 2,
    explanation: "Einsteinium (Es, atomic number 99) is a highly radioactive transuranic synthetic element discovered in the debris of the first thermonuclear bomb explosion in 1952."
  },
  {
    id: 21,
    category: "General Chemistry",
    difficulty: "Easy",
    question: "What is the primary gaseous component of natural gas?",
    options: ["Ethane", "Propane", "Methane", "Butane"],
    answerIndex: 2,
    explanation: "Methane (CH₄), a simple single-carbon alkane, makes up approximately 70% to 90% of the hydrocarbon mixture found in natural gas."
  },
  {
    id: 22,
    category: "Acids & Bases",
    difficulty: "Medium",
    question: "Which of the following pH values indicates a highly acidic solution?",
    options: ["pH 1", "pH 6", "pH 8", "pH 13"],
    answerIndex: 0,
    explanation: "The pH scale ranges from 0 to 14. Lower numbers represent higher acidity. A pH of 1 is highly acidic, whereas a pH of 13 represents a strong base."
  },
  {
    id: 23,
    category: "Chemical Reactions",
    difficulty: "Medium",
    question: "Which gas is released when a reactive metal like Zinc reacts with Hydrochloric Acid?",
    options: ["Oxygen", "Chlorine", "Hydrogen", "Carbon Dioxide"],
    answerIndex: 2,
    explanation: "This single displacement reaction (Zn + 2HCl → ZnCl₂ + H₂) yields zinc chloride salt and releases highly flammable Hydrogen gas (H₂)."
  },
  {
    id: 24,
    category: "Lab Safety",
    difficulty: "Easy",
    question: "If a corrosive chemical splashes into your eyes, how long should you rinse them at the eyewash station?",
    options: ["1-2 minutes", "At least 15 minutes", "5 minutes", "Rinsing is not recommended"],
    answerIndex: 1,
    explanation: "Safety protocols dictate flushing eyes with clean, running water at an eyewash station for at least 15-20 minutes to thoroughly dilute and clear out corrosive chemicals."
  },
  {
    id: 25,
    category: "Chemical Reactions",
    difficulty: "Medium",
    question: "In a flame test, what color indicates the presence of Copper ions (Cu²⁺)?",
    options: ["Bright Crimson Red", "Greenish-Blue", "Lilac/Violet", "Golden Yellow"],
    answerIndex: 1,
    explanation: "Copper ions impart a distinctive bright greenish-blue hue to a burner flame due to electron excitation and subsequent photon emissions at specific wavelengths."
  },
  {
    id: 26,
    category: "Stoichiometry",
    difficulty: "Medium",
    question: "What is the standard SI unit for measuring the amount of a chemical substance?",
    options: ["Gram", "Mole", "Liter", "Pascal"],
    answerIndex: 1,
    explanation: "The Mole (mol) is the SI base unit representing the quantity of a substance containing exactly 6.02214076 × 10²³ elementary entities (Avogadro's number)."
  },
  {
    id: 27,
    category: "Stoichiometry",
    difficulty: "Medium",
    question: "What is the approximate numerical value of Avogadro's constant?",
    options: ["3.00 × 10⁸", "6.02 × 10²³", "1.60 × 10⁻¹⁹", "9.81"],
    answerIndex: 1,
    explanation: "Avogadro's constant is 6.022 × 10²³ molecules, atoms, or particles per mole, representing the ratio of particles to the amount of substance."
  },
  {
    id: 28,
    category: "Periodic Table",
    difficulty: "Easy",
    question: "Which metallic element is represented by the chemical symbol 'K'?",
    options: ["Krypton", "Potassium", "Cobalt", "Calcium"],
    answerIndex: 1,
    explanation: "Potassium is represented by the letter 'K', derived from its Neo-Latin name 'Kalium', which refers to alkali substances extracted from plant ashes."
  },
  {
    id: 29,
    category: "Atomic Structure",
    difficulty: "Easy",
    question: "Which subatomic particles reside inside the central nucleus of an atom?",
    options: ["Protons and Electrons", "Electrons and Neutrons", "Protons and Neutrons", "Only Protons"],
    answerIndex: 2,
    explanation: "The dense atomic nucleus houses nucleons, which consist of positively charged Protons and uncharged Neutrons, while electrons orbit in shells surrounding it."
  },
  {
    id: 30,
    category: "General Chemistry",
    difficulty: "Medium",
    question: "What is the term for a substance converting directly from the solid phase to the gas phase?",
    options: ["Evaporation", "Condensation", "Sublimation", "Deposition"],
    answerIndex: 2,
    explanation: "Sublimation is the endothermic phase transition of a substance directly from solid to gas, bypassing the intermediate liquid state (e.g., dry ice, iodine)."
  },
  {
    id: 31,
    category: "Periodic Table",
    difficulty: "Hard",
    question: "Which chemical element possesses the absolute highest electronegativity value on the Pauling scale?",
    options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"],
    answerIndex: 2,
    explanation: "Fluorine has the highest electronegativity of all elements, valued at 3.98 on the Pauling scale, indicating an extreme tendency to attract bonding electrons."
  },
  {
    id: 32,
    category: "General Chemistry",
    difficulty: "Medium",
    question: "What is the primary chemical compound found in ordinary silica glass?",
    options: ["Sodium Carbonate", "Silicon Dioxide", "Calcium Silicate", "Aluminium Oxide"],
    answerIndex: 1,
    explanation: "Ordinary glass is made by melting sand, which is primarily composed of Silicon Dioxide (SiO₂), also known as silica."
  },
  {
    id: 33,
    category: "Chemical Reactions",
    difficulty: "Easy",
    question: "Which colorless gas burns in air with a characteristic loud squeaky 'pop' sound during a laboratory splint test?",
    options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Helium"],
    answerIndex: 1,
    explanation: "Hydrogen gas is highly flammable. When a glowing splint is inserted into a tube containing hydrogen mixed with oxygen, it ignites rapidly, producing a distinct 'pop'."
  },
  {
    id: 34,
    category: "Chemical Reactions",
    difficulty: "Easy",
    question: "What term describes a chemical reaction that releases thermal energy (heat) into its surroundings?",
    options: ["Endothermic", "Exothermic", "Isothermal", "Catalytic"],
    answerIndex: 1,
    explanation: "An exothermic reaction releases energy (usually heat or light) to the surroundings because the energy released during bond formation exceeds the energy needed for bond breaking."
  },
  {
    id: 35,
    category: "Acids & Bases",
    difficulty: "Easy",
    question: "Which weak organic acid gives household vinegar its characteristic sour taste and sharp odor?",
    options: ["Citric Acid", "Formic Acid", "Acetic Acid", "Lactic Acid"],
    answerIndex: 2,
    explanation: "Vinegar is an aqueous solution containing approximately 5-8% Acetic Acid (CH₃COOH), a simple carboxylic acid produced by bacterial fermentation of ethanol."
  },
  {
    id: 36,
    category: "Acids & Bases",
    difficulty: "Easy",
    question: "Which strong base is commonly known as caustic soda and used extensively in soap manufacturing?",
    options: ["Calcium Hydroxide", "Sodium Hydroxide", "Ammonium Hydroxide", "Potassium Carbonate"],
    answerIndex: 1,
    explanation: "Sodium Hydroxide (NaOH) is a highly corrosive alkali known as caustic soda or lye. It reacts with fats and oils in a process called saponification to produce soap."
  },
  {
    id: 37,
    category: "Periodic Table",
    difficulty: "Easy",
    question: "What is the chemical symbol for the heavy metal element Lead?",
    options: ["Le", "Ld", "Pb", "Li"],
    answerIndex: 2,
    explanation: "The chemical symbol for lead is 'Pb', representing the Latin word 'plumbum', which is also the root for modern words like 'plumbing'."
  },
  {
    id: 38,
    category: "General Chemistry",
    difficulty: "Medium",
    question: "Which crystalline allotrope of Carbon conducts electricity despite being a non-metal?",
    options: ["Diamond", "Graphite", "Buckminsterfullerene", "Amorphous Carbon"],
    answerIndex: 1,
    explanation: "Graphite has a layered structure where carbon atoms are sp² hybridized. This leaves one delocalized electron per carbon atom free to drift, conducting electricity."
  },
  {
    id: 39,
    category: "Periodic Table",
    difficulty: "Easy",
    question: "Which Russian chemist is widely credited with publishing the first recognizable Periodic Table of Elements in 1869?",
    options: ["Antoine Lavoisier", "Dmitri Mendeleev", "John Dalton", "Marie Curie"],
    answerIndex: 1,
    explanation: "Dmitri Mendeleev formulated the Periodic Law and created the first periodic table, organizing elements by atomic mass and leaving gaps to accurately predict undiscovered elements."
  },
  {
    id: 40,
    category: "Acids & Bases",
    difficulty: "Easy",
    question: "What happens when blue litmus indicator paper is dipped into an acidic solution?",
    options: ["It remains blue", "It turns bright red", "It turns green", "It turns completely black"],
    answerIndex: 1,
    explanation: "Litmus is a water-soluble dye extracted from lichens. Under acidic conditions (pH < 4.5), the indicator molecules undergo protonation, shifting their color to red."
  },
  {
    id: 41,
    category: "General Chemistry",
    difficulty: "Easy",
    question: "What element is the primary material used in modern pencil leads?",
    options: ["Lead", "Graphite (Carbon)", "Silicon", "Charcoal"],
    answerIndex: 1,
    explanation: "Pencil leads do not contain lead. They are made from a blended mixture of Graphite (a soft allotrope of carbon) and clay, which leaves a dark gray residue on paper."
  },
  {
    id: 42,
    category: "Chemical Reactions",
    difficulty: "Medium",
    question: "Which gas turns clear limewater [aqueous Calcium Hydroxide] milky/cloudy upon bubbling through it?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Carbon Monoxide"],
    answerIndex: 2,
    explanation: "Carbon dioxide reacts with limewater to form insoluble Calcium Carbonate (CaCO₃) precipitate particles, creating a milky white suspension: Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O."
  },
  {
    id: 43,
    category: "General Chemistry",
    difficulty: "Medium",
    question: "What is the typical physical color of Chlorine gas under standard conditions?",
    options: ["Colorless", "Deep Blue", "Pale Yellow-Green", "Dark Violet"],
    answerIndex: 2,
    explanation: "Chlorine gas (Cl₂) is a diatomic gas characterized by a distinctive, suffocating odor and a pale, yellowish-green color."
  },
  {
    id: 44,
    category: "General Chemistry",
    difficulty: "Medium",
    question: "Brass is a classic metallic alloy comprised primarily of which two elements?",
    options: ["Copper and Tin", "Iron and Carbon", "Copper and Zinc", "Silver and Gold"],
    answerIndex: 2,
    explanation: "Brass is an alloy consisting of Copper (Cu) fused with Zinc (Zn), whereas Bronze is typically an alloy of Copper blended with Tin (Sn)."
  },
  {
    id: 45,
    category: "Lab Safety",
    difficulty: "Medium",
    question: "When diluting a highly concentrated acid in a laboratory, what is the correct and safe method for mixing?",
    options: ["Pour water quickly into the acid", "Pour acid slowly into water", "Pour both simultaneously", "Mix in a sealed vacuum container"],
    answerIndex: 1,
    explanation: "Always add acid slowly to water (remember 'A&W'). Diluting concentrated acid is highly exothermic. Adding water to acid can cause the mixture to flash boil and violently splash corrosive acid out."
  },
  {
    id: 46,
    category: "Acids & Bases",
    difficulty: "Easy",
    question: "What color change occurs when red litmus paper is exposed to an alkaline (basic) solution?",
    options: ["It turns white", "It turns green", "It turns dark blue", "It remains red"],
    answerIndex: 2,
    explanation: "Basic or alkaline substances (pH > 8.3) deprotonate the litmus dye structure, causing it to return to its conjugate base form, which appears deep blue."
  },
  {
    id: 47,
    category: "Atomic Structure",
    difficulty: "Hard",
    question: "What is the net electrical charge of an alpha particle?",
    options: ["-1", "0", "+1", "+2"],
    answerIndex: 3,
    explanation: "An alpha particle (α) is identical to a Helium-4 nucleus, containing 2 protons and 2 neutrons with no orbiting electrons, resulting in a net positive charge of +2."
  },
  {
    id: 48,
    category: "Chemical Bonding",
    difficulty: "Hard",
    question: "Which of the following compounds exhibits a giant covalent network structure, giving it an extremely high melting point?",
    options: ["Water (H₂O)", "Silicon Dioxide (SiO₂)", "Sodium Chloride (NaCl)", "Carbon Dioxide (CO₂)"],
    answerIndex: 1,
    explanation: "Silicon Dioxide (Quartz) forms a giant three-dimensional covalent lattice similar to diamond, where every silicon atom is covalently bonded to four oxygen atoms."
  },
  {
    id: 49,
    category: "Chemical Reactions",
    difficulty: "Medium",
    question: "What metal catalyst is traditionally employed in the industrial Haber-Bosch process to synthesize ammonia?",
    options: ["Platinum", "Nickel", "Iron", "Copper"],
    answerIndex: 2,
    explanation: "The industrial synthesis of Ammonia (N₂ + 3H₂ ⇌ 2NH₃) utilizes a finely divided porous Iron catalyst promoted with potassium and aluminum oxides to run at moderate temperatures."
  },
  {
    id: 50,
    category: "Periodic Table",
    difficulty: "Hard",
    question: "Which of the following halogens has the largest atomic radius and lowest reactivity?",
    options: ["Fluorine", "Chlorine", "Bromine", "Iodine"],
    answerIndex: 3,
    explanation: "Reactivity in Group 17 (Halogens) decreases down the group. Iodine (I) is lower down than F, Cl, and Br, meaning its valence electrons are further from the nucleus and it attracts electrons less strongly."
  }
]

export default function QuizPage() {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState('menu') // 'menu', 'playing', 'finished'
  const [quizSize, setQuizSize] = useState(10) // 10, 25, 50
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null) // index of selected option
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [userAnswers, setUserAnswers] = useState([]) // array of objects { questionId, selectedIndex, isCorrect }

  // Game setup
  const startQuiz = (size) => {
    setQuizSize(size)
    
    // Shuffle and pick questions
    const shuffled = [...chemistryQuestions].sort(() => 0.5 - Math.random())
    const selected = size === 50 ? chemistryQuestions : shuffled.slice(0, size)
    
    setSelectedQuestions(selected)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setHasSubmitted(false)
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setTimeLeft(30)
    setUserAnswers([])
    setGameState('playing')
  }

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing' || hasSubmitted) return

    if (timeLeft === 0) {
      handleAnswerSubmit(null, true) // Time ran out
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, gameState, hasSubmitted])

  const handleAnswerSelect = (optionIdx) => {
    if (hasSubmitted) return
    setSelectedAnswer(optionIdx)
  }

  const handleAnswerSubmit = (forcedIdx = null, timeRanOut = false) => {
    if (hasSubmitted) return
    
    const finalSelection = forcedIdx !== null ? forcedIdx : selectedAnswer
    const currentQuestion = selectedQuestions[currentIndex]
    
    const isCorrect = !timeRanOut && finalSelection === currentQuestion.answerIndex
    
    // Update score and streaks
    if (isCorrect) {
      setScore(prev => prev + 1)
      setStreak(prev => {
        const next = prev + 1
        if (next > maxStreak) setMaxStreak(next)
        return next
      })
    } else {
      setStreak(0)
    }

    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        options: currentQuestion.options,
        selectedIndex: finalSelection,
        correctIndex: currentQuestion.answerIndex,
        explanation: currentQuestion.explanation,
        isCorrect,
        timeOut: timeRanOut
      }
    ])

    setHasSubmitted(true)
  }

  const handleNext = () => {
    if (currentIndex + 1 < selectedQuestions.length) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setHasSubmitted(false)
      setTimeLeft(30)
    } else {
      setGameState('finished')
    }
  }

  // Rank / Title calculator
  const getRank = (percentage) => {
    if (percentage >= 90) return { title: "Noble Gas Master", desc: "Chemically stable and absolutely perfect! You have full mastery of atomic systems.", color: "var(--cat-noble-gas)" }
    if (percentage >= 75) return { title: "Transition Metal Catalyst", desc: "Highly adaptive, conductive, and fast! You accelerate every reaction with ease.", color: "var(--cat-transition-metal)" }
    if (percentage >= 50) return { title: "Alkali Spark", desc: "Energetic and reactive! With a bit more activation energy, you will explode with knowledge.", color: "var(--cat-alkali-metal)" }
    return { title: "Inert Matter", desc: "Currently in a stable ground state. Re-absorb some heat energy and try again to react!", color: "var(--text-muted)" }
  }

  const percentage = Math.round((score / quizSize) * 100)
  const rank = getRank(percentage)

  return (
    <div className="page-view explore-page" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      
      {/* ==========================================
         🎮 STATE A: QUIZ INTRO MENU
         ========================================== */}
      {gameState === 'menu' && (
        <section className="page-hero glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '3rem 2rem' }}>
          <div className="brand-icon" style={{ width: '60px', height: '60px', marginBottom: '1rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <span className="hero-eyebrow">Interactive Assessment</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Chemistry Knowledge Challenge</h1>
          <p className="hero-description" style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Test your limits and earn your chemical title! Our quiz contains exactly 50 curated academic questions spanning atomic physics, lab safety protocols, bonding mechanics, and acids.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center', width: '100%', maxWidth: '800px' }}>
            
            {/* Mode A: Sprint */}
            <div className="glass-card info-card" style={{ flex: '1', minWidth: '220px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }} onClick={() => startQuiz(10)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--cat-post-transition-metal)' }}>Fast Assessment</span>
                <Clock size={18} style={{ color: 'var(--cat-post-transition-metal)' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>10 Question Sprint</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>A quick test to check your core concepts under time limits. Perfect for speed drills!</p>
              <button className="action-btn action-btn-secondary" style={{ marginTop: 'auto', padding: '0.6rem 1rem', fontSize: '0.85rem' }}>Start Sprint</button>
            </div>

            {/* Mode B: Practice */}
            <div className="glass-card info-card" style={{ flex: '1', minWidth: '220px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }} onClick={() => startQuiz(25)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)' }}>Medium Test</span>
                <Trophy size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>25 Question Midterm</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>A balanced exam mapping chemical equations, bonding types, and acidic strengths.</p>
              <button className="action-btn action-btn-secondary" style={{ marginTop: 'auto', padding: '0.6rem 1rem', fontSize: '0.85rem' }}>Start Midterm</button>
            </div>

            {/* Mode C: Marathon */}
            <div className="glass-card info-card" style={{ flex: '1', minWidth: '220px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer', border: '1px solid rgba(236, 72, 153, 0.2)' }} onClick={() => startQuiz(50)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--cat-noble-gas)' }}>Extreme Challenge</span>
                <Zap size={18} style={{ color: 'var(--cat-noble-gas)' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>50 Question Marathon</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>The ultimate laboratory challenge! Tests every single question in the master database.</p>
              <button className="action-btn action-btn-primary" style={{ marginTop: 'auto', padding: '0.6rem 1rem', fontSize: '0.85rem', background: 'linear-gradient(135deg, var(--cat-noble-gas), var(--primary))' }}>Start Marathon</button>
            </div>

          </div>
        </section>
      )}

      {/* ==========================================
         🎮 STATE B: ACTIVE QUIZ SCREEN
         ========================================== */}
      {gameState === 'playing' && selectedQuestions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Header Progress Indicators */}
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Question {currentIndex + 1} of {quizSize}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                {selectedQuestions[currentIndex].category}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {/* Streak Badge */}
              {streak > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--warning)', fontWeight: '800', animation: 'pulse 1s infinite' }}>
                  <Zap size={16} fill="currentColor" />
                  <span>Streak {streak}x 🔥</span>
                </div>
              )}

              {/* Timer Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: timeLeft <= 5 ? 'var(--danger)' : 'var(--text-primary)', transition: 'color 0.3s' }}>
                <Clock size={16} />
                <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '1rem' }}>{timeLeft}s</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', marginTop: '0.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--cat-noble-gas))', width: `${((currentIndex) / quizSize) * 100}%`, transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Core Question Card */}
          <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <HelpCircle size={16} />
                <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Difficulty: {selectedQuestions[currentIndex].difficulty}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#fff', lineHeight: '1.4' }}>
                {selectedQuestions[currentIndex].question}
              </h2>
            </div>

            {/* Answer Options Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedQuestions[currentIndex].options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === oIdx
                const isCorrectAnswer = oIdx === selectedQuestions[currentIndex].answerIndex
                
                // Color codes
                let borderCol = 'var(--glass-border)'
                let bgCol = 'rgba(255,255,255,0.02)'
                let glow = 'none'

                if (hasSubmitted) {
                  if (isCorrectAnswer) {
                    borderCol = 'var(--success)'
                    bgCol = 'rgba(16, 185, 129, 0.1)'
                    glow = '0 0 10px rgba(16, 185, 129, 0.2)'
                  } else if (isSelected) {
                    borderCol = 'var(--danger)'
                    bgCol = 'rgba(239, 68, 68, 0.1)'
                    glow = '0 0 10px rgba(239, 68, 68, 0.2)'
                  }
                } else if (isSelected) {
                  borderCol = 'var(--primary)'
                  bgCol = 'rgba(99, 102, 241, 0.1)'
                  glow = '0 0 10px var(--primary-glow)'
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerSelect(oIdx)}
                    disabled={hasSubmitted}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.15rem 1.5rem',
                      width: '100%',
                      background: bgCol,
                      border: `1px solid ${borderCol}`,
                      borderRadius: '12px',
                      color: hasSubmitted && !isCorrectAnswer && !isSelected ? 'var(--text-muted)' : '#fff',
                      fontSize: '1rem',
                      textAlign: 'left',
                      cursor: hasSubmitted ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: glow
                    }}
                    className={!hasSubmitted ? 'info-card' : ''}
                  >
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                      fontSize: '0.85rem',
                      fontWeight: '800',
                      color: isSelected ? '#fff' : 'var(--text-secondary)',
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                    
                    {hasSubmitted && isCorrectAnswer && (
                      <CheckCircle size={18} style={{ marginLeft: 'auto', color: 'var(--success)' }} />
                    )}
                    {hasSubmitted && isSelected && !isCorrectAnswer && (
                      <XCircle size={18} style={{ marginLeft: 'auto', color: 'var(--danger)' }} />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <div>
                {!hasSubmitted && selectedAnswer === null && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Select an option to submit your answer</span>
                )}
              </div>
              
              {!hasSubmitted ? (
                <button
                  className="action-btn action-btn-primary"
                  onClick={() => handleAnswerSubmit()}
                  disabled={selectedAnswer === null}
                  style={{ padding: '0.75rem 2rem', opacity: selectedAnswer === null ? 0.5 : 1 }}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  className="action-btn action-btn-primary"
                  onClick={handleNext}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem' }}
                >
                  <span>{currentIndex + 1 === quizSize ? 'Finish Quiz' : 'Next Question'}</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Scientific Explanation Card */}
          {hasSubmitted && (
            <div
              className={`glass-card ${userAnswers[currentIndex]?.isCorrect ? 'reactive' : 'explosive'}`}
              style={{
                padding: '1.5rem 2rem',
                animation: 'fade-in 0.3s ease-out',
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                background: userAnswers[currentIndex]?.isCorrect ? 'var(--success-glow)' : 'var(--danger-glow)',
                color: userAnswers[currentIndex]?.isCorrect ? 'var(--success)' : 'var(--danger)',
                padding: '0.5rem',
                borderRadius: '8px',
                flexShrink: 0
              }}>
                {userAnswers[currentIndex]?.isCorrect ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.35rem', color: '#fff' }}>
                  {userAnswers[currentIndex]?.isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {selectedQuestions[currentIndex].explanation}
                </p>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ==========================================
         🎮 STATE C: PERFORMANCE CERTIFICATE & STATISTICS
         ========================================== */}
      {gameState === 'finished' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Certificate Block */}
          <section className="glass-card" style={{ padding: '3.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            
            {/* Background elements */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '30%', height: '30%', background: 'var(--primary-glow)', borderRadius: '50%', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '30%', height: '30%', background: 'rgba(236,72,153,0.1)', borderRadius: '50%', filter: 'blur(80px)' }} />

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '2px solid rgba(255,255,255,0.08)',
              padding: '1.25rem',
              borderRadius: '50%',
              color: rank.color,
              boxShadow: `0 0 30px ${rank.color}22`
            }}>
              <Award size={48} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)' }}>CHEMISTRY ASSESSMENT PORTAL</span>
              <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: '800', background: 'linear-gradient(135deg, #fff 40%, var(--text-secondary) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Course Grade: <span style={{ color: rank.color, WebkitTextFillColor: 'initial' }}>{rank.title}</span>
              </h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', fontSize: '1rem', lineHeight: '1.7' }}>
              {rank.desc} You answered <strong>{score}</strong> out of <strong>{quizSize}</strong> questions correctly ({percentage}% success rate) in this assessment.
            </p>

            {/* Score Grid details */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '100%', maxWidth: '650px', marginTop: '1rem' }}>
              <div className="glass-card" style={{ flex: '1', minWidth: '130px', padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.25rem' }}>Score</span>
                <strong style={{ fontSize: '1.5rem', color: '#fff' }}>{score}/{quizSize}</strong>
              </div>
              <div className="glass-card" style={{ flex: '1', minWidth: '130px', padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.25rem' }}>Percentage</span>
                <strong style={{ fontSize: '1.5rem', color: rank.color }}>{percentage}%</strong>
              </div>
              <div className="glass-card" style={{ flex: '1', minWidth: '130px', padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.25rem' }}>Max Streak</span>
                <strong style={{ fontSize: '1.5rem', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                  <Zap size={16} fill="currentColor" /> {maxStreak}x
                </strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="action-btn action-btn-primary" onClick={() => startQuiz(quizSize)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <RotateCcw size={16} />
                <span>Retry Challenge</span>
              </button>
              
              <button className="action-btn action-btn-secondary" onClick={() => setGameState('menu')}>
                Back to Menu
              </button>
            </div>
          </section>

          {/* Detailed Question Review List */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', color: '#fff' }}>
              Comprehensive Question Review
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {userAnswers.map((ua, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    borderBottom: idx + 1 < userAnswers.length ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    paddingBottom: idx + 1 < userAnswers.length ? '1.5rem' : '0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: ua.isCorrect ? 'var(--success-glow)' : 'var(--danger-glow)',
                      color: ua.isCorrect ? 'var(--success)' : 'var(--danger)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      flexShrink: 0,
                      marginTop: '0.15rem'
                    }}>
                      {idx + 1}
                    </span>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#fff', lineHeight: '1.4' }}>
                        {ua.questionText}
                      </h4>
                      
                      {/* Selection Audit */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Your Choice: <strong style={{ color: ua.timeOut ? 'var(--danger)' : ua.isCorrect ? 'var(--success)' : 'var(--danger)' }}>
                            {ua.timeOut ? "Time Out" : ua.options[ua.selectedIndex]}
                          </strong>
                        </span>
                        
                        {!ua.isCorrect && (
                          <span style={{ color: 'var(--text-secondary)' }}>
                            Correct Answer: <strong style={{ color: 'var(--success)' }}>{ua.options[ua.correctIndex]}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.01)', borderLeft: `2px solid ${ua.isCorrect ? 'var(--success)' : 'var(--danger)'}`, padding: '0.75rem 1rem', borderRadius: '0 8px 8px 0', fontSize: '0.88rem', color: 'var(--text-secondary)', marginLeft: '1.8rem', lineHeight: '1.5' }}>
                    <strong>Scientific Analysis:</strong> {ua.explanation}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
