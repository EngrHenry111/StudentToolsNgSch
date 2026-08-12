import "../pageQuiz/proquiz.css";

const Loader = ({ label = "Loading...", fullPage = false }) => (
  <div className={`pq-loader ${fullPage ? "fullpage" : ""}`}>
    <div className="pq-spinner" />
    <span>{label}</span>
  </div>
);

export default Loader;
