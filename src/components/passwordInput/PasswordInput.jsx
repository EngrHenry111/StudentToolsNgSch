import { useEffect, useRef, useState } from "react";
import "./passwordInput.css";

// Drop-in replacement for <input type="password"> with a Show/Hide eye
// button. Every other prop (value, onChange, placeholder, autoComplete,
// className…) passes straight through, so each page's own input styling
// still applies. The auth pages give inputs a bottom margin that differs
// per page, so the button's height is synced to the input's rendered
// height rather than guessed in CSS.
const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    const toggle = toggleRef.current;
    if (!input || !toggle) return;

    const sync = () => {
      toggle.style.height = `${input.offsetHeight}px`;
    };
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(input);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="password-field">
      <input {...props} ref={inputRef} type={visible ? "text" : "password"} />
      <button
        ref={toggleRef}
        type="button"
        className="password-toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        title={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A10.4 10.4 0 0112 5c5 0 9 4.5 10 7a13.2 13.2 0 01-3.2 4.3M6.6 6.6C4.3 8 2.7 10.2 2 12c1 2.5 5 7 10 7 1.8 0 3.4-.5 4.8-1.3" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M2 12c1-2.5 5-7 10-7s9 4.5 10 7c-1 2.5-5 7-10 7S3 14.5 2 12z" />
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
