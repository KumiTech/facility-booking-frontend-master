"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
export default function FacilityDetailPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [currentUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    API.get(`/facilities/${id}`).then((res) => setFacility(res.data));
  }, [id]);

  const checkAvailability = () => {
    if (!date) {
      setMessage("Please select a date.");
      setMessageType("error");
      return;
    }
    setLoading(true);
    setAvailableSlots([]);
    setSelectedSlot(null);
    API.get(`/availability?facilityId=${id}&date=${date}`)
      .then((res) => setAvailableSlots(res.data))
      .catch(() => {
        setMessage("Error fetching availability.");
        setMessageType("error");
      })
      .finally(() => setLoading(false));
  };

  const handleBooking = () => {
    if (!selectedSlot) {
      setMessage("Please select a time slot.");
      setMessageType("error");
      return;
    }
    if (!currentUser) {
      setMessage("User not found. Please log in again.");
      setMessageType("error");
      return;
    }

    API.post("/bookings", {
      facility: { id: parseInt(id) },
      user: { id: currentUser.id },
      date,
      startTime: selectedSlot[0],
      endTime: selectedSlot[1],
    })
      .then(() => {
        setMessage("Booking confirmed successfully!");
        setMessageType("success");
        setSelectedSlot(null);
        checkAvailability();
      })
      .catch((err) => {
        setMessage(err.response?.data || "Booking failed.");
        setMessageType("error");
      });
  };

  if (!facility)
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
          Loading...
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
            "radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <Navbar activePage="facilities" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3rem 2rem",
        }}
      >
        {/* Back link */}
        <Link
          href="/facilities"
          style={{
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            fontSize: "0.875rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "2rem",
          }}
        >
          ← Back to Facilities
        </Link>

        {/* Facility Info */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "2rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
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
                fontSize: "1.5rem",
              }}
            >
              🏢
            </div>
            <div>
              <h1
                style={{
                  color: "#fff",
                  fontSize: "1.8rem",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {facility.name}
              </h1>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <span
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem" }}
            >
              📍 {facility.location}
            </span>
            <span
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem" }}
            >
              👥 Capacity: {facility.capacity}
            </span>
          </div>
        </div>

        {/* Check Availability */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "2rem",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "1.2rem",
              fontWeight: "700",
              marginBottom: "1.25rem",
            }}
          >
            Check Availability
          </h2>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: "200px" }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.8rem",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px",
                  padding: "0.65rem 1rem",
                  color: "#fff",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              onClick={checkAvailability}
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                border: "none",
                padding: "0.65rem 1.75rem",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Checking..." : "Check →"}
            </button>
          </div>
        </div>

        {/* Available Slots */}
        {availableSlots.length > 0 && (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "700",
                marginBottom: "1.25rem",
              }}
            >
              Available Slots
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    padding: "0.6rem 0.75rem",
                    borderRadius: "10px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background:
                      selectedSlot === slot
                        ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                        : "rgba(255,255,255,0.06)",
                    border:
                      selectedSlot === slot
                        ? "1px solid transparent"
                        : "1px solid rgba(255,255,255,0.1)",
                    color:
                      selectedSlot === slot ? "#fff" : "rgba(255,255,255,0.6)",
                    boxShadow:
                      selectedSlot === slot
                        ? "0 4px 15px rgba(99,102,241,0.4)"
                        : "none",
                  }}
                >
                  {slot[0]} – {slot[1]}
                </button>
              ))}
            </div>
          </div>
        )}

        {availableSlots.length === 0 && date && !loading && (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "1.5rem",
              textAlign: "center",
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.9rem",
            }}
          >
            No available slots for this date.
          </div>
        )}

        {/* Booking Form */}
        {selectedSlot && (
          <div
            style={{
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "700",
                marginBottom: "1.25rem",
              }}
            >
              Confirm Booking
            </h2>
            <div
              style={{
                background: "rgba(99,102,241,0.15)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                marginBottom: "1.25rem",
                color: "#a5b4fc",
                fontSize: "0.875rem",
              }}
            >
              ⏰ Selected:{" "}
              <strong>
                {selectedSlot[0]} – {selectedSlot[1]}
              </strong>{" "}
              on <strong>{date}</strong>
            </div>

            <button
              onClick={handleBooking}
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                border: "none",
                padding: "0.75rem 2rem",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(16,185,129,0.3)",
              }}
            >
              Confirm Booking ✓
            </button>
          </div>
        )}

        {/* Message */}
        {message && (
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "12px",
              fontSize: "0.875rem",
              background:
                messageType === "success"
                  ? "rgba(16,185,129,0.15)"
                  : "rgba(239,68,68,0.15)",
              border: `1px solid ${messageType === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
              color: messageType === "success" ? "#6ee7b7" : "#fca5a5",
            }}
          >
            {messageType === "success" ? "✅" : "❌"} {message}
          </div>
        )}
      </div>
    </main>
  );
}
