import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./EmailForm.css";

function EmailForm() {
  const location = useLocation();

  const {
    result,
    issueKey,
    issueLabel,
    userEmail,
    user,
  } = location.state || {};

  const [pnr, setPnr] = useState("");

  const [passengers, setPassengers] = useState([
    {
      name: user?.name || "",
    },
  ]);

  const [emailBody, setEmailBody] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCustomEmail, setIsCustomEmail] =
    useState(false);

  const [pnrError, setPnrError] = useState("");
  const [passengerError, setPassengerError] = useState("");

  const [pnrTouched, setPnrTouched] = useState(false);
  const [passengerTouched, setPassengerTouched] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [template, setTemplate] = useState(null);
  const [loadingTemplate, setLoadingTemplate] = useState(true);

  const [emailSubject, setEmailSubject] =
    useState("");

  const [emailTo, setEmailTo] =
    useState("");

  useEffect(() => {
    if (!user?.name) return;

    setPassengers((prev) => {
      const updated = [...prev];

      // Only fill Passenger 1 if it's empty
      if (!updated[0].name) {
        updated[0].name = user.name;
      }

      return updated;
    });
  }, [user]);

  useEffect(() => {
    const getTemplate = async () => {
      try {
        console.log(
          "Sending Issue ID:",
          result?.issueId
        );

        const response = await fetch(
          "https://galore-extortion-volley.ngrok-free.dev/api/templates/get-template",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              issueId: result.issueId,
            }),
          }
        );

        const data = await response.json();

        console.log(
          "Template Response:",
          data
        );

        setTemplate(data);

        setEmailSubject(data.subject || "");
        setEmailTo(data.to || "");
      } catch (error) {
        console.error(
          "Template Fetch Error:",
          error
        );
      } finally {
        setLoadingTemplate(false);
      }
    };

    if (result?.issueId) {
      getTemplate();
    }
  }, [result]);

  useEffect(() => {
    if (
      !template ||
      isEditing ||
      isCustomEmail
    )
      return;

    const passengerNames = passengers
      .map((p) => p.name)
      .filter((name) => name)
      .join(", ");

    let body = template.body;

    body = body.replace(
      /{{PNR}}/g,
      pnr || "________"
    );

    body = body.replace(
      /{{PASSENGERS}}/g,
      passengerNames || "________"
    );

    body = body.replace(
      /{{USER_NAME}}/g,
      passengers[0]?.name || "Passenger Name"
    );

    setEmailBody(body);
  }, [
    template,
    pnr,
    passengers,
    isEditing,
    isCustomEmail,
  ]);

  useEffect(() => {
    if (isEditing || template) return;

    const passengerNames = passengers
      .map((p) => p.name)
      .filter((name) => name)
      .join(", ");

    const body = `From: ${userEmail || "isha@gmail.com"
      }

To: care@irctc.co.in

Subject:
TDR Refund Request – Train Delayed

Dear Sir/Madam,

I would like to request a refund for my ticket due to train delay exceeding 3 hours.

PNR Number: ${pnr || "________"}

Passenger Name: ${passengerNames || "________"
      }

Regards,
${passengers[0]?.name || "Passenger Name"}
`;

    setEmailBody(body);
  }, [pnr, passengers, isEditing, userEmail]);

  const handlePassengerChange = (index, value) => {
    const updated = [...passengers];
    updated[index].name = value;
    setPassengers(updated);
    const allFilled = updated.every((p) => p.name.trim() !== "");
    if (!allFilled) {
      setPassengerError("All added passengers must have a name, or remove the empty row.");
    } else {
      setPassengerError("");
    }
  };

  const addPassenger = () => {
    if (passengers.length >= 6) return;

    const updated = [...passengers, { name: "" }];
    setPassengers(updated);

    // Adding a blank row always makes the form invalid — show error if already touched
    if (passengerTouched) {
      setPassengerError("All added passengers must have a name, or remove the empty row.");
    }
  };

  const removePassenger = (index) => {
    const updated = passengers.filter(
      (_, i) => i !== index
    );

    setPassengers(updated);

    if (passengerTouched) {
      const allFilled = updated.every((p) => p.name.trim() !== "");
      if (!allFilled) {
        setPassengerError("All added passengers must have a name, or remove the empty row.");
      } else {
        setPassengerError("");
      }
    }
  };

  const isFormValid =
    /^\d{10}$/.test(pnr) &&
    passengers.length > 0 &&
    passengers.every(
      (p) => p.name.trim() !== ""
    ) &&
    !!template &&
    !!emailBody.trim();

  const handleSend = async () => {

    // Mark all fields as touched so any remaining errors become visible
    setPnrTouched(true);
    setPassengerTouched(true);

    // Final guard — isFormValid already covers these, but just in case
    if (!template) {
      alert("Email template is still loading. Please wait.");
      return;
    }
    if (!emailBody.trim()) {
      alert("Email body cannot be empty.");
      return;
    }
    if (!isFormValid) return;

    try {

      const response = await fetch(

        "https://galore-extortion-volley.ngrok-free.dev/api/email/send",

        {

          method: "POST",

          credentials: "include",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            to: emailTo,
            subject: emailSubject,
            body: emailBody

          })

        }

      );

      const data = await response.json();

      if (response.ok) {

        setShowSuccess(true);

      } else {

        alert(data.message || "Failed to send email.");

      }

    } catch (error) {

      console.error(error);

      alert("Failed to send email.");

    }

    // Gmail API call here later
  };

  return (
    <><Header />
    <div className="email-page">
      {/* LEFT SECTION */}
      <div className="form-card">
        <h1>TDR Refund Request</h1>

        <p className="subtitle">
          Fill passenger details and send your email
          to IRCTC
        </p>

        <div className="field">
          <label>PNR Number</label>

          <input
            type="text"
            placeholder="Enter 10-digit PNR number"
            value={pnr}
            maxLength={10}
            onChange={(e) => {
              const val = e.target.value;
              setPnr(val);
              setPnrTouched(true);
              if (val === "") {
                setPnrError("PNR number is required.");
              } else if (!/^\d+$/.test(val)) {
                setPnrError("PNR must contain digits only.");
              } else if (val.length < 10) {
                setPnrError(`PNR must be 10 digits (${val.length}/10 entered).`);
              } else {
                setPnrError("");
              }
            }}
          />

          {pnrTouched && pnrError && (
            <p className="error-text">
              {pnrError}
            </p>
          )}
        </div>

        <div className="passenger-section">
          <h3>Passenger Details</h3>
          <p>Add up to 6 passengers</p>

          {passengerTouched && passengerError && (
            <p className="error-text">
              {passengerError}
            </p>
          )}

          {passengers.map((passenger, index) => (
            <div
              className="passenger-row"
              key={index}
            >
              <div className="passenger-input">
                <label>
                  Passenger {index + 1}
                </label>

                <input
                  type="text"
                  placeholder="Enter passenger name"
                  value={passenger.name}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    handlePassengerChange(index, val);
                    setPassengerTouched(true);
                  }}
                />
              </div>

              {index > 0 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() =>
                    removePassenger(index)
                  }
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <div className="add-row">
            <button
              type="button"
              className="add-btn"
              onClick={addPassenger}
              disabled={
                passengers.length === 6
              }
            >
              + Add Passenger
            </button>

            <span>
              {passengers.length}/6 passengers
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="preview-card">

        {loadingTemplate && (
          <p>Loading template...</p>
        )}
        <h2>Email Preview</h2>

        <div className="email-meta">
          <p>
            <strong>From:</strong>{" "}
            {userEmail || "isha@gmail.com"}
          </p>

          <p>
            <strong>To:</strong>{" "}
            {emailTo || "care@irctc.co.in"}
          </p>

          <p>
            <strong>Subject:</strong>{" "}
            {emailSubject || "TDR Refund Request"}
          </p>
        </div>

        <div className="email-body">
          {!isEditing ? (
            <pre>{emailBody}</pre>
          ) : (
            <textarea
              className="email-textarea"
              value={emailBody}
              onChange={(e) => {
                setEmailBody(e.target.value);
                setIsCustomEmail(true);
              }
              }

            />
          )}
        </div>

        <div className="button-row">
          <button
            className="edit-btn"
            onClick={() =>
              setIsEditing(!isEditing)
            }
          >
            {isEditing ? "Save" : "Edit"}
          </button>

          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!isFormValid}
          >
            Send
          </button>
        </div>
      </div>
    </div>
    <Footer />

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            <h2>Email Sent Successfully!</h2>
            <p>Your TDR refund request has been sent to IRCTC. You will receive a confirmation on your registered email.</p>
            <button
              className="success-btn"
              onClick={() => setShowSuccess(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EmailForm;