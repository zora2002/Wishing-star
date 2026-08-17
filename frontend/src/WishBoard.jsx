import { useState } from "react";
import useStarQueue from "./useStarQueue";

const SKYLINE_PATH =
  "M0,130 L0,15 L18,15 L18,40 L24,40 L24,33 L30,33 L30,58 L36,58 L36,74 L36,25 L36,70 L58,70 L58,92 L78,92 L78,55 L96,55 L96,35 L118,35 L118,75 L138,68 L138,90 L160,90 L160,45 L182,45 L182,80 L202,80 L202,60 L228,50 L248,50 L248,72 L268,72 L268,30 L286,30 L286,68 L306,68 L306,45 L326,45 L326,85 L344,85 L344,55 L365,55 L365,20 L385,20 L385,60 L400,60 L400,130 Z";

const SKYLINE_TEXTURE_DOTS = [
  { x: 25, y: 45 },
  { x: 87, y: 65 },
  { x: 150, y: 60 },
  { x: 238, y: 60 },
  { x: 296, y: 45 },
  { x: 335, y: 70 },
  { x: 393, y: 35 },
];

const SKYLINE_WINDOW_LIGHTS = [
  { top: 32, left: 10, opacity: 0.8 },
  { top: 20, left: 24, opacity: 0.6 },
  { top: 45, left: 38, opacity: 0.7 },
  { top: 15, left: 55, opacity: 0.8 },
  { top: 35, left: 70, opacity: 0.6 },
  { top: 12, left: 86, opacity: 0.7 },
];

const STAR_PATH =
  "M12 2 L15.53 7.146 L21.51 8.91 L17.71 13.85 L17.88 20.09 L12 18 L6.12 20.09 L6.29 13.85 L2.49 8.91 L8.47 7.146 Z";

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function makeTwinkleStars() {
  return Array.from({ length: 18 }).map(() => ({
    x: 6 + Math.random() * 88,
    y: 6 + Math.random() * 45,
    size: 1 + Math.random() * 2,
    durationS: 2 + Math.random() * 3,
    delayS: Math.random() * 3,
  }));
}

function Star({ flight, onFlightEnd }) {
  const { wish, color, topPercent, durationS, delayS, rotationDeg } = flight;
  const style = {
    "--top": `${topPercent}%`,
    "--duration": `${durationS}s`,
    "--delay": `${delayS}s`,
  };

  return (
    <div className="star" style={style} onAnimationEnd={onFlightEnd}>
      <svg
        className="star-glyph"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ transform: `rotate(${rotationDeg}deg)` }}
        aria-hidden="true"
      >
        <path d={STAR_PATH} />
      </svg>
      <span className="star-tooltip">
        {wish.message} — {wish.name}
      </span>
    </div>
  );
}

function Moon() {
  return (
    <svg className="moon" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="#f6dd8e" opacity="0.95" />
      <circle cx="66" cy="38" r="34" fill="#0a2233" opacity="0.55" />
    </svg>
  );
}

function TwinkleStars({ stars }) {
  return stars.map((s, i) => (
    <span
      key={i}
      className="twinkle-star"
      aria-hidden="true"
      style={{
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: `${s.size}px`,
        height: `${s.size}px`,
        animationDuration: `${s.durationS}s`,
        animationDelay: `${s.delayS}s`,
      }}
    />
  ));
}

function Skyline() {
  return (
    <div className="skyline" aria-hidden="true">
      <svg
        className="skyline-silhouette"
        viewBox="0 0 400 130"
        preserveAspectRatio="none"
      >
        <path
          d={SKYLINE_PATH}
          fill="#081722"
          stroke="#081722"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {SKYLINE_TEXTURE_DOTS.map((d, i) => (
          <rect key={i} x={d.x} y={d.y} width="2" height="2" fill="#d8dde2" opacity="0.6" />
        ))}
      </svg>
      {SKYLINE_WINDOW_LIGHTS.map((w, i) => (
        <span
          key={i}
          className="skyline-window"
          style={{ top: `${w.top}%`, left: `${w.left}%`, opacity: w.opacity }}
        />
      ))}
    </div>
  );
}

function BurstStar() {
  return (
    <svg className="wish-burst" width="70" height="70" viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="wish-burst-path"
        d={STAR_PATH}
        pathLength="1"
        fill="var(--accent)"
        fillOpacity="0"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WishBoard({ wishes, loading, error, bursting }) {
  const { slots, handleFlightEnd } = useStarQueue(wishes);
  const [twinkleStars] = useState(makeTwinkleStars);

  return (
    <div className="wish-board">
      <Moon />
      <TwinkleStars stars={twinkleStars} />

      {slots.map((flight, index) =>
        flight ? (
          <Star
            key={flight.flightId}
            flight={flight}
            onFlightEnd={() => handleFlightEnd(index)}
          />
        ) : null
      )}

      {loading && <p className="wish-status">載入中...</p>}
      {!loading && error && <p className="wish-status wish-error">{error}</p>}

      {bursting && <BurstStar />}

      <Skyline />
    </div>
  );
}
