import { useState } from "react";
import { createWish } from "./api";

const MAX_MESSAGE_LENGTH = 200;
const MAX_NAME_LENGTH = 10;
export const BURST_DURATION_MS = 2400;

function PaperPlaneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 3 L3 10.5 L10.5 13.5 L13.5 21 Z" />
      <path d="M21 3 L10.5 13.5" />
    </svg>
  );
}

export default function WishForm({ onCreated, onBurst }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function validate() {
    if (name.length > MAX_NAME_LENGTH) {
      return `姓名太長了（最多 ${MAX_NAME_LENGTH} 字）`;
    }
    if (!message.trim()) {
      return "願望內容不能是空的";
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return `願望內容太長了（最多 ${MAX_MESSAGE_LENGTH} 字）`;
    }
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const wish = await createWish({ name, message });
      onCreated(wish);
      onBurst?.();
      setTimeout(() => {
        setName("");
        setMessage("");
        setSubmitting(false);
      }, BURST_DURATION_MS);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <form className="wish-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="make a wish"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={submitting}
        className="wish-input wish-input-message"
      />
      <div className="wish-form-row">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
          maxLength={MAX_NAME_LENGTH}
          className="wish-input wish-input-name"
        />
        <button
          type="submit"
          disabled={submitting}
          className="wish-submit"
          aria-label="送出願望"
        >
          <PaperPlaneIcon />
        </button>
      </div>
      {error && <p className="wish-form-error">{error}</p>}
    </form>
  );
}
