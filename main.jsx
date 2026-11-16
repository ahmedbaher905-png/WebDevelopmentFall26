import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";


function StarPicker({ rating, onChange }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            color: star <= rating ? "#f5b301" : "#d1d5db",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}


function StarEmojis({ rating }) {
  const emojis = "⭐".repeat(rating);
  return (
    <span style={{ fontSize: "18px" }}>
      {rating > 0 ? emojis : "No rating yet"}
    </span>
  );
}


function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  function handleAdd() {
    if (title.trim() === "") return;
    onAdd(title.trim(), rating, review.trim());
    setTitle("");
    setRating(0);
    setReview("");
  }

  return (
    <div style={styles.card}>
      <h3 style={{ marginTop: 0 }}>Add a movie</h3>
      <input
        style={styles.input}
        placeholder="Movie name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <StarPicker rating={rating} onChange={setRating} />
      <textarea
        style={{ ...styles.input, height: "60px" }}
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button style={styles.button} onClick={handleAdd}>
        Add movie
      </button>
    </div>
  );
}


  function MovieItem({ movie, onRemove, onRate }) {

  return (
    <div style={styles.card}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>{movie.title}</h3>
        <button style={styles.removeButton} onClick={() => onRemove(movie.id)}>
          Remove
        </button>
      </div>

      <StarEmojis rating={movie.rating} />
      <StarPicker rating={movie.rating} onChange={(r) => onRate(movie.id, r)} />

      {movie.review !== "" ? (
        <p style={styles.review}>"{movie.review}"</p>
      ) : (
        <p style={{ color: "#9ca3af" }}>No review yet</p>
      )}

      
    </div>
  );
}


function App() {
  const [movies, setMovies] = useState([]);
  const [nextId, setNextId] = useState(1);

  function handleAdd(title, rating, review) {
    setMovies([...movies, { id: nextId, title, rating, review }]);
    setNextId(nextId + 1);
  }

  function handleRemove(id) {
    setMovies(movies.filter((m) => m.id !== id));
  }

  function handleRate(id, rating) {
    setMovies(movies.map((m) => (m.id === id ? { ...m, rating } : m)));
  }

 

  return (
    <div style={styles.page}>
      <h1>My Watch List</h1>
      <AddMovieForm onAdd={handleAdd} />

      <h2>Watched movies ({movies.length})</h2>
      {movies.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No movies yet. Add one above!</p>
      ) : (
        movies.map((movie) => (
          <MovieItem
            key={movie.id}
            movie={movie}
            onRemove={handleRemove}
            onRate={handleRate}
          />
        ))
      )}
    </div>
  );
}


const styles = {
  page: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "16px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "12px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "8px",
    margin: "6px 0",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
  },
  removeButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "4px 10px",
    cursor: "pointer",
  },
  review: {
    fontStyle: "italic",
    color: "#374151",
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
