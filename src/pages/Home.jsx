import React from "react";
import { useNavigate } from "react-router-dom";
import trainImg from '../assets/vande-bharat.jpg';
import "./Home.css";


const issues = [
  {
    key: "delayed",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.7 11.5L20.7005 13.5L18.7 11.5M20.9451 13C20.9814 12.6717 21 12.338 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.8273 21 17.35 19.6963 19 17.6573M12 7V12L15 14"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    ), label: "Train Delayed"
  },
  {
    key: "ac",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 12H12M9 4V20M3 9L6 12L3 15M12 6L9 9L6 6M6 18L9 15L10.5 16.5M20 14.5351V4C20 2.89543 19.1046 2 18 2C16.8954 2 16 2.89543 16 4V14.5351C14.8044 15.2267 14 16.5194 14 18C14 20.2091 15.7909 22 18 22C20.2091 22 22 20.2091 22 18C22 16.5194 21.1956 15.2267 20 14.5351Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    ), label: "AC Failure"
  },
  {
    key: "diverted",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 15L21 18M21 18L18 21M21 18H18.5689C17.6297 18 17.1601 18 16.7338 17.8705C16.3564 17.7559 16.0054 17.5681 15.7007 17.3176C15.3565 17.0348 15.096 16.644 14.575 15.8626L14.3333 15.5M18 3L21 6M21 6L18 9M21 6H18.5689C17.6297 6 17.1601 6 16.7338 6.12945C16.3564 6.24406 16.0054 6.43194 15.7007 6.68236C15.3565 6.96523 15.096 7.35597 14.575 8.13744L9.42496 15.8626C8.90398 16.644 8.64349 17.0348 8.29933 17.3176C7.99464 17.5681 7.64357 17.7559 7.2662 17.8705C6.83994 18 6.37033 18 5.43112 18H3M3 6H5.43112C6.37033 6 6.83994 6 7.2662 6.12945C7.64357 6.24406 7.99464 6.43194 8.29933 6.68236C8.64349 6.96523 8.90398 7.35597 9.42496 8.13744L9.66667 8.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    ), label: "Train Diverted/Terminated"
  },
  {
    key: "not_travelled",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 12L12 16M12 16L16 12M12 16V8M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    ), label: "Passenger Not Travelled"
  },
  {
    key: "fare_diff",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 7.99983V4.50048C16 3.66874 16 3.25287 15.8248 2.9973C15.6717 2.77401 15.4346 2.62232 15.1678 2.57691C14.8623 2.52493 14.4847 2.6992 13.7295 3.04775L4.85901 7.14182C4.18551 7.45267 3.84875 7.6081 3.60211 7.84915C3.38406 8.06225 3.21762 8.32238 3.1155 8.60966C3 8.93462 3 9.30551 3 10.0473V14.9998M16.5 14.4998H16.51M3 11.1998L3 17.7998C3 18.9199 3 19.48 3.21799 19.9078C3.40973 20.2841 3.71569 20.5901 4.09202 20.7818C4.51984 20.9998 5.07989 20.9998 6.2 20.9998H17.8C18.9201 20.9998 19.4802 20.9998 19.908 20.7818C20.2843 20.5901 20.5903 20.2841 20.782 19.9078C21 19.48 21 18.9199 21 17.7998V11.1998C21 10.0797 21 9.51967 20.782 9.09185C20.5903 8.71552 20.2843 8.40956 19.908 8.21782C19.4802 7.99983 18.9201 7.99983 17.8 7.99983L6.2 7.99983C5.0799 7.99983 4.51984 7.99983 4.09202 8.21781C3.7157 8.40956 3.40973 8.71552 3.21799 9.09185C3 9.51967 3 10.0797 3 11.1998ZM17 14.4998C17 14.776 16.7761 14.9998 16.5 14.9998C16.2239 14.9998 16 14.776 16 14.4998C16 14.2237 16.2239 13.9998 16.5 13.9998C16.7761 13.9998 17 14.2237 17 14.4998Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    ), label: "Difference of Fare/Lower Class"
  },
  {
    key: "coach_damage",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.5 22H14.5M8 2H16M12 5V2M4 12H20M17 19L18.5 22M7 19L5.5 22M8.5 15.5H8.51M15.5 15.5H15.51M8.8 19H15.2C16.8802 19 17.7202 19 18.362 18.673C18.9265 18.3854 19.3854 17.9265 19.673 17.362C20 16.7202 20 15.8802 20 14.2V9.8C20 8.11984 20 7.27976 19.673 6.63803C19.3854 6.07354 18.9265 5.6146 18.362 5.32698C17.7202 5 16.8802 5 15.2 5H8.8C7.11984 5 6.27976 5 5.63803 5.32698C5.07354 5.6146 4.6146 6.07354 4.32698 6.63803C4 7.27976 4 8.11984 4 9.8V14.2C4 15.8802 4 16.7202 4.32698 17.362C4.6146 17.9265 5.07354 18.3854 5.63803 18.673C6.27976 19 7.11984 19 8.8 19ZM9 15.5C9 15.7761 8.77614 16 8.5 16C8.22386 16 8 15.7761 8 15.5C8 15.2239 8.22386 15 8.5 15C8.77614 15 9 15.2239 9 15.5ZM16 15.5C16 15.7761 15.7761 16 15.5 16C15.2239 16 15 15.7761 15 15.5C15 15.2239 15.2239 15 15.5 15C15.7761 15 16 15.2239 16 15.5Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    ), label: "Coach Damage"
  },
  {
    key: "missed_connection",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.5 5H11.9344C14.9816 5 16.5053 5 17.0836 5.54729C17.5836 6.02037 17.8051 6.71728 17.6702 7.39221C17.514 8.17302 16.2701 9.05285 13.7823 10.8125L9.71772 13.6875C7.2299 15.4471 5.98599 16.327 5.82984 17.1078C5.69486 17.7827 5.91642 18.4796 6.41636 18.9527C6.99474 19.5 8.51836 19.5 11.5656 19.5H12.5M8 5C8 6.65685 6.65685 8 5 8C3.34315 8 2 6.65685 2 5C2 3.34315 3.34315 2 5 2C6.65685 2 8 3.34315 8 5ZM22 19C22 20.6569 20.6569 22 19 22C17.3431 22 16 20.6569 16 19C16 17.3431 17.3431 16 19 16C20.6569 16 22 17.3431 22 19Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    ), label: "Missed Connection"
  },
  {
    key: "rac_not_travelled",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 8V7M8 12.5V11.5M8 17V16M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    ), label: "RAC Not Travelled"
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ── Header ── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">TDR Smart Assistant</span>
          </div>
          <nav className="header-nav">
            <a href="#how-it-works">How It Works</a>
            <a href="#issues">Issues</a>
            <a
              href="https://contents.irctc.co.in/en/RefundCancellationRules.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              IRCTC Rules
            </a>
          </nav>

          {/*
          <button className="header-cta" onClick={() => navigate("/issues")}>
            File TDR
          </button>
          */}
        </div>
      </header>

      {/* ── Browser Notice ── */}
      <div className="browser-notice">
        <span className="browser-notice-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        </span>
        For the best experience, we recommend using{" "}
        <strong>Google Chrome</strong>.
      </div>

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-card">
          <div className="hero-left">
            <span className="tag">Railway Refund Assistant</span>
            <h1>
              File Railway <br />
              TDRs Easily
            </h1>
            <p className="hero-text">
              Get step-by-step guidance to file your TDR claim
              and generate the right email — in minutes.
            </p>
            <div className="hero-actions">
              <button className="start-btn" onClick={() => navigate("/issues")}>
                Get Started →
              </button>
              <a
                href="#how-it-works"
                className="secondary-link"
              >
                See how it works
              </a>
            </div>
          </div>
          <div className="hero-right">
            <img src={trainImg} alt="Vande Bharat Express" />
          </div>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section className="trust-section">
        <div className="trust-card">
          <div className="trust-badge">✅</div>
          <div className="trust-content">
            <h2>Based on Official IRCTC Rules</h2>
            <p>
              Every refund recommendation and step-by-step guide is derived
              directly from the official IRCTC Refund &amp; Cancellation Rules document —
              so you always get accurate, policy-backed advice.
            </p>
            <div className="trust-points">
              <span>📄 Policy-accurate guidance</span>
              <span>⚡ Instant email generation</span>
            </div>
          </div>
          <a
            href="https://contents.irctc.co.in/en/RefundCancellationRules.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rules-btn"
          >
            View Official Rules PDF ↗
          </a>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section" id="how-it-works">
        <div className="section-label">Simple Process</div>
        <h2>How It Works</h2>
        <div className="steps">
          {[
            { n: "1", title: "Select Issue", desc: "Choose the problem you faced on your journey", icon: "🔍" },
            { n: "2", title: "Answer Questions", desc: "We ask only what's needed for your specific case", icon: "📝" },
            { n: "3", title: "Get Recommendation", desc: "Receive the right TDR type based on IRCTC rules", icon: "💡" },
            { n: "4", title: "Generate Email", desc: "Copy a ready-to-send email to IRCTC support", icon: "📧" },
          ].map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-num">{s.n}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Supported Issues ── */}
      <section className="section issues-section" id="issues">
        <div className="section-label">Coverage</div>
        <h2>Supported Issues</h2>
        <p className="section-sub">
          We guide you through TDR filing for all major railway complaint categories.
        </p>
        <div className="issues">
          {issues.map((issue, i) => (
            <div
              key={i}
              className="issue-card"
              onClick={() =>
                navigate("/questionnaire", {
                  state: {
                    issueKey: issue.key,
                  },
                })
              }
            >
              <span className="issue-icon">{issue.icon}</span>
              <span className="issue-label">{issue.label}</span>
              <span className="issue-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-icon"></span>
            <span className="logo-text">TDR Smart Assistant</span>
            <p>Helping passengers get rightful refunds since 2026.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Quick Links</h4>
              <a href="#how-it-works">How It Works</a>
              <a href="#issues">Supported Issues</a>
              <button onClick={() => navigate("/issues")}>File a TDR</button>
            </div>
            <div className="footer-col">
              <h4>Official Sources</h4>
              <a
                href="https://contents.irctc.co.in/en/RefundCancellationRules.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                IRCTC Refund Rules
              </a>
              <a
                href="https://www.irctc.co.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                IRCTC Website
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            This tool is for informational guidance only. Always verify details
            with official IRCTC sources. Not affiliated with Indian Railways or IRCTC.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default Home;