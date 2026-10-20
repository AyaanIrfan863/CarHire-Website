import { useState } from "react";
import "./Servicesection.css";

import {
  Car,
  BadgeDollarSign,
  Wrench,
  ShieldCheck,
  BellRing,
  Gauge,
  X
} from "lucide-react";

const Servicesection = () => {

  const [selectedService, setSelectedService] = useState(null);

const [showForm, setShowForm] = useState(false);

  const services = [
    {
      title: "Car Purchase",
      icon: <Car />,
      description:
        "Find and purchase your dream car with complete confidence.",
      details:
        "We help you find the right car according to your budget and requirements. Our team provides complete information about the vehicle, features, condition and pricing so you can make a confident decision."
    },

    {
      title: "Car Financing",
      icon: <BadgeDollarSign />,
      description:
        "Flexible financing options for your next vehicle.",
      details:
        "Our financing service provides flexible payment options for your next vehicle. We help you understand available plans, payment schedules and financing requirements before making your purchase."
    },

    {
      title: "Maintenance & Service",
      icon: <Wrench />,
      description:
        "Professional maintenance and vehicle servicing for long life.",
      details:
        "Keep your vehicle running smoothly with professional maintenance. Our service includes routine checks, oil changes, brake inspection, engine diagnostics and general vehicle maintenance."
    },

    {
      title: "Car Inspection",
      icon: <ShieldCheck />,
      description:
        "Detailed vehicle inspection before purchase.",
      details:
        "Our detailed inspection checks important vehicle components including the engine, brakes, tires, suspension, exterior and other major parts to help you understand the condition of the car."
    },

    {
      title: "24/7 Roadside Assistance",
      icon: <BellRing />,
      description:
        "Reliable support whenever you need it.",
      details:
        "Our roadside assistance service provides support when you experience a vehicle problem while travelling. Assistance can include battery issues, tire problems, breakdown support and towing coordination."
    },

    {
      title: "Test Drive",
      icon: <Gauge />,
      description:
        "Experience your selected car before making a decision.",
      details:
        "Take your selected vehicle for a test drive and experience its handling, comfort, acceleration and braking. Our team can also explain the main features of the vehicle."
    }
  ];

  return (
    <div className="service-section">

      <div className="service-content">

        <h3>OUR SERVICES</h3>

        <h1>Everything Your Car Needs</h1>

        <p>
          We offer a full range of services to keep your vehicle running
          smoothly, safely, <span>and at</span> its best. Quality, trust
          <span> and customer</span> satisfaction — <span>always.</span>
        </p>

      </div>


      <div className="con">

        {services.map((service, index) => (

          <div className="servicebox" key={index}>

            <div className="i">
              {service.icon}
            </div>

            <h3>
              {service.title}
            </h3>

            <p>
              {service.description}
            </p>

            <button
              onClick={() => setSelectedService(service)}
            >
              Learn More →
            </button>

          </div>

        ))}

      </div>



   {selectedService && (

  <div
    className="service-modal-overlay"
    onClick={() => {
      setSelectedService(null);
      setShowForm(false);
    }}
  >

    <div
      className="service-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        className="modal-close"
        onClick={() => {
          setSelectedService(null);
          setShowForm(false);
        }}
      >
        <X />
      </button>

      {!showForm ? (

        <>
          <div className="modal-icon">
            {selectedService.icon}
          </div>

          <h2>
            {selectedService.title}
          </h2>

          <p>
            {selectedService.details}
          </p>

       <button
  className="manage-btn"
  onClick={() => setShowForm(true)}
>
  Manage Service
</button>
{showForm && (
  <div className="service-form">

    <h3>Manage {selectedService.title}</h3>

    <input
      type="text"
      placeholder="Your Name"
    />

    <input
      type="tel"
      placeholder="Phone Number"
    />

    <input
      type="email"
      placeholder="Email Address"
    />

    <input
      type="date"
    />

    <input
      type="time"
    />

    <textarea
      placeholder="Additional Message"
      rows="4"
    ></textarea>

    <button
      className="book-btn"
      onClick={() => {
        alert("Service request submitted successfully!");
        setShowForm(false);
        setSelectedService(null);
      }}
    >
      Book Service
    </button>

  </div>
)}
        </>

      ) : (

        <div className="service-form">

          <div className="modal-icon">
            {selectedService.icon}
          </div>

          <h2>
            Manage Service
          </h2>

          <p className="selected-service">
            Service: <strong>{selectedService.title}</strong>
          </p>

          <input
            type="text"
            placeholder="Your Name"
          />

          <input
            type="tel"
            placeholder="Phone Number"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="date"
          />

          <input
            type="time"
          />

          <textarea
            placeholder="Additional Message"
            rows="4"
          ></textarea>

          <button
            className="book-btn"
            onClick={() => {
              alert("Service request submitted successfully!");
              setShowForm(false);
              setSelectedService(null);
            }}
          >
            Book Service
          </button>

        </div>

      )}

    </div>

  </div>

)}

    </div>
  );
};

export default Servicesection;