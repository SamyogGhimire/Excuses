import { useMemo, useState } from "react";
import axios from "axios";

const categories = [
  { value: "relationships", label: "Relationships" },
  { value: "dates", label: "Dates" },
  { value: "weddings", label: "Weddings" },
  { value: "group trips", label: "Group Trips" },
  { value: "family events", label: "Family Events" },
];

function getScoreColor(score) {
  const s = Number(score);
  if (s >= 80) return "#22c55e";
  if (s >= 50) return "#eab308";
  return "#ef4444";
}

export default function ExcuseForm() {
  const [context, setContext] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("relationships");
  const [error, setError] = useState("");

  const scoreColor = useMemo(() => {
    if (!result) return "#fff";
    return getScoreColor(result.believabilityScore);
  }, [result]);

  const generateExcuse = async () => {
    if (!context.trim()) {
      setError("Please enter a situation.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/generate`,
        { context, category }
      );
      
      setResult(response.data);
    } catch (e) {
      setError(
        e?.response?.data?.message || e.message || "Failed to generate excuse"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyExcuse = async () => {
    try {
      await navigator.clipboard.writeText(result?.excuse || "");
      alert("Excuse copied to clipboard!");
    } catch (e) {
      console.error("Failed to copy excuse:", e);
      alert("Copy failed. Your browser may block clipboard access.");
    }
  };

  return (
    <div className="form-container">
      <div className="top-row">
        <label className="label">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select"
            disabled={loading}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="label">
        What’s going on?
        <textarea
          className="textarea"
          placeholder="Example: I’m overwhelmed and need to get out of a meeting I can’t attend…"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          disabled={loading}
        />
      </label>

      {error && <div className="error-text">{error}</div>}

      <div className="actions">
        <button
          className="primary-btn"
          onClick={generateExcuse}
          disabled={loading || !context.trim()}
          type="button"
          title={!context.trim() ? "Type a situation first" : ""}
        >
          {loading ? "Generating..." : "Generate Excuse"}
        </button>

        <div className="help-text" aria-live="polite">
          Tip: press <span className="kbd">Generate</span> when you’re ready.
        </div>

        <button
          className="ghost-btn"
          onClick={() => {
            setContext("");
            setResult(null);
            setError("");
          }}
          disabled={loading && !context}
          type="button"
        >
          Reset
        </button>
      </div>

      {result && (
        <div className="result-card fade-in">
          <div className="result-header">
            <div>
              <h2>Your Exit Strategy</h2>
              <p className="muted">Generated in seconds • tuned for believability</p>
            </div>

            <button className="copy-btn" onClick={copyExcuse} type="button">
              Copy
            </button>
          </div>

          <div className="grid">
            <div className="panel">
              <h3>Excuse</h3>
              <p className="text">{result.excuse}</p>
            </div>

            <div className="panel">
              <h3>Short Version</h3>
              <p className="text">{result.shortVersion}</p>
            </div>
          </div>

          <div className="meta">
            <div className="pill">
              <span className="pill-label">Believability</span>
              <span className="pill-value" style={{ color: scoreColor }}>
                {result.believabilityScore}
              </span>
            </div>

            <div className="pill">
              <span className="pill-label">Risk Level</span>
              <span className="pill-value">{result.riskLevel}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

