function RecentList({ title, items, renderItem, emptyMessage }) {
  return (
    <section className="recent-list">
      <h3>{title}</h3>
      {items && items.length > 0 ? (
        <ul>
          {items.map((it) => (
            <li key={it.id}>{renderItem(it)}</li>
          ))}
        </ul>
      ) : (
        <div className="empty">{emptyMessage}</div>
      )}
    </section>
  )
}

export default RecentList
