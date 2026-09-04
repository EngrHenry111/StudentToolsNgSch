import { useState, useEffect, useRef } from "react";
import { askCourseTutor, listConversations, getConversation, deleteConversation } from "../../apiQuiz/courseTutorApi";
import Loader from "../../componentsQuiz/Loader";
import "../proquiz.css";
import "./courseTutor.css";

const CourseTutor = () => {
  const [conversations, setConversations] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const bottomRef = useRef(null);

  const loadConversations = async () => {
    try {
      const list = await listConversations();
      setConversations(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openConversation = async (id) => {
    setError(null);
    try {
      const convo = await getConversation(id);
      setActiveId(convo._id);
      setCourseName(convo.courseName);
      setTopic(convo.topic || "");
      setMessages(convo.messages);
    } catch (err) {
      setError(err.message);
    }
  };

  const startNew = () => {
    setActiveId(null);
    setCourseName("");
    setTopic("");
    setMessages([]);
    setError(null);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setError(null);

    if (!question.trim()) return;
    if (!activeId && !courseName.trim()) {
      setError("Please tell us which course this is about.");
      return;
    }

    const userMessage = { role: "user", content: question.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setSending(true);

    try {
      const res = await askCourseTutor({
        conversationId: activeId,
        courseName,
        topic,
        question: userMessage.content
      });

      setActiveId(res.conversationId);
      setMessages((prev) => [...prev, { role: "assistant", content: res.answer }]);
      loadConversations();
    } catch (err) {
      setError(err.message);
      // roll back the optimistic user message on failure
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this conversation?")) return;

    try {
      await deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeId === id) startNew();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="pq-page">
      <div className="ct-layout">

        {/* SIDEBAR */}
        <div className="ct-sidebar">
          <button className="pq-btn pq-btn-primary pq-btn-block" onClick={startNew}>
            + New Conversation
          </button>

          <div className="ct-convo-list">
            {loadingList ? (
              <Loader label="Loading..." />
            ) : conversations.length === 0 ? (
              <p className="ct-empty">No conversations yet</p>
            ) : (
              conversations.map((c) => (
                <div
                  key={c.id}
                  className={`ct-convo-item ${activeId === c.id ? "active" : ""}`}
                  onClick={() => openConversation(c.id)}
                >
                  <div className="ct-convo-course">{c.courseName}</div>
                  {c.topic && <div className="ct-convo-topic">{c.topic}</div>}
                  <div className="ct-convo-preview">{c.lastMessage}</div>
                  <button className="ct-convo-delete" onClick={(e) => handleDelete(c.id, e)}>✕</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* MAIN CHAT */}
        <div className="ct-main">
          <div className="pq-card">
            <h2 className="pq-title" style={{ fontSize: 22 }}>AI Course Tutor</h2>
            <p className="pq-subtitle">
              Ask questions about a specific course — the tutor stays focused on
              that context and remembers your conversation.
            </p>

            {!activeId && (
              <div className="pq-field-row">
                <div className="pq-field">
                  <label>Course</label>
                  <input
                    className="pq-input"
                    placeholder="e.g. Introduction to Data Structures"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
                <div className="pq-field">
                  <label>Topic (optional)</label>
                  <input
                    className="pq-input"
                    placeholder="e.g. Linked Lists"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              </div>
            )}

            {activeId && (
              <div className="pq-stats-row" style={{ marginBottom: 16 }}>
                <span className="pq-badge">{courseName}</span>
                {topic && <span className="pq-badge">{topic}</span>}
              </div>
            )}
          </div>

          {error && <div className="pq-error-box">{error}</div>}

          <div className="ct-messages">
            {messages.length === 0 && (
              <div className="pq-empty-state">
                Ask your first question to get started.
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`ct-message ${m.role}`}>
                <div className="ct-message-bubble">{m.content}</div>
              </div>
            ))}

            {sending && (
              <div className="ct-message assistant">
                <div className="ct-message-bubble ct-typing">Thinking...</div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form className="ct-input-row" onSubmit={handleSend}>
            <input
              className="pq-input"
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={sending}
            />
            <button type="submit" className="pq-btn pq-btn-primary" disabled={sending || !question.trim()}>
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default CourseTutor;
