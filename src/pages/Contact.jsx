import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Process the feedback as needed (e.g. send to your backend)
    console.log("Feedback submitted:", feedback);
    setFeedback('');
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-text">
          Reach out to us at <a href="mailto:studyslug@ucsc.edu">studyslug@ucsc.edu</a>
        </p>

        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-section">
          <div className="faq-item">
            <h3 className="faq-question">What is StudySlug?</h3>
            <p className="faq-answer">
              StudySlug is a platform that connects students to study buddies or tutoring assistance.
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">How do I sign up?</h3>
            <p className="faq-answer">
              You can sign up on our profile page. Provide the necessary details and get started!
            </p>
          </div>
          
        </div>

        <h2 className="feedback-title">Have Feedback?</h2>
        <form onSubmit={handleFeedbackSubmit} className="feedback-form">
          <textarea
            className="feedback-textarea"
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button type="submit" className="feedback-button">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
