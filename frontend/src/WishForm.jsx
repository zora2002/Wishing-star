import { useState } from "react";
import { createWish } from "./api";

const MAX_MESSAGE_LENGTH = 200;
const MAX_NAME_LENGTH = 10;

export default function WishForm({ onCreated }) {
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
      setName("");
      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="wish-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={submitting}
        maxLength={MAX_NAME_LENGTH}
        className="wish-input wish-input-name"
      />
      <input
        type="text"
        placeholder="wish"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={submitting}
        className="wish-input wish-input-message"
      />
      <button type="submit" disabled={submitting} className="wish-submit">
        enter
      </button>
      {error && <p className="wish-form-error">{error}</p>}
    </form>
  );
}
