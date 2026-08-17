import { useEffect, useState } from "react";
import { randomStarColor } from "./starPalette";

const SLOT_COUNT = 7;
const MIN_TOP_PERCENT = 8;
const MAX_TOP_PERCENT = 62;
const MIN_DURATION_S = 18;
const MAX_DURATION_S = 30;
const MAX_DELAY_S = 8;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function makeFlight(wish) {
  return {
    flightId: crypto.randomUUID(),
    wish,
    color: randomStarColor(),
    topPercent: randomBetween(MIN_TOP_PERCENT, MAX_TOP_PERCENT),
    durationS: randomBetween(MIN_DURATION_S, MAX_DURATION_S),
    delayS: randomBetween(0, MAX_DELAY_S),
    rotationDeg: randomBetween(0, 360),
  };
}

function computeNextQueue(prevQueue, wishes) {
  const knownIds = new Set([
    ...prevQueue.slots.filter(Boolean).map((slot) => slot.wish.id),
    ...prevQueue.pending.map((wish) => wish.id),
  ]);
  const freshNew = wishes.filter((wish) => !knownIds.has(wish.id));
  if (freshNew.length === 0) return prevQueue;

  // 新願望優先排到 pending 最前面，這樣它們會先遞補進接下來空出來的位置
  let pending = [...freshNew, ...prevQueue.pending];
  const slots = [...prevQueue.slots];
  for (let i = 0; i < slots.length && pending.length > 0; i++) {
    if (slots[i] === null) {
      slots[i] = makeFlight(pending[0]);
      pending = pending.slice(1);
    }
  }
  return { slots, pending };
}

export default function useStarQueue(wishes) {
  const [queue, setQueue] = useState({
    slots: Array(SLOT_COUNT).fill(null),
    pending: [],
  });

  useEffect(() => {
    setQueue((prev) => computeNextQueue(prev, wishes));
  }, [wishes]);

  function handleFlightEnd(index) {
    setQueue((prev) => {
      const slots = [...prev.slots];
      slots[index] = null;

      // 排除目前還在其他位置飛行中的願望，避免同一則願望同時出現兩次
      const activeIds = new Set(slots.filter(Boolean).map((slot) => slot.wish.id));
      let pending = prev.pending.filter((wish) => !activeIds.has(wish.id));
      if (pending.length === 0) {
        // 佇列播完一輪，回頭從最新一則願望重新開始
        pending = wishes.filter((wish) => !activeIds.has(wish.id));
      }
      if (pending.length > 0) {
        slots[index] = makeFlight(pending[0]);
        pending = pending.slice(1);
      }
      return { slots, pending };
    });
  }

  return { slots: queue.slots, handleFlightEnd };
}
