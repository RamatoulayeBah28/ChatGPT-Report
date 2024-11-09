import React from 'react';

export default function FileUploader({ onFileUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = JSON.parse(event.target.result);
        onFileUpload(fileData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Upload your ChatGPT conversations.json file:</label>
      <input type="file" accept=".json" onChange={handleFileChange} className="block w-full" />
    </div>
  );
}
