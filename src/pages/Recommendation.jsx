import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Recommendation.css";

export default function Recommendation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const { result, issueKey, issueLabel } = location.state || {};

  useEffect(() => {
    if (!result) {
      navigate("/issues");
    }
  }, [result, navigate]);

  if (!result) return null;

  const { eligible, reason, deadline, recommendation } = result;

  const handleGoogleLogin = () => {


    localStorage.setItem(
      "recommendationState",
      JSON.stringify({
        result,
        issueKey,
        issueLabel,
      })
    );

    window.location.href =
      `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <><Header />
      <div className="rec-page">
        <button
          className="back-link"
          onClick={() =>
            navigate("/questionnaire", {
              state: { issueKey },
            })
          }
        >
          ← Back to questions
        </button>

        <div
          className={`rec-card ${eligible ? "eligible" : "not-eligible"
            }`}
        >
          <div className="rec-status">
            <span className="rec-icon">
              {eligible ? "✅" : "❌"}
            </span>

            <h2 className="rec-title">
              {eligible
                ? "You are eligible to file a TDR"
                : "Not eligible for TDR"}
            </h2>

            <p className="rec-category">{issueLabel}</p>
          </div>

          {eligible && (
            <div className="rec-details">
              <div className="rec-row">
                <span className="rec-field-label">
                  TDR Reason
                </span>

                <span className="rec-field-value">
                  {reason}
                </span>
              </div>

              <div className="rec-divider" />

              <div className="rec-row deadline-row">
                <span className="rec-field-label">
                  Filing Deadline
                </span>

                <span className="rec-field-value deadline">
                  {deadline}
                </span>
              </div>
            </div>
          )}

          <div className="rec-recommendation">
            <span className="rec-rec-label">
              What to do next
            </span>

            <p className="rec-rec-text">
              {recommendation}
            </p>
          </div>
        </div>

        {showLoginPopup && (
          <div className="popup-overlay">
            <div className="login-popup">
              <h3>Before you continue</h3>

              <p>
                In the next step, you will be redirected to Google Sign-In.
              </p>

              <p>
                Please use the same email address that is registered with your
                IRCTC account.
              </p>

              <div className="popup-buttons">
                <button
                  className="popup-btn secondary"
                  onClick={() => setShowLoginPopup(false)}
                >
                  Cancel
                </button>

                <button
                  className="popup-btn primary"
                  onClick={handleGoogleLogin}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="rec-actions">
          {eligible && (
            <button
              className="action-btn primary"
              onClick={() => setShowLoginPopup(true)}
            >
              Proceed to File TDR →
            </button>
          )}

          <button
            className="action-btn secondary"
            onClick={() => navigate("/issues")}
          >
            Go back to Issue Selection
          </button>
        </div>
      </div>
      <Footer /></>
  );
}