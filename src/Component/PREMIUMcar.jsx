

import "./PREMIUMcar.css";
import { useRef } from "react";

import {
  MoveRight  
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Daily Rental",
    subtitle: "Flexible rides for every day.",
    description:
      "Rent a reliable car for a day or more and enjoy a comfortable, convenient driving experience without long-term commitments.",
  },
  {
    id: 2,
    title: "Long-Term Rental",
    subtitle: "Drive longer. Save more.",
    description:
      "Our long-term rental plans are perfect for extended stays, business needs, and personal use, with flexible durations and hassle-free service.",
  },
  {
    id: 3,
    title: "Airport Transfer",
    subtitle: "Start and end your journey comfortably.",
    description:
      "Enjoy reliable airport pickup and drop-off with clean, comfortable vehicles and convenient scheduling.",
  },
  {
    id: 4,
    title: "Chauffeur Service",
    subtitle: "Relax. We’ll take care of the drive.",
    description:
      "Travel with a professional chauffeur and enjoy a smooth, comfortable ride for business trips, events, meetings, or special occasions.",
  },
  {
    id: 5,
    title: "Luxury Rental",
    subtitle: "Premium cars for special moments.",
    description:
      "Choose from our premium vehicles and experience style, comfort, and a first-class driving experience for events, celebrations, and VIP travel.",
  },
  {
    id: 6,
    title: "Corporate Rental",
    subtitle: "Reliable mobility for your business.",
    description:
      "Flexible corporate rental solutions designed for companies, executives, employees, meetings, and business travel.",
  },
];

const PREMIUMcar = () => {
  return (
    <section className="premium-car">

      <div className="premium-header">
        <span>WHAT WE OFFER</span>

        <h2>PREMIUM CAR RENTAL SERVICES</h2>

        <p>
          Reliable Cars. Flexible Rentals. Exceptional Service.
        </p>
      </div>

      <div className="premium-container">

        {services.map((service) => (
          <div className="premium-card" key={service.id}>

            <div className="premium-number">
              0{service.id}
            </div>

            <div className="premium-content">

              <h3>{service.title}</h3>

              <h4>{service.subtitle}</h4>

              <p>{service.description}</p>

             <button
  className="premium-btn"
  onClick={() => {
    document.getElementById("booknow")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
>
  BOOKING NOW <MoveRight />
</button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default PREMIUMcar;

