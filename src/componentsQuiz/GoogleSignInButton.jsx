import { useEffect, useRef } from "react";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Loads Google's Identity Services script once (safe if this component
// mounts more than once across the app — checks for the script/global
// before adding it again) and renders Google's own official button,
// which then hands back a signed credential token via onSuccess.
const loadGoogleScript = () => {
  return new Promise((resolve) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }
    const existing = document.getElementById("google-identity-script");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.id = "google-identity-script";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const GoogleSignInButton = ({ onSuccess, onError }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!CLIENT_ID) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not set — Google Sign-In button will not render.");
      return;
    }

    let cancelled = false;

    loadGoogleScript().then(() => {
      if (cancelled || !window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => {
          if (response.credential) {
            onSuccess(response.credential);
          } else {
            onError?.("Google sign-in did not return a credential");
          }
        }
      });

      if (buttonRef.current) {
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          width: 320,
          text: "continue_with"
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [onSuccess, onError]);

  if (!CLIENT_ID) return null;

  return <div ref={buttonRef} style={{ display: "flex", justifyContent: "center", margin: "12px 0" }} />;
};

export default GoogleSignInButton;
