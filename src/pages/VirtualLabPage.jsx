import { useNavigate } from 'react-router-dom'
import ReactionLab from '../components/ReactionLab'

export default function VirtualLabPage() {
  const navigate = useNavigate()

  return (
    <div className="page-view explore-page">
      <section className="page-hero glass-card">
        <div className="hero-copy">
          <span className="hero-eyebrow">Virtual Chemistry Lab</span>
          <h1>Combine two elements in the test tube bench and observe the reaction.</h1>
          <p className="hero-description">
            Select the left and right test tubes, then run the reaction to see the final product, energy profile, and visual result below the beaker.
          </p>
          <div className="hero-actions">
            <button className="action-btn action-btn-primary" onClick={() => document.getElementById('lab-bench-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Open Reaction Bench
            </button>
            <button className="action-btn action-btn-secondary" onClick={() => navigate('/explore')}>
              Back to Explorer
            </button>
          </div>
        </div>
        <div className="hero-panel-small">
          <div className="hero-panel-item">
            <strong>2</strong>
            <span>Test Tubes</span>
          </div>
          <div className="hero-panel-item">
            <strong>118</strong>
            <span>Element Library</span>
          </div>
          <div className="hero-panel-item">
            <strong>Real-time</strong>
            <span>Reaction Preview</span>
          </div>
        </div>
      </section>

      <section id="lab-bench-section">
        <ReactionLab />
      </section>
    </div>
  )
}


