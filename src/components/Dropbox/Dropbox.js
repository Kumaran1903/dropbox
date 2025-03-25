"use client";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Link from "next/link";
import styles from "./Dropbox.module.css";

export const Dropbox = ({ session }) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0 || uploading) return; // Prevent upload if already uploading
      setUploading(true);
      setMessage("Uploading...");

      const file = acceptedFiles[0];
      const userId = session?.user?.id || session?.user?.email; // Use user ID or email as folder name

      try {
        // ✅ Request presigned URL from backend API with userId
        const response = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            fileName: file.name,
            fileType: file.type,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to get upload URL: ${await response.text()}`);
        }

        const { uploadUrl } = await response.json();

        // ✅ Upload file to AWS S3
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (uploadResponse.ok) {
          setMessage("✅ File uploaded successfully!");
        } else {
          throw new Error("Upload to S3 failed");
        }
      } catch (error) {
        console.error("Upload Error:", error);
        setMessage("❌ Upload failed. Try again.");
      } finally {
        setUploading(false);

        // Hide the message after 2 seconds
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    },
    [uploading, session]
  ); // Prevents re-triggering while uploading

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    disabled: uploading, // Prevents further uploads while uploading
  });

  return (
    <div>
      {session?.user ? (
        <>
          <div
            {...getRootProps()}
            className={`${styles.dropzone} ${uploading ? styles.disabled : ""}`}
          >
            <input {...getInputProps()} disabled={uploading} />
            <p>
              {uploading
                ? "Uploading..."
                : "Drag & drop a file here, or click to select one"}
            </p>
          </div>
          {message && <p className={styles.message}>{message}</p>}{" "}
          {/* Message disappears after 2 seconds */}
        </>
      ) : (
        <Link className={styles.btn} href={"/login"}>
          <span>Sign up for free</span>
          <Image src="/right_arrow.png" height={25} width={25} alt="arrow" />
        </Link>
      )}
    </div>
  );
};
