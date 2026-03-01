"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function BookingsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const fetchBookings = () => {
    API.get("/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    API.delete(`/bookings/${id}`)
      .then(() => fetchBookings())
      .catch((err) => console.error(err));
  };

  const filteredBookings = bookings.filter((b) =>
    filter === "ALL" ? true : b.status === filter,
  );

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
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}
        >
          Loading bookings...
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
            "radial-gradient(ellipse at 60% 80%, rgba(99,102,241,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <Navbar activePage="bookings" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "3rem 2rem",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              color: "#fff",
              fontSize: "2.5rem",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              marginBottom: "0.5rem",
            }}
          >
            Booking History
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>
            {bookings.length} total booking{bookings.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          {["ALL", "CONFIRMED", "CANCELLED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "100px",
                fontSize: "0.825rem",
                fontWeight: "600",
                cursor: "pointer",
                border: "none",
                transition: "all 0.2s",
                background:
                  filter === tab
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "rgba(255,255,255,0.06)",
                color: filter === tab ? "#fff" : "rgba(255,255,255,0.5)",
                boxShadow:
                  filter === tab ? "0 4px 15px rgba(99,102,241,0.3)" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "4rem",
              textAlign: "center",
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.9rem",
            }}
          >
            No {filter !== "ALL" ? filter.toLowerCase() : ""} bookings found.
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  padding: "1.5rem",
                  transition: "border-color 0.3s",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                }
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "12px",
                      background: "rgba(99,102,241,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      flexShrink: 0,
                    }}
                  >
                    🏢
                  </div>
                  <div>
                    <h3
                      style={{
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "1rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {booking.facility?.name}
                    </h3>
                    <div
                      style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                    >
                      <span
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "0.8rem",
                        }}
                      >
                        👤 {booking.user?.name}
                      </span>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "0.8rem",
                        }}
                      >
                        📅 {booking.date}
                      </span>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "0.8rem",
                        }}
                      >
                        🕐 {booking.startTime} – {booking.endTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span
                    style={{
                      padding: "0.35rem 0.85rem",
                      borderRadius: "100px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      background:
                        booking.status === "CONFIRMED"
                          ? "rgba(16,185,129,0.15)"
                          : "rgba(239,68,68,0.15)",
                      color:
                        booking.status === "CONFIRMED" ? "#6ee7b7" : "#fca5a5",
                      border: `1px solid ${booking.status === "CONFIRMED" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                    }}
                  >
                    {booking.status}
                  </span>
                  {booking.status !== "CANCELLED" && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.2)",
                        color: "#fca5a5",
                        padding: "0.35rem 0.85rem",
                        borderRadius: "8px",
                        fontSize: "0.775rem",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
