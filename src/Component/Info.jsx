import { useState } from "react";
import { supabase } from "../supabaseClient";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import "./Info.css";

const Info = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // ===== Current user lo =====
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsError(true);
      setMessage("Please login first to send a message.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target);
    const payload = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      message: formData.get("message").trim(),
      user_id: user.id,   // ← ye add kiya
    };

    const { error } = await supabase.from("contact_messages").insert([payload]);

    if (error) {
      setIsError(true);
      setMessage("Message send nahi ho saka: " + error.message);
    } else {
      setIsError(false);
      setMessage("Your message has been sent successfully! We will get back to you soon.");
      e.target.reset();
    }

    setLoading(false);
  };

  const openInMaps = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=123+Main+Street+Karachi+Pakistan",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const toggleMap = () => setShowMap((prev) => !prev);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("info@carhire.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const scheduleVisit = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startDate = tomorrow.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endDateObj = new Date(tomorrow);
    endDateObj.setHours(endDateObj.getHours() + 1);
    const endDate = endDateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=CarHire%20Meeting&dates=${startDate}/${endDate}&details=Meeting%20with%20CarHire%20Team&location=123%20Main%20Street%20Karachi`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-headings">
        <h3>GET IN TOUCH</h3>
        <h1>
          Contact <span>Information</span>
        </h1>
        <p>
          We are always here to help you. You can reach us through the following contact methods.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card fade-up delay-1">
          <div className="icon">
            <MapPin size={32} />
          </div>
          <h3>Our Location</h3>
          <p>Visit us at our office and let us help you find the perfect ride.</p>
          <span className="info-text">123 Main Street, Karachi, Pakistan</span>
          <div className="card-actions">
            <button
              type="button"
              className="mini-btn"
              onClick={toggleMap}
              aria-expanded={showMap}
            >
              {showMap ? "Hide Map" : "View Map"}
            </button>
          </div>
        </div>

        <div className="contact-card fade-up delay-2">
          <div className="icon">
            <Phone size={32} />
          </div>
          <h3>Call Us</h3>
          <p>Have an urgent question? Give us a call, and our team will be happy to assist you.</p>
          <a href="tel:+923001234567" className="info-text">+92 300 1234567</a>
          <div className="card-actions">
            <a href="tel:+923001234567" className="mini-btn">Call Now</a>
            <a
              href="https://wa.me/923001234567?text=Hi%20CarHire%2C%20I%20have%20a%20question%20about%20renting%20a%20car"
              target="_blank"
              rel="noopener noreferrer"
              className="mini-btn outline"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="contact-card fade-up delay-3">
          <div className="icon">
            <Mail size={32} />
          </div>
        <h3>Email Us</h3>
          <p>Send us your questions or inquiries, and we'll get back to you as soon as possible.</p>
          <a href="mailto:info@carhire.com" className="info-text">info@carhire.com</a>
          <div className="card-actions">
            <a href="mailto:info@carhire.com" className="mini-btn">Send Email</a>
            <button
              type="button"
              className="mini-btn outline"
              onClick={handleCopyEmail}
            >
              {copied ? "Copied!" : "Copy Email"}
            </button>
          </div>
        </div>

        <div className="contact-card fade-up delay-4">
          <div className="icon">
            <Clock size={32} />
          </div>
          <h3>Working Hours</h3>
          <p>Monday – Saturday: 9:00 AM – 8:00 PM</p>
          <p>Sunday: 10:00 AM – 6:00 PM</p>
          <div className="card-actions">
            <button
              type="button"
              className="mini-btn"
              onClick={scheduleVisit}
            >
              Schedule Visit
            </button>
          </div>
        </div>
      </div>

      {showMap && (
        <div className="map-container">
          <iframe
            title="CarHire Location Map"
            src="https://www.google.com/maps?q=123+Main+Street+Karachi+Pakistan&output=embed"
            width="100%"
            height="380"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      <div className="contact-form-wrapper">
        <div className="contact-form fade-up delay-2">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>
            <button type="submit" disabled={loading}>
              {loading ? (
                "SENDING..."
              ) : (
                <span className="btn-content">
                  <Send size={18} />
                  SEND MESSAGE
                </span>
              )}
            </button>
            {message && (
              <p className={`form-message ${isError ? "error" : "success"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Info;