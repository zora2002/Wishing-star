import { useEffect, useRef, useState } from "react";
import { getWishes } from "./api";
import WishBoard from "./WishBoard";
import WishForm, { BURST_DURATION_MS } from "./WishForm";
import "./App.css";

const POLL_INTERVAL_MS = 20000;

function App() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bursting, setBursting] = useState(false);
  const hasLoadedOnceRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let isFetching = false;
    let timeoutId;

    async function poll() {
      if (document.visibilityState !== "visible" || isFetching) return;

      isFetching = true;
      try {
        const data = await getWishes();
        if (cancelled) return;
        setWishes(data);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        if (!hasLoadedOnceRef.current) {
          setError(err.message);
        }
      } finally {
        isFetching = false;
        if (!cancelled) {
          hasLoadedOnceRef.current = true;
          setLoading(false);
          timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
        }
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        clearTimeout(timeoutId);
        poll();
      }
    }

    poll();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  function handleCreated(wish) {
    setWishes((prev) => [wish, ...prev]);
  }

  function handleBurst() {
    setBursting(true);
    setTimeout(() => setBursting(false), BURST_DURATION_MS);
  }

  return (
    <div className="wish-page">
      <div className="wish-card">
        <WishBoard
          wishes={wishes}
          loading={loading}
          error={error}
          bursting={bursting}
        />
      </div>
      <WishForm onCreated={handleCreated} onBurst={handleBurst} />
    </div>
  );
}

export default App;
