"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function FacilitiesPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/facilities")
      .then((res) => setFacilities(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div
        style={{
          background: "#0a0f1e",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontFamily: "sans-serif",
            fontSize: "1rem",
          }}
        >
          Loading facilities...
        </div>
      </div>
    );

  return (
    <main
      style={{
        background: "#0a0f1e",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      {/* // Then replace the <nav>...</nav> block with: */}
      <Navbar activePage="facilities" />;{/* Header */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "3rem 2.5rem 2rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "2.5rem",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            marginBottom: "0.5rem",
          }}
        >
          Campus Facilities
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>
          Select a facility to check availability and make a booking.
        </p>
      </section>
      {/* Facilities Grid */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 2.5rem 4rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {facilities.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "4rem",
              textAlign: "center",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            No facilities found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {facilities.map((facility) => (
              <div
                key={facility.id}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  padding: "1.75rem",
                  transition:
                    "border-color 0.3s, background 0.3s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                  e.currentTarget.style.background = "rgba(99,102,241,0.08)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(99,102,241,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  🏢
                </div>

                <h2
                  style={{
                    color: "#fff",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    marginBottom: "0.75rem",
                  }}
                >
                  {facility.name}
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "0.85rem" }}>📍</span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {facility.location}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "0.85rem" }}>👥</span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.875rem",
                      }}
                    >
                      Capacity: {facility.capacity}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/facilities/${facility.id}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "0.65rem 1.25rem",
                    borderRadius: "10px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
                  }}
                >
                  Check Availability & Book →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
