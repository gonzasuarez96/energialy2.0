"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { useEffect, useState } from "react";

import axios from 'axios';

import Link from "next/link";
//import getLocalStorage from "../Func/localStorage";

export default function UploadthingButtonMany({onFilesUpload, user}) {
  const [attachments, setAttachments] = useState([]);
   

  const handleFiles = async (cleanRes) => {
     
    console.log(user)
    console.log('props:',onFilesUpload)
    
    try {
      const res = await axios.post("http://localhost:3001/documents", {
        name: onFilesUpload,
        attachment: cleanRes[0],
        companyId: user.company.id,
      });
      console.log('res del servidor:',res.data)
    } catch (error) {
      console.log(error);
    }
  };

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
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            // Do something with the response
            const cleanRes = res.map((file) => ({
              fileName: file.fileName,
              fileSize: file.fileSize,
              fileKey: file.fileKey,
              fileUrl: file.fileUrl
            }))
            handleFiles(cleanRes);
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
