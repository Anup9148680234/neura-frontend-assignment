type Props = {
  rate?: number;   // 0..5
  count?: number;  // number of reviews
  size?: number;   // px
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function RatingStars({ rate = 0, count = 0, size = 16 }: Props) {
  const r = clamp(rate, 0, 5);
  const filled = Math.round(r); 

  return (
    <div
      className="rating"
      aria-label={`${r.toFixed(1)} out of 5 stars from ${count} reviews`}
      title={`${r.toFixed(1)} / 5 (${count} reviews)`}
    >
      <span className="stars" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const on = i < filled;
          return (
            <span
              key={i}
              style={{
                fontSize: size,
                lineHeight: 1,
                color: on ? "#f59e0b" : "#cbd5e1",
              }}
            >
              ★
            </span>
          );
        })}
      </span>

      <span className="ratingText">
        {r.toFixed(1)} <span className="muted">({count})</span>
      </span>
    </div>
  );
}
