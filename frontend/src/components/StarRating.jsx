// components/StarRating.jsx
export default function StarRating({ estrelas, large = false }) {
  return (
    <div className="stars">
      {[1, 2, 3].map((n) => (
        <span key={n} className={`star${large ? ' lg' : ''}${n <= estrelas ? '' : ' empty'}`}>
          ⭐
        </span>
      ))}
    </div>
  );
}
