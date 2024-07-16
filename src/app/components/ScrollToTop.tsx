"use client";
import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check if button should be visible
  const toggleVisibility = () => {
    const scrolled =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "15px",
          backgroundColor: "#1ec15f", // green background
          color: "white", // white arrow
          borderRadius: "50%", // makes it a circle
          border: "none",
          cursor: "pointer",
          fontSize: "24px", // adjust if needed
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // optional shadow for a bit of elevation effect
          zIndex: 1000, // making sure it's on top of other elements
          width: "40px",
          height: "40px",
        }}
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
