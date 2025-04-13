import React from 'react';
import '../styles/Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-text">
          Reach out to us at <a href="mailto:slugstudy@ucsc.edu">slugstudy@ucsc.edu</a>
        </p>
      </div>
    </div>
  );
}

export default Contact;
