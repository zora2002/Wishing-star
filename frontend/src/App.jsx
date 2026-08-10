import { useEffect, useState } from "react";
import { getWishes } from "./api";
import WishBoard from "./WishBoard";
import WishForm from "./WishForm";
import "./App.css";

function App() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWishes()
      .then(setWishes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleCreated(wish) {
    setWishes((prev) => [wish, ...prev]);
  }

  return (
    <div className="wall-card">
      <h1>許願牆</h1>
      <WishBoard wishes={wishes} loading={loading} error={error} />
      <WishForm onCreated={handleCreated} />
    </div>
  );
}

export default App;
