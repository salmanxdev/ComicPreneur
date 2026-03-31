// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import * as XLSX from "xlsx";

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        console.log("Fetching registrations...");
        const snapshot = await getDocs(collection(db, "registrations"));

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Data fetched:", data);
        setRegistrations(data);
      } catch (err) {
        console.error("Error fetching:", err);
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  // Export to Excel
  const exportExcel = () => {
    try {
      if (registrations.length === 0) {
        alert("No data to export!");
        return;
      }

      const formattedData = registrations.map(reg => ({
        ...reg,
        timestamp: reg.timestamp?.toDate
          ? reg.timestamp.toDate().toLocaleString()
          : reg.timestamp || ""
      }));

      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Registrations");

      XLSX.writeFile(wb, "registrations.xlsx");
    } catch (err) {
      console.error("Export error:", err);
      alert("Error exporting Excel");
    }
  };

  // UI States
  if (loading) return <div style={{padding:"20px"}}>Loading registrations...</div>;

  if (error) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <h3>Error loading data:</h3>
        <pre>{error}</pre>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <button onClick={exportExcel} style={{ marginBottom: "20px" }}>
        Export to Excel
      </button>

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Course</th>
              <th>Branch</th>
              <th>College</th>
              <th>Enrollment No.</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td>{reg.fullName}</td>
                <td>{reg.course}</td>
                <td>{reg.branch}</td>
                <td>{reg.collegeName}</td>
                <td>{reg.enrollmentNo}</td>
                <td>{reg.contactNo}</td>
                <td>{reg.email}</td>

                {/* 🔥 FIXED PART (important) */}
                <td>
                  {reg.timestamp?.toDate
                    ? reg.timestamp.toDate().toLocaleString()
                    : reg.timestamp || "N/A"}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;