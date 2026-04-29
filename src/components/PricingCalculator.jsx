import React, { useState } from "react";
import { deliveryRates } from "../data/pricingData";

export default function PricingCalculator({ onBookRoute }) {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  // When a user changes the route, we must reset the destination
  const handleRouteChange = (e) => {
    setSelectedRoute(e.target.value);
    setSelectedDestination("");
  };

  // Find the locations that belong to the currently selected route
  const activeRouteData = deliveryRates.find((r) => r.route === selectedRoute);
  const activeDestinations = activeRouteData ? activeRouteData.locations : [];

  // Find the price for the exact destination selected
  const currentPrice = activeDestinations.find(
    (d) => d.name === selectedDestination
  )?.price;

  return (
    <section
      id="pricing"
      style={{
        padding: "80px 20px",
        backgroundColor: "#f8fafc",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
          borderTop: "6px solid #ef4444", // Speedman Red top border
          width: "100%",
          maxWidth: "450px",
          padding: "40px 30px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              color: "#1e3a8a",
              fontSize: "1.5rem",
              fontWeight: "800",
              margin: "0 0 8px 0",
              letterSpacing: "0.5px",
            }}
          >
            Coverage & Pricing
          </h2>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.95rem" }}>
            Fare Calculator
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          {/* Dropdown 1: Select Route */}
          <div>
            <label
              style={{
                display: "block",
                color: "#1e3a8a",
                fontWeight: "600",
                fontSize: "0.9rem",
                marginBottom: "8px",
              }}
            >
              Select Route
            </label>
            <select
              value={selectedRoute}
              onChange={handleRouteChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "1rem",
                color: "#334155",
                backgroundColor: "#fff",
                outline: "none",
                cursor: "pointer",
                appearance: "auto",
              }}
            >
              <option value="" disabled>
                Choose a route...
              </option>
              {deliveryRates.map((routeGroup, index) => (
                <option key={index} value={routeGroup.route}>
                  {routeGroup.route}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown 2: Select Destination */}
          <div>
            <label
              style={{
                display: "block",
                color: "#1e3a8a",
                fontWeight: "600",
                fontSize: "0.9rem",
                marginBottom: "8px",
              }}
            >
              Select Destination
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              disabled={!selectedRoute} // Locked until a route is picked
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "1rem",
                color: "#334155",
                backgroundColor: !selectedRoute ? "#f1f5f9" : "#fff",
                outline: "none",
                cursor: !selectedRoute ? "not-allowed" : "pointer",
                appearance: "auto",
              }}
            >
              <option value="" disabled>
                Choose a destination...
              </option>
              {activeDestinations.map((loc, idx) => (
                <option key={idx} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Result Box (Matches your image exactly) */}
          <div
            style={{
              marginTop: "10px",
              padding: "25px",
              backgroundColor: "#f0fdf4", // Light green tint
              border: "1px dashed #0f766e", // Teal dashed border
              borderRadius: "12px",
              textAlign: "center",
              minHeight: "115px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                color: "#0f766e",
                fontWeight: "700",
                fontSize: "0.85rem",
                margin: "0 0 10px 0",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Total Estimated Fare
            </p>
            <h1
              style={{
                color: "#ef4444",
                fontSize: "2.5rem",
                fontWeight: "900",
                margin: "0",
              }}
            >
              {currentPrice ? `KES ${currentPrice}` : "---"}
            </h1>
          </div>

          {/* Proceed to Book Button (Only appears when a price is found) */}
          {currentPrice && (
            <button
              onClick={() =>
                onBookRoute(`${selectedDestination} (KES ${currentPrice})`)
              }
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#1e3a8a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                marginTop: "10px",
                boxShadow: "0 4px 6px -1px rgba(30, 58, 138, 0.2)",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
            >
              Continue to Booking
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
