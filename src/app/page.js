'use client'
import { useState } from 'react';
import FileUploader from './components/FileUploader';
import Report from './components/Report';

export default function Home() {
  const [data, setData] = useState(null);

  const handleFileUpload = (fileData) => {
    setData(fileData);
  };

  return (
    <div className="app-container">
      <h1 className="title">SmartPrint: See Your ChatGPT Footprint Grow Green</h1>
      {!data ? (
        <FileUploader onFileUpload={handleFileUpload} />
      ) : (
        <Report data={data} />
      )}
    </div>
  );
}

