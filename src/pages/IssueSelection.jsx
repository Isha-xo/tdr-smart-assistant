import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISSUE_CATEGORIES } from "../data/decisionTrees";
import "./IssueSelection.css";

function IssueSelection() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("");

  return (
    <>
      <Header />
      <div className="issue-page">
        <h1>Select Your Issue</h1>
        <p>Choose the issue you faced during your journey.</p>

        <div className="issue-grid">
          {ISSUE_CATEGORIES.map((issue) => (
            <div
              key={issue.key}
              className={`issue-card ${selectedKey === issue.key ? "selected" : ""}`}
              onClick={() => setSelectedKey(issue.key)}
            >
              <span className="issue-icon">{issue.icon}</span>
              <span className="issue-label">{issue.label}</span>
              <span className="issue-sub">{issue.sub}</span>
            </div>
          ))}
        </div>

        <button
          className={`continue-btn ${!selectedKey ? "disabled" : ""}`}
          onClick={() => {
            if (selectedKey) navigate("/questionnaire", { state: { issueKey: selectedKey } });
          }}
          disabled={!selectedKey}
        >
          Continue
        </button>
      </div>
      <Footer />
    </>
  );
}

export default IssueSelection;