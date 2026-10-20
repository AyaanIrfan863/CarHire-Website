import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./Booknow.css";

const Booknow = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

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
      setMessage("Please login first to book a service.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target);
    const payload = {
      full_name: formData.get("full_name").trim(),
      email: formData.get("email").trim(),
      service: formData.get("service"),
      preferred_date: formData.get("preferred_date"),
      user_id: user.id,   // ← ye add kiya
    };

    const { data, error } = await supabase
      .from("service_bookings")
      .insert([payload])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      setIsError(true);
      setMessage("Booking save nahi ho saki: " + error.message);
    } else {
      setIsError(false);
      setMessage(
        "Your booking has been submitted successfully! We will contact you shortly."
      );
      e.target.reset();
    }

    setLoading(false);
  };

  return (
    <section className="booknow" id="booknow">
      {/* ===== Left: Headings ===== */}
      <div className="headings">
        <h3>BOOK A SERVICE</h3>
        <h1>
          Keep Your Car in <span>Top Shape</span>
        </h1>
        <p>
          Schedule your service today and let our experts take care of the
          rest. Fast, easy and reliable.
        </p>

        {/* Trust Badges */}
        <div className="trust-badges">
          <div className="badge">
            <span className="num">10K+</span>
            <span className="label">Happy Clients</span>
          </div>
          <div className="badge">
            <span className="num">500+</span>
            <span className="label">Cars Available</span>
          </div>
          <div className="badge">
            <span className="num">24/7</span>
            <span className="label">Support</span>
          </div>
        </div>
      </div>

      {/* ===== Right: Booking Form ===== */}
      <div className="booking-form">
        <form className="forms" onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            aria-label="Full Name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            aria-label="Email Address"
            required
          />

          <select
            name="service"
            defaultValue=""
            aria-label="Select Service"
            required
          >
            <option value="" disabled>
              Select Service
            </option>
            <option value="daily">Daily Rental</option>
            <option value="long-term">Long-Term Rental</option>
            <option value="airport">Airport Transfer</option>
            <option value="chauffeur">Chauffeur Service</option>
            <option value="luxury">Luxury Rental</option>
            <option value="corporate">Corporate Rental</option>
          </select>

          <input
            type="date"
            name="preferred_date"
            aria-label="Preferred Date"
            min={new Date().toLocaleDateString("en-CA")}
            required
          />

          <button
            type="submit"
            className="book-now-btn"
            disabled={loading}
          >
            {loading ? "BOOKING..." : "BOOK NOW"}
          </button>

          {message && (
            <p className={`form-message ${isError ? "error" : "success"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Booknow;