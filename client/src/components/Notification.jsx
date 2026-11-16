
import { useEffect, useState } from "react";
import socket from "../services/socket";
import {
  speakMessage,
  pauseSpeech,
  resumeSpeech,
  stopSpeech
} from "../services/speech";

function EmailNotification() {
  const [notification, setNotification] = useState("");
  const [emailSubject, setEmailSubject] = useState("");

  useEffect(() => {
    socket.on("newEmail", (data) => {
      console.log("Notification received:", data);

      setNotification(data.message);
      setEmailSubject(data.subject);

      speakMessage(
        `Your email has been sent successfully.
        Subject: ${data.subject}.
        Message: ${data.emailMessage}`
      );
    });

    return () => {
      socket.off("newEmail");
    };
  }, []);

  return (
    <div className="notification-card">

      <div>
        <h3>🔔 Email Updates</h3>
        <span className="voice-status">
          ● Live Voice Assistant
        </span>
      </div>

      {notification ? (
        <>
          <p>{notification}</p>

          <p>
            <strong>Subject:</strong> {emailSubject}
          </p>

          <div className="voice-controls">
            <button onClick={pauseSpeech}>
              ⏸ Pause
            </button>

            <button onClick={resumeSpeech}>
              ▶ Resume
            </button>

            <button onClick={stopSpeech}>
              ■ Stop
            </button>
          </div>
        </>
      ) : (
        <p>
          No new notifications yet. Your email updates will appear here.
        </p>
      )}

    </div>
  );
}

export default EmailNotification;
