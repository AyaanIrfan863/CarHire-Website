import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import "./Frequently.css";

const faqData = [
  {
    id: 1,
    question: "How can I book a rental car?",
    answer:
      "Simply explore our available cars, choose your preferred vehicle, and contact our team to complete your booking.",
  },
  {
    id: 2,
    question: "Can I rent a car for multiple days?",
    answer:
      "Yes! We offer flexible rental options to suit your travel plans and duration.",
  },
  {
    id: 3,
    question: "Can I contact you for special rental requirements?",
    answer:
      "Absolutely! Contact us with your requirements, and we'll do our best to find the right solution.",
  },
];

const Frequently = () => {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-headings">
        <h3>
          <HelpCircle size={14} />
          FAQ
        </h3>
        <h1>
          Frequently Asked <span>Questions</span>
        </h1>
        <p>
        Answers to your questions are available here. If you have any other questions, please feel free to contact us.
        </p>
      </div>

      <div className="faq-container">
        {faqData.map((item, index) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`faq-item ${isOpen ? "active" : ""}`}
              style={{ animationDelay: `${0.1 + index * 0.15}s` }}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="faq-q-text">{item.question}</span>
                <span className={`faq-icon ${isOpen ? "rotate" : ""}`}>
                  <ChevronDown size={22} />
                </span>
              </button>

              <div
                id={`faq-answer-${item.id}`}
                className={`faq-answer ${isOpen ? "open" : ""}`}
              >
                <div className="faq-answer-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Frequently;
