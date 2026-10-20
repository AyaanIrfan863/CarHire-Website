
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Cpu,
  Headphones,
  ArrowUpRight,
  Gauge,
  Award,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./About1.css";

const values = [
  {
    icon: <ShieldCheck />,
    title: "Premium Quality",
    description:
      "We focus on quality, attention to detail, and an exceptional automotive experience.",
  },
  {
    icon: <Cpu />,
    title: "Modern Technology",
    description:
      "We embrace modern automotive technology to make every journey smarter.",
  },
  {
    icon: <Heart />,
    title: "Customer First",
    description:
      "Your needs, preferences, and satisfaction are at the heart of our approach.",
  },
  {
    icon: <Headphones />,
    title: "Dedicated Support",
    description:
      "We aim to make finding your next car simple, clear, and convenient.",
  },
];

function About1() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-label">
            OUR STORY / OUR PASSION
          </span>

          <h1>
            ABOUT <span>HIRE</span>
          </h1>

          <p>
            Driven by passion. Defined by performance.
            Discover the vision behind HIRE and our love
            for exceptional automobiles.
          </p>

          <div className="about-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About</span>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story-image">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
            alt="Luxury sports car"
          />
          <div className="story-image-tag">
            <span>H</span>
            <div>
              <strong>HIRE</strong>
              <small>DRIVEN BY PASSION</small>
            </div>
          </div>
        </div>

        <div className="about-story-content">
          <span className="about-label">WHO WE ARE</span>

          <h2>
            MORE THAN
            <br />
            JUST A <span>CAR.</span>
          </h2>

          <p>
            HIRE is built around a passion for automobiles,
            thoughtful design, and the excitement of finding
            the right car.
          </p>

          <p>
            Our goal is to create a convenient place where
            automotive enthusiasts and everyday drivers can
            explore different models, discover useful
            information, and make informed decisions.
          </p>

          <p>
            From performance-focused machines to elegant
            everyday vehicles, we believe every great drive
            begins with the right choice.
          </p>

          <Link to="/Gallery" className="about-button">
            EXPLORE OUR MODELS
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="about-mission">
        <div className="about-section-heading">
          <span className="about-label">WHAT DRIVES US</span>
          <h2>OUR PURPOSE _ OUR FUTURE</h2>
          <p>
            The principles that shape the HIRE experience.
          </p>
        </div>

        <div className="mission-grid">
          <article className="mission-card">
            <div className="mission-icon">
              <Target />
            </div>
            <span className="mission-number">01 / MISSION</span>
            <h3>OUR MISSION</h3>
            <p>
              To make exploring automobiles easier through
              useful information, a thoughtful experience,
              and a customer-focused approach.
            </p>
          </article>

          <article className="mission-card">
            <div className="mission-icon">
              <Eye />
            </div>
            <span className="mission-number">02 / VISION</span>
            <h3>OUR VISION</h3>
            <p>
              To build a trusted automotive platform where
              people can discover vehicles, compare options,
              and move forward with confidence.
            </p>
          </article>

          <article className="mission-card">
            <div className="mission-icon">
              <Heart />
            </div>
            <span className="mission-number">03 / VALUES</span>
            <h3>OUR VALUES</h3>
            <p>
              Quality, transparency, innovation, and respect
              for every customer guide the experience we aim
              to deliver.
            </p>
          </article>
        </div>
      </section>

      <section className="about-difference">
        <div className="difference-image">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85"
            alt="Performance sports car"
            loading="lazy"
          />
        </div>

        <div className="difference-content">
          <span className="about-label">WHY HIRE</span>
          <h2>
            THE HIRE
            <br />
            <span>DIFFERENCE.</span>
          </h2>

          <p>
            We bring together the things that matter to
            automotive enthusiasts: great design, useful
            technology, quality, and a smoother car discovery
            experience.
          </p>

          <div className="difference-list">
            {values.map((item) => (
              <article className="difference-item" key={item.title}>
                <div className="difference-icon">
                  {item.icon}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-highlights">
        <div className="about-section-heading">
          <span className="about-label">THE HIRE EXPERIENCE</span>
          <h2>BUILT AROUND YOUR DRIVE.</h2>
        </div>

        <div className="highlights-grid">
          <article className="highlight-card">
            <Gauge />
            <h3>Performance</h3>
            <p>
              Discover vehicles made for exciting drives
              and unforgettable journeys.
            </p>
          </article>

          <article className="highlight-card">
            <Award />
            <h3>Quality</h3>
            <p>
              Explore carefully presented information
              to help you assess your options.
            </p>
          </article>

          <article className="highlight-card">
            <Users />
            <h3>People First</h3>
            <p>
              A straightforward experience designed
              around the needs of drivers.
            </p>
          </article>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-content">
          <span className="about-label">YOUR NEXT CHAPTER</span>
          <h2>
            READY TO FIND
            <br />
            YOUR <span>PERFECT DRIVE</span>
          </h2>
          <p>
            Explore our collection and discover a car
            that matches your style.
          </p>

          <div className="about-cta-actions">
            <Link to="/Gallery" className="about-button">
              EXPLORE MODELS
              <ArrowUpRight size={18} />
            </Link>

            <Link to="/contact" className="about-outline-button">
              CONTACT US
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About1;
