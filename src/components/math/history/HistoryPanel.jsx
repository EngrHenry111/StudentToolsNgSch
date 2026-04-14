import { useEffect, useState } from "react";
import { getMathHistoryApi } from "../../../api/mathApi";

const HistoryPanel = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getMathHistoryApi();

        console.log("📦 History response:", data);

        // ✅ Always ensure array
        if (Array.isArray(data)) {
          setHistory(data);
        } else if (Array.isArray(data?.data)) {
          setHistory(data.data);
        } else {
          setHistory([]);
        }

      } catch (err) {
        console.error("❌ History fetch error:", err);
        setHistory([]); // prevent crash
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-panel">
      <h3>Recent Problems</h3>

      {loading && <p>Loading history...</p>}

      {!loading && history.length === 0 && (
        <p>No history yet</p>
      )}

      {!loading && Array.isArray(history) && history.map((item, i) => (
        <div key={i} className="history-item">
          <p>{item.problem}</p>
          <span>{item.answer}</span>
        </div>
      ))}
    </div>
  );
};

export default HistoryPanel;