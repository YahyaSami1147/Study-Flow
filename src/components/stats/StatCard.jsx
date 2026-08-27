import './statcard.css'

function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card" role="group" aria-label={title}>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {subtitle && <div className="stat-sub">{subtitle}</div>}
    </div>
  )
}

export default StatCard
