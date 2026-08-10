function Wish({ wish }) {
  return (
    <li className="wish">
      <span className="wish-message">{wish.message}</span>
      <span className="wish-name">— {wish.name}</span>
    </li>
  );
}

export default function WishBoard({ wishes, loading, error }) {
  return (
    <div className="wish-board">
      <div className="sky">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={`star star-${i}`} aria-hidden="true">
            ✦
          </span>
        ))}
      </div>
      <div className="skyline" aria-hidden="true" />

      <ul className="wish-list">
        {loading && <li className="wish-status">載入中...</li>}
        {!loading && error && <li className="wish-status wish-error">{error}</li>}
        {!loading && !error && wishes.length === 0 && (
          <li className="wish-status">還沒有人許願，第一個許願的人是你！</li>
        )}
        {!loading &&
          !error &&
          wishes.map((wish) => <Wish key={wish.id} wish={wish} />)}
      </ul>
    </div>
  );
}
