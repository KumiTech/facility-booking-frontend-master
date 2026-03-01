"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className="min-h-screen"
      style={{ background: "#0a0f1e", fontFamily: "'Georgia', serif" }}
    >
      {/* Animated background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <Navbar activePage="home" />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "8rem 2rem 4rem",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "100px",
            padding: "0.35rem 1rem",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              color: "#a5b4fc",
              fontSize: "0.8rem",
              fontFamily: "sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            🏛️ University of Ghana
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: "800",
            color: "#fff",
            lineHeight: "1.1",
            marginBottom: "1.5rem",
            letterSpacing: "-0.03em",
            maxWidth: "800px",
          }}
        >
          Reserve Campus <br />
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #a78bfa, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Facilities Instantly
          </span>
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "1.1rem",
            maxWidth: "520px",
            lineHeight: "1.7",
            marginBottom: "2.5rem",
            fontFamily: "sans-serif",
          }}
        >
          Book lecture halls, labs, and auditoriums with real-time availability
          — built for the UG community.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/facilities"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              textDecoration: "none",
              padding: "0.85rem 2rem",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "0.95rem",
              fontFamily: "sans-serif",
              boxShadow: "0 8px 30px rgba(99,102,241,0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Browse Facilities →
          </Link>
          <Link
            href="/bookings"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              textDecoration: "none",
              padding: "0.85rem 2rem",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "0.95rem",
              fontFamily: "sans-serif",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            View Bookings
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            marginTop: "4rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            ["10+", "Facilities"],
            ["30min", "Slot Intervals"],
            ["24/7", "Availability"],
          ].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff" }}
              >
                {num}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "sans-serif",
                  marginTop: "2px",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          padding: "0 2rem 6rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {[
          {
            img: "/calendar.png",
            title: "Easy Scheduling",
            desc: "View 30-minute availability slots and book your facility instantly without any hassle.",
          },
          {
            img: "/lock.png",
            title: "Conflict-Free",
            desc: "Our system automatically detects and prevents double bookings in real time.",
          },
          {
            img: "/clipboard.png",
            title: "Booking History",
            desc: "Track all your confirmed and cancelled bookings with full status updates.",
          },
        ].map(({ img, title, desc }) => (
          <div
            key={title}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "2rem",
              transition: "border-color 0.3s, background 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
              e.currentTarget.style.background = "rgba(99,102,241,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "rgba(99,102,241,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <Image src={img} alt={title} width={28} height={28} />
            </div>
            <h3
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.9rem",
                fontFamily: "sans-serif",
                lineHeight: "1.6",
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
          padding: "1.5rem",
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.8rem",
          fontFamily: "sans-serif",
        }}
      >
        © 2026 University of Ghana · Campus Facility Booking System
      </footer>
    </main>
  );
}
