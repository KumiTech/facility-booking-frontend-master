"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ activePage }) {
  const router = useRouter();
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav
      style={{
        position: "relative",
        zIndex: 10,
        background: "rgba(10,15,30,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "1rem 2.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
        }}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={34}
          height={34}
          style={{ borderRadius: "8px" }}
        />
        <span style={{ color: "#fff", fontWeight: "700", fontSize: "1rem" }}>
          UG Facility Booking
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <Link
          href="/facilities"
          style={{
            color:
              activePage === "facilities" ? "#fff" : "rgba(255,255,255,0.5)",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: activePage === "facilities" ? "600" : "400",
          }}
        >
          Facilities
        </Link>

        <Link
          href="/bookings"
          style={{
            color: activePage === "bookings" ? "#fff" : "rgba(255,255,255,0.5)",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: activePage === "bookings" ? "600" : "400",
          }}
        >
          My Bookings
        </Link>
        {user?.role === "ADMIN" && (
          <Link
            href="/admin"
            style={{
              color: activePage === "admin" ? "#fff" : "rgba(255,255,255,0.5)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: activePage === "admin" ? "600" : "400",
            }}
          >
            Admin
          </Link>
        )}
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "100px",
                padding: "0.35rem 1rem",
                color: "#a5b4fc",
                fontSize: "0.8rem",
                fontWeight: "600",
              }}
            >
              👤 {user.name} · {user.role}
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#fca5a5",
                padding: "0.35rem 0.85rem",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
