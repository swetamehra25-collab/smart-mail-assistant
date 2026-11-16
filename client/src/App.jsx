
import ComposeEmail from "./components/ComposeEmail";
import EmailNotification from "./components/Notification";
import Inbox from "./components/Inbox";
import "./App.css";

function App() {
  return (
    <div className="app-container">

      <header className="app-header">
        <div className="logo">
          Smart<span>Mail.</span>
        </div>
        <div className="header-tag">
          ✦ Smart Email Experience
        </div>
      </header>

      <section className="hero">
        <h1>
          Your Email, <span>Made Smarter.</span>
        </h1>
        <p>
          Send emails effortlessly and stay updated with real-time
          notifications and voice assistance.
        </p>
      </section>

      <main className="dashboard">

        <section className="panel">
          <h2>✉ Compose a Message</h2>
          <p className="panel-description">
            Write your email and send it instantly.
          </p>
          <ComposeEmail />
        </section>

        <section className="panel">
          <h2>🔔 Voice Notifications</h2>
          <p className="panel-description">
            Get notified and listen to your email updates.
          </p>
          <EmailNotification />
        </section>

        <section className="panel inbox-section">
          <Inbox />
        </section>

      </main>

    </div>
  );
}

export default App;
