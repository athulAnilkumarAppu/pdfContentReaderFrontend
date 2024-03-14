"use client";

import { useState } from "react";
import axios from "axios";

const PdfUpload = () => {
  const [pdfFile, setPdfFile] = useState<any>(null);

  const [pdfTextContent, setPdfContent] = useState<any>('')

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];

    const reader = new FileReader();

    reader.onload = () => {
      setPdfFile(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const onUploadClick = async () => {
    await axios
      .post("https://pdfcontentreader-1.onrender.com/pdfReader", {pdfBase64: pdfFile})
      .then((res: any) => {
        if (res) {
          setPdfContent(res.data);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Upload pdf</h1>

      <input type="file" onChange={(e: any) => handleFile(e)} />

      <button onClick={() => onUploadClick()}>Upload</button>



      <div style={{border: '1'}} dangerouslySetInnerHTML={{__html: pdfTextContent}}></div>
    </>
  );
};

export default PdfUpload;
