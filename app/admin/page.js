"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const [facilities, setFacilities] = useState([]);
  const [facilityForm, setFacilityForm] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  const fetchUsers = () => {
    API.get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => setMessage("Failed to fetch users."))
      .finally(() => setLoading(false));
  };

  const fetchFacilities = () => {
    API.get("/facilities")
      .then((res) => setFacilities(res.data))
      .catch(() => setMessage("Failed to fetch facilities."));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "ADMIN") {
      router.push("/facilities");
      return;
    }

    fetchUsers();
    fetchFacilities();
  }, [router]);

  const handleAddUser = async () => {
    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }
    try {
      await API.post("/auth/register", form);
      setMessage("User created successfully!");
      setMessageType("success");
      setForm({ name: "", email: "", password: "", role: "STUDENT" });
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data || "Failed to create user.");
      setMessageType("error");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      setMessage("User deleted successfully!");
      setMessageType("success");
      fetchUsers();
    } catch (err) {
      setMessage("Failed to delete user.");
      setMessageType("error");
    }
  };

  const handleAddFacility = async () => {
    if (
      !facilityForm.name ||
      !facilityForm.location ||
      !facilityForm.capacity
    ) {
      setMessage("Please fill in all facility fields.");
      setMessageType("error");
      return;
    }
    try {
      await API.post("/facilities", {
        ...facilityForm,
        capacity: parseInt(facilityForm.capacity),
      });
      setMessage("Facility created successfully!");
      setMessageType("success");
      setFacilityForm({ name: "", location: "", capacity: "" });
      fetchFacilities();
    } catch (err) {
      setMessage(err.response?.data || "Failed to create facility.");
      setMessageType("error");
    }
  };

  const handleDeleteFacility = async (id) => {
    if (!confirm("Are you sure you want to delete this facility?")) return;
    try {
      await API.delete(`/facilities/${id}`);
      setMessage("Facility deleted successfully!");
      setMessageType("success");
      fetchFacilities();
    } catch (err) {
      setMessage("Failed to delete facility.");
      setMessageType("error");
    }
  };

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
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <Navbar activePage="admin" />

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
            Admin Panel
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>
            Manage users of the system
          </p>
        </div>

        {/* Add User Form */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "2rem",
            marginBottom: "2rem",
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
            Add New User
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {[
              {
                label: "Full Name",
                key: "name",
                type: "text",
                placeholder: "John Doe",
              },
              {
                label: "Email",
                key: "email",
                type: "email",
                placeholder: "john@ug.edu.gh",
              },
              {
                label: "Password",
                key: "password",
                type: "password",
                placeholder: "••••••••",
              },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
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
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
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
            ))}
            <div>
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
          </div>

          <button
            onClick={handleAddUser}
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "0.9rem",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
            }}
          >
            Add User +
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "12px",
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
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

        {/* Users List */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "2rem",
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
            All Users ({users.length})
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {users.map((user) => (
              <div
                key={user.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      margin: 0,
                    }}
                  >
                    {user.name}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.8rem",
                      margin: "0.25rem 0 0",
                    }}
                  >
                    {user.email}
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span
                    style={{
                      padding: "0.3rem 0.75rem",
                      borderRadius: "100px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      background:
                        user.role === "ADMIN"
                          ? "rgba(99,102,241,0.2)"
                          : user.role === "LECTURER"
                            ? "rgba(245,158,11,0.2)"
                            : "rgba(16,185,129,0.2)",
                      color:
                        user.role === "ADMIN"
                          ? "#a5b4fc"
                          : user.role === "LECTURER"
                            ? "#fcd34d"
                            : "#6ee7b7",
                      border: `1px solid ${user.role === "ADMIN" ? "rgba(99,102,241,0.3)" : user.role === "LECTURER" ? "rgba(245,158,11,0.3)" : "rgba(16,185,129,0.3)"}`,
                    }}
                  >
                    {user.role}
                  </span>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
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
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Add Facility Form */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "2rem",
            marginTop: "2rem",
            marginBottom: "2rem",
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
            Add New Facility
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {[
              {
                label: "Facility Name",
                key: "name",
                type: "text",
                placeholder: "e.g. Main Auditorium",
              },
              {
                label: "Location",
                key: "location",
                type: "text",
                placeholder: "e.g. Block A",
              },
              {
                label: "Capacity",
                key: "capacity",
                type: "number",
                placeholder: "e.g. 100",
              },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
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
                  {label}
                </label>
                <input
                  type={type}
                  value={facilityForm[key]}
                  onChange={(e) =>
                    setFacilityForm({ ...facilityForm, [key]: e.target.value })
                  }
                  placeholder={placeholder}
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
            ))}
          </div>
          <button
            onClick={handleAddFacility}
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "0.9rem",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
            }}
          >
            Add Facility +
          </button>
        </div>

        {/* Facilities List */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "2rem",
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
            All Facilities ({facilities.length})
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {facilities.map((facility) => (
              <div
                key={facility.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      margin: 0,
                    }}
                  >
                    {facility.name}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.8rem",
                      margin: "0.25rem 0 0",
                    }}
                  >
                    📍 {facility.location} · 👥 Capacity: {facility.capacity}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteFacility(facility.id)}
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
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
