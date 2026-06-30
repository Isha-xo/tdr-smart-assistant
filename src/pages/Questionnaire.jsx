import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DECISION_TREES, ISSUE_CATEGORIES } from "../data/decisionTrees";
import "./Questionnaire.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Recursively count the maximum depth of questions from a node
function countMaxDepth(node) {
  if (!node || !node.question) return 0;
  return 1 + Math.max(countMaxDepth(node.yes), countMaxDepth(node.no));
}

export default function Questionnaire() {
  const location = useLocation();
  const navigate = useNavigate();

  const issueKey = location.state?.issueKey;

  // If no issueKey provided, redirect back to issue selection
  useEffect(() => {
    if (!issueKey || !DECISION_TREES[issueKey]) {
      navigate("/issues");
    }
  }, [issueKey, navigate]);

  if (!issueKey || !DECISION_TREES[issueKey]) return null;

  const rootNode = DECISION_TREES[issueKey];
  const maxDepth = countMaxDepth(rootNode);
  const issueLabel = ISSUE_CATEGORIES.find((c) => c.key === issueKey)?.label || issueKey;

  // path is an array of { node, answer } tracking the trail so far
  const [path, setPath] = useState([]);
  const [selected, setSelected] = useState(null); // "yes" | "no" | null

  // Current node = follow the path through the tree
  const currentNode = path.reduce((node, step) => node[step.answer], rootNode);
  const questionNumber = path.length + 1;
  const progress = Math.round((path.length / maxDepth) * 100);

  const handleAnswer = (answer) => {
    setSelected(answer);
  };

  const handleNext = () => {
    if (!selected) return;
    const nextNode = currentNode[selected];

    if (nextNode.question) {
      // Go deeper
      setPath((prev) => [...prev, { answer: selected }]);
      setSelected(null);
    } else {
      // Reached a leaf — navigate to recommendation
      navigate("/recommendation", {
        state: {
          result: nextNode,
          issueKey,
          issueLabel,
        },
      });
    }
  };

  const handleBack = () => {
    if (path.length === 0) {
      navigate("/issues");
    } else {
      setPath((prev) => prev.slice(0, -1));
      setSelected(null);
    }
  };

  return (
    <><Header />
    <div className="questionnaire-page">
      <div className="q-header">
        <button className="back-link" onClick={handleBack}>
          ← Back
        </button>
        <span className="q-category">{issueLabel}</span>
      </div>

      <div className="q-card">
        <p className="q-text">{currentNode.question}</p>

        <div className="yn-row">
          <button
            className={`yn-btn yes-btn ${selected === "yes" ? "active" : ""}`}
            onClick={() => handleAnswer("yes")}
          >
            ✓ Yes
          </button>
          <button
            className={`yn-btn no-btn ${selected === "no" ? "active" : ""}`}
            onClick={() => handleAnswer("no")}
          >
            ✕ No
          </button>
        </div>
      </div>

      <div className="q-footer">
        <button
          className={`next-btn ${!selected ? "disabled" : ""}`}
          onClick={handleNext}
          disabled={!selected}
        >
          Next →
        </button>
      </div>

      <div className="q-progress">
        <span className="q-progress-label">Question {questionNumber} of ~{maxDepth}</span>
        <div className="q-progress-bar">
          <div className="q-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
    <Footer/></>
  );
}