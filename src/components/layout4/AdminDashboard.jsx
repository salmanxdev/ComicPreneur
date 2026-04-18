// src/components/layout4/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // 🔥 Fetch Data
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const q = query(collection(db, "registrations"), orderBy("fullName"));
        const snapshot = await getDocs(q);

        let data = snapshot.docs.map(doc => ({
          docId: doc.id,
          ...doc.data()
        }));

        data.sort((a, b) =>
          (a.fullName || "").localeCompare(b.fullName || "")
        );

        setRegistrations(data);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  // 📊 Export Excel
  const exportExcel = () => {
    if (registrations.length === 0) {
      alert("No data to export!");
      return;
    }

    const formattedData = registrations.map((reg, index) => ({
      "S.No": index + 1,
      "Full Name": reg.fullName || "",
      "Contact Number": reg.contactNo || "",
      "Email Address": reg.email || "",
      "Semester": reg.semester || "",
      "Branch": reg.branch || "",
      "Course": reg.course || "",
      "College": reg.collegeName || "",
      "Enrollment": reg.enrollmentNo || "",
      "ID": reg.docId || "",
      "Timestamp": reg.timestamp?.toDate
        ? reg.timestamp.toDate().toLocaleString()
        : reg.timestamp || "",
      "Payment Screenshot URL": reg.paymentScreenshotUrl || ""
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData, {
      header: [
        "S.No",
        "Full Name",
        "Contact Number",
        "Email Address",
        "Semester",
        "Branch",
        "Course",
        "College",
        "Enrollment",
        "ID",
        "Timestamp",
        "Payment Screenshot URL"
      ]
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");

    XLSX.writeFile(wb, "registrations.xlsx");
  };

  // 📥 DOWNLOAD ALL SCREENSHOTS (🔥 MAIN FEATURE)
  const downloadAllScreenshots = async () => {
    const zip = new JSZip();
    const folder = zip.folder("payment_screenshots");

    const valid = registrations.filter(r => r.paymentScreenshotUrl);

    if (valid.length === 0) {
      alert("No screenshots found!");
      return;
    }

    const batchSize = 10;
    let index = 0;

    try {
      while (index < valid.length) {
        const batch = valid.slice(index, index + batchSize);

        await Promise.all(
          batch.map(async (reg, i) => {
            const url = reg.paymentScreenshotUrl;

            const response = await fetch(url);
            const blob = await response.blob();

            // 🔥 Clean name
            let name = reg.fullName || `user_${index + i}`;
            name = name
              .replace(/[^a-zA-Z0-9]/g, "_")
              .replace(/_+/g, "_");

            // 🔥 Unique filename
            const fileName = `${name}_${reg.contactNo || index + i}.jpg`;

            folder.file(fileName, blob);
          })
        );

        index += batchSize;
        setProgress(index);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "payment_screenshots_named.zip");

      alert("Download complete!");
    } catch (err) {
      console.error(err);
      alert("Download failed!");
    }
  };

  // ⏳ Loading
  if (loading) {
    return <div style={{ padding: "20px" }}>Loading registrations...</div>;
  }

  // ❌ Error
  if (error) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <h3>Error:</h3>
        <pre>{error}</pre>
      </div>
    );
  }

  // ✅ UI
  return (
    <div
      className="admin-dashboard"
      style={{
        background: "white",
        color: "black",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h1>Admin Dashboard</h1>

      {/* 🔥 Buttons */}
      <button onClick={exportExcel} style={{ marginRight: "10px" }}>
        Export to Excel
      </button>

      <button onClick={downloadAllScreenshots}>
        Download All Screenshots
      </button>

      {/* 🔥 Progress */}
      {progress > 0 && (
        <p>
          Downloading: {progress} /{" "}
          {registrations.filter(r => r.paymentScreenshotUrl).length}
        </p>
      )}

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "20px"
          }}
        >
          <thead>
            <tr>
              <th>S.No</th>
              <th>Full Name</th>
              <th>Course</th>
              <th>Branch</th>
              <th>Semester</th>
              <th>College</th>
              <th>Enrollment</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Doc ID</th>
              <th>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((reg, index) => (
              <tr key={reg.docId}>
                <td>{index + 1}</td>
                <td>{reg.fullName}</td>
                <td>{reg.course}</td>
                <td>{reg.branch}</td>
                <td>{reg.semester || "N/A"}</td>
                <td>{reg.collegeName}</td>
                <td>{reg.enrollmentNo}</td>
                <td>{reg.contactNo}</td>
                <td>{reg.email}</td>
                <td>{reg.docId}</td>
                <td>
                  {reg.timestamp?.toDate
                    ? reg.timestamp.toDate().toLocaleString()
                    : "N/A"}
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