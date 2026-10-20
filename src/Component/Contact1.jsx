
import "./Contact1.css";

const Contact1 = () => {
  return (
    <section className="contact-hero">
      <div className="contact-hero-content">
        <div className="contact-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Contact</span>
        </div>

        <span className="contact-eyebrow">
          <span className="eyebrow-line"></span>
          GET IN TOUCH
        </span>

        <h1>
          LET'S GET YOU
          <span> ON THE ROAD</span>
        </h1>

        <p>
          Have questions about our cars, rental plans, or booking
          process? We're here to help. Contact our team for quick
          assistance, personalized recommendations, and a smooth
          car rental experience.
        </p>

        <a href="#contact-information" className="contact-hero-btn">
          CONTACT US <span>↗</span>
        </a>
      </div>
    </section>
  );
};

export default Contact1;
