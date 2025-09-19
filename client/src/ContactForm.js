import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_qk6lr97',
      'template_ntit3fg',
      form.current,
      {
        publicKey: 'r3oKwPD3LNZzibcRG',
      }
    )
    .then(() => {
      form.current.reset(); 
    })
    .catch((error) => {
      console.error('Email sending failed', error);
      alert('An error occurred, please try again later.');
    });
  };

  return (
    <section id="contactSection" className="card" style={{ backgroundColor: 'black', width: '75%', margin: 'auto' }}>
      <div className="contact-container">
        <form ref={form} onSubmit={sendEmail} className="" style={{ maxWidth: '500px' }}>
          <h2>Let's Connect</h2>
          <br />
          <label>Your Name</label>
          {/* The name attributes below must match the EmailJS template variables */}
          <input name="name" type="text" placeholder="John Doe" required />
          <label>Your Email</label>
          <input name="email" type="email" placeholder="john@example.com" required />
          <label>Message</label>
          <textarea name="message" placeholder="Your message here..." required />
          <button type="submit" className="send-button">
            <span>✈️ Send Message</span>
          </button>
        </form>

        {/* Keep your existing contact info cards unchanged */}
        <div className="info-cards" style={{ paddingLeft: '25px'}}>
          <div className="info-card" style={{ display: 'contents' }}>
            <br />
            <p><strong>Email</strong><br /><a style={{color: '#0FFF50'}} href="vsaraf6@gatech.edu">vsaraf6@gatech.edu</a></p>
            <br />
            <p><strong>LinkedIn</strong><br /><a style={{color: '#0FFF50'}} href="https://www.linkedin.com/in/vineet-saraf/">linkedin.com/in/vineet-saraf/</a></p>
            <br />
            <p><strong>GitHub</strong><br /><a style={{color: '#0FFF50'}} href="https://github.com/yeetbruises">github.com/yeetbruises</a></p>
          </div>
          <br />
          <div className="info-card" style={{ display: 'contents' }}>
            <div className="social-icons">
              <i className="fab fa-linkedin" />
              <i className="fab fa-github" />
              <i className="fas fa-envelope" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
