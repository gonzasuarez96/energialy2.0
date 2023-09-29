"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { useState } from "react";

import Link from "next/link";

export default function UploadthingButtonMany() {
  const [attachments, setAttachments] = useState([]);

  const title = attachments.length ? (
    <>
      <p className="mt-2">{attachments.length} archivos adjuntados 🎉</p>
    </>
  ) : null;

  const fileList = (
    <>
      {title}
      <ul>
        {attachments?.map((attachment) => (
          <li key={attachment.fileKey}>
            <Link href={attachment.fileUrl} target="_blank">
              {attachment.fileName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <main className="flex flex-col items-center justify-center">
      <UploadButton
        endpoint="strictPdfAttachment"
        onClientUploadComplete={(res) => {
          if (res) {
            // Do something with the response
            const cleanRes = res.map((file) => ({
              fileName: file.fileName,
              fileSize: file.fileSize,
              fileKey: file.fileKey,
              fileUrl: file.fileUrl
            }))
            setAttachments(cleanRes);
          }
          // alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {fileList}
    </main>
  );
}
