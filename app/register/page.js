"use client";

import { useState } from "react";
import API from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        }),
      );
      router.push("/facilities");
    } catch (err) {
      setError(err.response?.data || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        background: "#0a0f1e",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "420px",
          padding: "2rem",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            style={{ borderRadius: "12px", marginBottom: "1rem" }}
          />
          <h1
            style={{
              color: "#fff",
              fontSize: "1.75rem",
              fontWeight: "800",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Create account
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.9rem",
              marginTop: "0.5rem",
            }}
          >
            Join the UG Facility Booking system
          </p>
        </div>

        {/* Form */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "2rem",
          }}
        >
          <div style={{ marginBottom: "1.25rem" }}>
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
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
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

          <div style={{ marginBottom: "1.25rem" }}>
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
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@ug.edu.gh"
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

          <div style={{ marginBottom: "1.25rem" }}>
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
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
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

          <div style={{ marginBottom: "1.5rem" }}>
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
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
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
            >
              <option value="STUDENT" style={{ background: "#0a0f1e" }}>
                Student
              </option>
              <option value="LECTURER" style={{ background: "#0a0f1e" }}>
                Lecturer
              </option>
              <option value="ADMIN" style={{ background: "#0a0f1e" }}>
                Admin
              </option>
            </select>
          </div>

          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                marginBottom: "1.25rem",
                color: "#fca5a5",
                fontSize: "0.875rem",
              }}
            >
              ❌ {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              border: "none",
              padding: "0.75rem",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>

          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.875rem",
              marginTop: "1.25rem",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#a5b4fc",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
