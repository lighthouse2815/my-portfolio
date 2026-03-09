import { motion } from "framer-motion";
import { useState } from "react";
import type { FormEvent } from "react";
import type { PortfolioComment } from "../types";
import { SectionHeader } from "./SectionHeader";

interface CommentsSectionProps {
  comments: PortfolioComment[];
  onSubmit: (name: string, message: string) => Promise<void>;
}

export const CommentsSection = ({ comments, onSubmit }: CommentsSectionProps) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedMessage.length < 2) {
      setError("Please provide a valid name and message.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(trimmedName, trimmedMessage);
      setName("");
      setMessage("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to submit comment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      id="comments"
      className="section-container"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.6 }}
    >
      <SectionHeader
        eyebrow="FEEDBACK"
        title="Comment Terminal"
        description="Leave your thoughts. Comments are stored in the backend database and shown newest first."
      />

      <div className="comments-grid">
        <form className="panel comment-form" onSubmit={handleSubmit}>
          <label htmlFor="comment-name">Name</label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={40}
            placeholder="Your call sign"
          />

          <label htmlFor="comment-message">Message</label>
          <textarea
            id="comment-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={300}
            placeholder="Send a message..."
            rows={5}
          />

          {error ? <p className="comment-error">{error}</p> : null}

          <button type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Transmit Message"}
          </button>
        </form>

        <div className="panel comments-list">
          {comments.length === 0 ? (
            <p className="comment-empty">No comments yet. Be the first visitor.</p>
          ) : (
            comments.map((comment) => (
              <article key={comment.id} className="comment-item">
                <div className="comment-head">
                  <strong>{comment.name}</strong>
                  <span>{new Date(comment.timestamp).toLocaleString()}</span>
                </div>
                <p>{comment.message}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </motion.section>
  );
};
