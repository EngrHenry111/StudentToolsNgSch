import "./formattedText.css";

// Publishers type listing content and descriptions into plain textareas,
// so it's rendered as TEXT — never via dangerouslySetInnerHTML, which both
// collapsed every line break into one run-on block and let a publisher
// inject <script> into buyers' pages. A blank line starts a new
// paragraph; single line breaks inside a paragraph are kept (pre-line).
const FormattedText = ({ text, className = "" }) => {
  const paragraphs = String(text || "")
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`formatted-text ${className}`.trim()}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
};

export default FormattedText;
