import React, { useState, useEffect } from 'react';
import { db, storage } from '../lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject, getDownloadURL } from 'firebase/storage';
import { FileListProps, FileItem } from '../types';

const FileList: React.FC<FileListProps> = ({ userRole }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, boolean>>({});
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<'notices' | 'rules' | 'documents' | 'minutes' | 'board'>('notices');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'files'));
        const filesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FileItem));
        setFiles(filesList);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleDeleteFile = async (fileId: string, fileName: string) => {
    try {
      await deleteDoc(doc(db, 'files', fileId));
      await deleteObject(ref(storage, `files/${fileName}`));
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEditFileCategory = async (fileId: string, newCategory: string) => {
    try {
      if (!newCategory) return;
      const fileDoc = doc(db, 'files', fileId);
      await updateDoc(fileDoc, { category: newCategory });
      setFiles(prevFiles => prevFiles.map(file => file.id === fileId ? { ...file, category: newCategory as FileItem['category'] } : file));
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev => ({ ...prev, [fileId]: !prev[fileId] }));
  };

  const handleSelectAllFiles = () => {
    const visibleFiles = files.filter(file => file.category === selectedCategory);
    const newSelectedFiles = allSelected ? {} : Object.fromEntries(visibleFiles.map(file => [file.id, true]));
    setSelectedFiles(newSelectedFiles);
    setAllSelected(!allSelected);
  };

  const handleDownloadSelectedFiles = async () => {
    const selectedFileIds = Object.keys(selectedFiles).filter(id => selectedFiles[id]);
    for (const fileId of selectedFileIds) {
      const file = files.find(file => file.id === fileId);
      if (file) {
        const url = await getDownloadURL(ref(storage, `files/${file.name}`));
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = file.name;
        anchor.target = '_blank';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }
    }
  };

  const categories = [
    { key: 'notices' as const, label: 'Notices for Meetings' },
    { key: 'minutes' as const, label: 'Meeting Minutes' },
    { key: 'rules' as const, label: 'Rules and Regulations' },
    { key: 'documents' as const, label: 'Documents' },
    { key: 'board' as const, label: 'Board of Directors' }
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600 mx-auto mb-3"></div>
        <p className="text-gray-600 text-sm">Loading files…</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
      <div className="rounded-md bg-red-50 text-red-700 px-4 py-3">Error: {error}</div>
    </div>
  );

  const filteredFiles = files.filter(file => file.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-left text-gray-900 text-2xl md:text-3xl font-extrabold tracking-tight">Owners’ Area</h2>
        <p className="text-gray-600 text-sm">Find association files by category, download, or manage.</p>
      </div>

      <div className="rounded-xl bg-white ring-1 ring-gray-200 p-4 md:p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setSelectedCategory(key); setSelectedFiles({}); setAllSelected(false); }}
              className={`px-3 py-2 text-sm font-semibold rounded w-full border ${selectedCategory === key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white ring-1 ring-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <button onClick={handleSelectAllFiles} className="inline-flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 py-2 px-3 rounded">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
              {allSelected ? 'Deselect All' : 'Select All'}
            </button>
            <button onClick={handleDownloadSelectedFiles} className="inline-flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 py-2 px-3 rounded">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12"/><path d="m7 12 5 5 5-5"/><path d="M5 21h14"/></svg>
              Download Selected
            </button>
          </div>
        </div>

        {filteredFiles.length === 0 ? (
          <div className="text-gray-500 text-sm">No files available in this section.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredFiles.map(file => (
              <li key={file.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <input type="checkbox" checked={selectedFiles[file.id] || false} onChange={() => handleSelectFile(file.id)} className="h-4 w-4" />
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                    {file.name}
                  </a>
                  <span className="text-xs text-gray-500">({file.category})</span>
                </div>
                {userRole === 'manager' && (
                  <div className="flex items-center gap-2">
                    <select onChange={(e) => handleEditFileCategory(file.id, e.target.value)} value={file.category} className="py-1 px-2 border border-gray-300 rounded text-black">
                      {categories.map(({ key, label }) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                    <button onClick={() => handleDeleteFile(file.id, file.name)} className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M8 6v14"/><path d="M16 6v14"/><path d="M5 6l1-3h12l1 3"/></svg>
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileList;
