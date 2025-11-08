import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { UploadFileProps } from '../types';

const UploadFile: React.FC<UploadFileProps> = ({ token, role, onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<'notices' | 'rules' | 'documents' | 'minutes' | 'board'>('notices');
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
    setSuccess(null);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as 'notices' | 'rules' | 'documents' | 'minutes' | 'board');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const storageRef = ref(storage, `files/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'files'), {
        name: file.name,
        url: downloadURL,
        category: category
      });

      onFileUpload?.();
      setSuccess('File uploaded successfully!');
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  if (role !== 'manager') {
    return <div className="text-red-500 text-center mt-4">Access denied: Managers only</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h2 className="text-left text-gray-900 text-3xl md:text-4xl font-extrabold tracking-tight">Upload Files</h2>
        </div>

        <div className="max-w-3xl w-full mx-auto rounded-2xl bg-white ring-1 ring-gray-200 p-6 md:p-8">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">File</label>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="block w-full text-sm text-gray-700 
                file:mr-3 file:py-2 file:px-4 file:rounded-md 
                file:border file:border-gray-300 file:text-sm file:font-semibold 
                file:cursor-pointer file:bg-white file:text-gray-800 hover:file:bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-800">Category</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full border border-gray-300 cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="notices">Notices for Meetings</option>
              <option value="minutes">Meeting Minutes</option>
              <option value="rules">Rules and Regulations</option>
              <option value="documents">Documents</option>
              <option value='board'>Board of Directors</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleUpload} 
              disabled={uploading} 
              className="inline-flex cursor-pointer items-center gap-2 bg-gray-900 hover:bg-black text-white 
                font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12"/><path d="m7 12 5 5 5-5"/><path d="M5 21h14"/></svg>
              {uploading ? 'Uploading…' : 'Upload'}
            </button>
            {success && <span className="text-green-600 text-sm">{success}</span>}
            {error && <span className="text-red-600 text-sm">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
