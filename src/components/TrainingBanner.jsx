import React from "react";
import { useNavigate } from "react-router-dom";

const chips = [
  "RPA Training",
  "AI & GenAI",
  "Vibe Coding",
  "n8n",
  "Manus",
  "Claude",
  "Corporate Workshops",
];

const styles = {
  section: {
    width: "100%",
    background: "linear-gradient(135deg, #010B1D 0%, #185ADB 100%)",
    padding: "100px 20px",
    boxSizing: "border-box",
  },
  inner: {
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
  },
  partnerBadge: {
    display: "inline-block",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "6px 16px",
    borderRadius: "999px",
    marginBottom: "24px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  heading: {
    color: "#ffffff",
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: "600",
    lineHeight: "1.25",
    margin: "0 0 20px 0",
  },
  headingHighlight: {
    color: "#ffffff",
    textDecoration: "underline",
    textDecorationColor: "rgba(255,255,255,0.5)",
    textUnderlineOffset: "4px",
  },
  body: {
    color: "rgba(255, 255, 255, 0.88)",
    fontSize: "clamp(15px, 2vw, 18px)",
    lineHeight: "1.7",
    margin: "0 auto 36px auto",
    maxWidth: "760px",
  },
  chipsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "40px",
  },
  chip: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "500",
    padding: "7px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    letterSpacing: "0.02em",
  },
  button: {
    display: "inline-block",
    padding: "14px 36px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#010B1D",
    background: "#ffffff",
    border: "none",
    borderRadius: "9999px",
    cursor: "pointer",
    letterSpacing: "0.03em",
    transition: "background 0.2s ease, color 0.2s ease",
  },
};

export default function TrainingBanner() {
  const navigate = useNavigate();

  const handleButtonHover = (e, isHover) => {
    e.currentTarget.style.background = isHover
      ? "rgba(255, 255, 255, 0.9)"
      : "#ffffff";
  };

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        {/* Microsoft Partner Badge */}
        <div data-aos="fade-up">
          <span style={styles.partnerBadge}>Microsoft Official Partner</span>
        </div>

        {/* Heading */}
        <h2 style={styles.heading} data-aos="fade-up" data-aos-delay="50">
          We Are a{" "}
          <span style={styles.headingHighlight}>Microsoft Official Partner</span>{" "}
          — We Train Your Team Too
        </h2>

        {/* Body text */}
        <p style={styles.body} data-aos="fade-up" data-aos-delay="100">
          From UiPath &amp; Power Automate RPA training to AI &amp; GenAI
          workshops and corporate leadership programs — Symprio delivers
          practical, hands-on training that builds real capability.
        </p>

        {/* Training chips */}
        <div
          style={styles.chipsWrapper}
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {chips.map((chip) => (
            <span key={chip} style={styles.chip}>
              {chip}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <div data-aos="fade-up" data-aos-delay="200">
          <button
            style={styles.button}
            onClick={() => navigate("/training")}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            View All Training Programs &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
