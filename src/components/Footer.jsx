import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p>
        Based on official IRCTC Refund & Cancellation Rules.
      </p>

      <a
        href="https://contents.irctc.co.in/en/RefundCancellationRules.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Official Rules PDF
      </a>
    </footer>
  );
}

export default Footer;