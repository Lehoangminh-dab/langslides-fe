"use client";
import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  Globe,
  FolderOpen,
  Search,
  Plus,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "axios";

export default function ImportWithAI() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    setUploading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col items-center justify-center p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <Upload className="w-8 h-8 text-purple-600" /> Import with AI
        </h1>
        <p className="text-center text-gray-700 mt-2">
          Select the file you&apos;d like to transform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload a file */}
        <div className="bg-purple-100 p-6 rounded-xl shadow-md w-72 text-center">
          <FolderOpen className="w-12 h-12 mx-auto text-purple-600 mb-4" />
          <h2 className="font-semibold text-lg mb-2">Upload a file</h2>
          <ul className="text-sm text-left mb-4">
            <li>✔ Powerpoint PPTX</li>
            <li>✔ Word docs</li>
            <li>✔ PDFs</li>
          </ul>
          <input
            type="file"
            accept=".pptx,.doc,.docx,.pdf"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />

          <label htmlFor="fileInput">
            <Button
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />{" "}
              {uploading ? "Uploading..." : "Choose file"}
            </Button>
          </label>
          {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
        </div>

        {/* Import from Drive */}
        <div className="bg-blue-100 p-6 rounded-xl shadow-md w-72 text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Google_Drive_logo.png"
            alt="Google Drive"
            className="w-12 h-12 mx-auto mb-4"
          />
          <h2 className="font-semibold text-lg mb-2">Import from Drive</h2>
          <ul className="text-sm text-left mb-4">
            <li>✔ Google Slides</li>
            <li>✔ Google Docs</li>
          </ul>
          <Button variant="secondary">
            <Search className="w-4 h-4 mr-2" /> Connect Drive
          </Button>
        </div>

        {/* Import from URL */}
        <div className="bg-teal-100 p-6 rounded-xl shadow-md w-72 text-center">
          <Globe className="w-12 h-12 mx-auto text-teal-600 mb-4" />
          <h2 className="font-semibold text-lg mb-2">Import from URL</h2>
          <ul className="text-sm text-left mb-4">
            <li>✔ Webpages</li>
            <li>✔ Blog posts or articles</li>
            <li>✔ Notion docs (public only)</li>
          </ul>
          <Button variant="secondary">
            <Plus className="w-4 h-4 mr-2" /> Paste URL
          </Button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-6">
        If your file isn't supported, you can also{" "}
        <a href="#" className="underline">
          paste in text
        </a>
      </p>
    </div>
  );
}
