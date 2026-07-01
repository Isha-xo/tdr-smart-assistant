import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching profile...");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/profile`,//flag
          {
            credentials: "include",
          }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          alert("Response is NOT OK");
          navigate("/");
          return;
        }

        const user = await response.json();
        console.log("Google User:", user);

        const savedState =
          JSON.parse(
            localStorage.getItem("recommendationState")
          );

        console.log("Saved State:", savedState);

        if (!savedState) {
          alert("Recommendation State is NULL");
          navigate("/");
          return;
        }

        navigate("/email", {
          state: {
            user,
            userEmail: user.email,
            result: savedState.result,
            issueKey: savedState.issueKey,
            issueLabel: savedState.issueLabel
          }
        });

        localStorage.removeItem("recommendationState");

      } catch (error) {
        console.error("OAuth Error:", error);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "22px",
        fontWeight: "600",
      }}
    >
      OAuth Success Page Loaded
    </div>
  );
}