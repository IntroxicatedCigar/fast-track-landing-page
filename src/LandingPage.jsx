import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import PricingCalculator from "./components/PricingCalculator";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    title: "Operations Manager",
    company: "Lumina Retail",
    rating: "★★★★★",
    text: "Fast Track Deliveries completely changed our fulfillment pipeline. Their same-day service is incredibly reliable.",
  },
  {
    id: 2,
    name: "David Kim",
    title: "CEO",
    company: "FreshBite Foods",
    rating: "★★★★★",
    text: "We needed a partner that understands time-sensitive logistics. Fast Track handles our perishables flawlessly.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Supply Chain Lead",
    company: "TechGear Inc.",
    rating: "★★★★☆",
    text: "Great communication, solid pricing, and packages always arrive in perfect condition. Highly recommended.",
  },
  {
    id: 4,
    name: "Mark Rodriguez",
    title: "Director",
    company: "Wears Inc.",
    rating: "★★★★☆",
    text: "Solid pricing. Highly recommended.",
  },
];

const faqs = [
  {
    question: "What are your operating hours?",
    answer:
      "Our dispatch center operates from 7:00 AM to 6:00 PM, Monday through Saturday. Deliveries booked after 5:00 PM will be scheduled for the next morning.",
  },
  {
    question: "How do I track my package?",
    answer:
      "Once your package is dispatched, you will receive an SMS with a unique tracking link. You can also enter your tracking number in the bar at the top of our homepage.",
  },
  {
    question: "Are my items insured during transit?",
    answer:
      "Yes. All packages are insured up to KES 10,000 by default. For high-value electronics or fragile items, we offer premium insurance at checkout.",
  },
  {
    question: "What happens if a delivery attempt fails?",
    answer:
      "If the recipient is unavailable, our rider will attempt to contact them twice. If unsuccessful, the package is returned to our Moi Avenue hub for rescheduling at a small secondary fee.",
  },
];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");
  const [trackingInput, setTrackingInput] = useState("");
  const [isSendingQuote, setIsSendingQuote] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleTrackParcel = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    const message = `Hello, I'd like an update on my package. Tracking Number: ${trackingInput}`;
    const clientWhatsAppNumber = "254706053163";
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${clientWhatsAppNumber}?text=${encodedMessage}`,
      "_blank"
    );
    setTrackingInput("");
  };

  // This function connects your Pricing component to your Modal
  const openBookingModal = (zoneInfo) => {
    setSelectedZone(zoneInfo);
    setIsModalOpen(true);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header id="home" className="hero-section">
        <div className="hero-content">
          <h1>Speedman Deliveries</h1>
          <p>
            Your parcels, delivered with speed and precision. We handle the
            logistics so you can focus on growing your business.
          </p>
          <button
            className="cta-button primary"
            onClick={() => openBookingModal("")}
          >
            Book a Delivery
          </button>

          <form className="tracking-container" onSubmit={handleTrackParcel}>
            <input
              type="text"
              placeholder="Enter tracking number (e.g., FT-1234)"
              className="tracking-input"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
            />
            <button type="submit" className="cta-button primary tracking-btn">
              Track Parcel
            </button>
          </form>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="process" className="process-section">
        <h2>How It Works</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-icon">📦</div>
            <h3>1. Book</h3>
            <p>
              Request a quote or schedule a pickup easily through our online
              platform.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">🚚</div>
            <h3>2. Dispatch</h3>
            <p>
              Our nearest driver is dispatched to collect your package securely.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">📍</div>
            <h3>3. Deliver</h3>
            <p>
              Track your parcel in real-time until it reaches its final
              destination.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Same-Day Express</h3>
            <p>
              For urgent packages that need to reach their destination before
              the close of business.
            </p>
          </div>
          <div className="service-card">
            <h3>Scheduled Freight</h3>
            <p>
              Reliable, pre-planned delivery routes for bulk items and regular
              shipments.
            </p>
          </div>
          <div className="service-card">
            <h3>Fragile Handling</h3>
            <p>
              Specialized courier services equipped to transport delicate and
              high-value items safely.
            </p>
          </div>
        </div>
      </section>

      {/* NEW ISOLATED FARE CALCULATOR */}
      <PricingCalculator onBookRoute={openBookingModal} />

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our delivery process.</p>
        </div>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openFaqIndex === index ? "active" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.question}
                <span className="faq-icon">
                  {openFaqIndex === index ? "−" : "+"}
                </span>
              </button>
              <div className="faq-answer-wrapper">
                <div className="faq-answer">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials" className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div
          className="carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="stars">{testimonial.rating}</div>
                <p className="review-text">"{testimonial.text}"</p>
                <div className="client-info">
                  <strong>{testimonial.name}</strong>
                  <span>
                    {testimonial.title}, {testimonial.company}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Ready to get started?</h2>
        <p>Send us a message to get a custom quote for your delivery needs.</p>
        {quoteSuccess ? (
          <div
            className="quote-success-message"
            style={{
              padding: "40px 20px",
              backgroundColor: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: "12px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "#166534",
                fontSize: "1.5rem",
                margin: "0 0 10px 0",
              }}
            >
              Quote Request Sent! 🎉
            </h3>
            <p style={{ color: "#15803D", margin: "0" }}>
              Thank you. Our dispatch team has received your details and will
              contact you shortly.
            </p>
            <button
              className="cta-button submit-btn"
              style={{
                marginTop: "20px",
                width: "auto",
                display: "inline-block",
                padding: "12px 40px",
              }}
              onClick={() => setQuoteSuccess(false)}
            >
              Send Another Request
            </button>
          </div>
        ) : (
          <form
            className="contact-form"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSendingQuote(true);
              const formData = new FormData(e.target);
              try {
                const response = await fetch(
                  "https://formspree.io/f/mojylynd",
                  {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" },
                  }
                );
                if (response.ok) {
                  setQuoteSuccess(true);
                  e.target.reset();
                } else {
                  alert(
                    "Oops! There was a problem submitting your form. Please try again."
                  );
                }
              } catch (error) {
                alert(
                  "Network error. Please check your connection and try again."
                );
              } finally {
                setIsSendingQuote(false);
              }
            }}
          >
            <div className="input-group">
              <input type="text" name="name" placeholder="Your Name" required />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Tell us about your delivery needs..."
              rows="5"
              required
            ></textarea>
            <button
              type="submit"
              className="cta-button submit-btn"
              disabled={isSendingQuote}
            >
              {isSendingQuote ? "Sending..." : "Request Quote"}
            </button>
          </form>
        )}
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-col brand-col">
            <h3>Speedman Deliveries</h3>
            <p>
              Your trusted logistics partner in Nairobi. We ensure your parcels
              are delivered with speed, safety, and precision.
            </p>
          </div>
          <div className="footer-col links-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#services">Our Services</a>
              </li>
              <li>
                <a href="#pricing">Coverage & Pricing</a>
              </li>
              <li>
                <a href="#faq">FAQs</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-col contact-col">
            <h4>Contact Info</h4>
            <ul>
              <li>📍 Moi Avenue, Nairobi CBD</li>
              <li>📞 +254 723 765948</li>
              <li>✉️speedmandeliveryservices@gmail.com</li>
              <li>🕒 Mon - Sun: 7:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Speedman Deliveries. All rights reserved.</p>
        </div>
      </footer>

      {/* Booking Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2>Book a Delivery</h2>
            <p className="modal-subtitle">
              Fill out the details below to schedule your pickup.
            </p>

            {selectedZone && (
              <div
                className="selected-zone-display"
                style={{
                  backgroundColor: "#EFF6FF",
                  color: "#1E3A8A",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                }}
              >
                📍 Delivering to: {selectedZone}
              </div>
            )}

            <form
              className="booking-form"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const pickup = formData.get("pickup");
                const dropoff = formData.get("dropoff");
                const size = formData.get("size");
                const phone = formData.get("phone");

                const zoneText = selectedZone
                  ? `*Delivery Route:* ${selectedZone}\n`
                  : "";
                const message = `*New Delivery Booking* 📦\n\n${zoneText}*Pickup Location:* ${pickup}\n*Specific Drop-off:* ${dropoff}\n*Package Size:* ${size}\n*Client Contact:* ${phone}\n\nHi Speedman Deliveries team, please confirm availability for this route.`;

                const clientWhatsAppNumber = "254706053163";
                const encodedMessage = encodeURIComponent(message);
                window.open(
                  `https://wa.me/${clientWhatsAppNumber}?text=${encodedMessage}`,
                  "_blank"
                );
                setIsModalOpen(false);
              }}
            >
              <div className="form-group">
                <label>Pickup Location</label>
                <input
                  type="text"
                  name="pickup"
                  placeholder="e.g., Moi Avenue, CBD"
                  required
                />
              </div>
              <div className="form-group">
                <label>Drop-off Location</label>
                {/* Auto-fill the dropoff if they selected a zone! */}
                <input
                  type="text"
                  name="dropoff"
                  defaultValue={selectedZone ? selectedZone.split(" (")[0] : ""}
                  placeholder="e.g., Kilimani"
                  required
                />
              </div>
              <div className="form-group">
                <label>Package Size</label>
                <select name="size" required defaultValue="">
                  <option value="" disabled>
                    Select package size...
                  </option>
                  <option value="Document">Document / Envelope</option>
                  <option value="Small Box">Small Box (up to 5kg)</option>
                  <option value="Medium Box">Medium Box (5kg - 15kg)</option>
                  <option value="Large Freight">
                    Large Freight (Over 15kg)
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="07XX XXX XXX"
                  required
                />
              </div>
              <button type="submit" className="cta-button primary full-width">
                Confirm Booking on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
