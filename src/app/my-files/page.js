"use client";
import { useEffect, useState } from "react";
import styles from "./files.module.css"; // Import CSS Module

export default function MyFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch("/api/get-files");
        const data = await response.json();

        if (response.ok) {
          setFiles(data.files);
        } else {
          console.error("Error fetching files:", data.error);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  // ✅ Function to trigger file download
  const downloadFile = async (file) => {
    try {
      const response = await fetch(file.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      if (!response.ok) {
        throw new Error("File download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name; // Correct file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>My Files</h1>

      {loading ? (
        <p>Loading...</p>
      ) : files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>File Name</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.key}>
                <td className={styles.td}>{file.name}</td>
                <td className={styles.td}>
                  <button
                    onClick={() => downloadFile(file)}
                    className={styles.button}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
