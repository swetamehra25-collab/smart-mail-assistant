
import { useEffect, useState } from "react";
import axios from "axios";

function Inbox() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const emailsPerPage = 5;

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/emails"
        );
        setEmails(response.data.emails || []);
      } catch (error) {
        console.log("Inbox error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const totalPages = Math.ceil(emails.length / emailsPerPage);

  const lastIndex = currentPage * emailsPerPage;
  const firstIndex = lastIndex - emailsPerPage;

  const currentEmails = emails.slice(firstIndex, lastIndex);

  if (loading) {
    return <p>Loading emails...</p>;
  }

  return (
    <div className="inbox-panel">

      <div className="inbox-header">
        <div>
          <h2>📥 Your Inbox</h2>
          <p className="panel-description">
            Manage your recent email activity.
          </p>
        </div>

        <span className="email-count">
          {emails.length} Emails
        </span>
      </div>

      {emails.length === 0 ? (
        <p className="empty-inbox">No emails found.</p>
      ) : (
        <>
          <div className="email-list">
            {currentEmails.map((email) => (
              <div className="email-item" key={email._id}>
                <div className="email-item-top">
                  <h3>{email.subject || "No Subject"}</h3>
                  <span className="email-date">
                    {new Date(email.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="email-to">
                  <strong>To:</strong> {email.to}
                </p>

                <p className="email-message">
                  {email.message || email.body || "No message content"}
                </p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        </>
      )}

    </div>
  );
}

export default Inbox;
