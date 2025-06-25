'use client';
import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useAppHook } from '@/context/AppProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatePlaylistModal({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { authToken } = useAppHook();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleFileChange = (file) => {
    if (file && file.type.match('image.*')) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileChange(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    if (coverImage) formData.append('cover_image', coverImage);

    try {
      const res = await axios.post('http://localhost:8000/api/playlists', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });
      onCreated(res.data);
      onClose();
      // Reset form
      setName('');
      setCoverImage(null);
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      alert('Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        
        className="fixed inset-0 backdrop-blur-xs z-[9999] bg-black/60 flex items-center justify-center p-4"
      >
        <div 
         
          className="bg-[#111] p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl"
        >
          <div className="flex justify-between items-start mb-6">
            <h1 className='font-NeueMontreal text-white font-bold text-2xl'>Create New Playlist</h1>
            <button 
              onClick={onClose}
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Playlist Name</label>
              <input
                type="text"
                placeholder="Playlist #1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Cover Image</label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              <div 
                onClick={triggerFileInput}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-[1px] border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${isDragging ? 'border-purple-500 bg-white/5' : 'border-white/10 hover:border-white/20'}`}
              >
                {previewImage ? (
                  <div className="relative group">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCoverImage(null);
                          setPreviewImage(null);
                        }}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-white flex items-center gap-2 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                        <line x1="16" y1="5" x2="22" y2="5"></line>
                        <line x1="19" y1="2" x2="19" y2="8"></line>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                      </svg>
                    </div>
                    <p className="text-white/80">
                      {isDragging ? 'Drop your image here' : 'Drag & drop an image or click to browse'}
                    </p>
                    <p className="text-xs text-white/50">Recommended size: 1000x1000px</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !name}
                className={`px-6 py-2.5 font-semibold rounded-full text-main2 transition-all flex items-center gap-2 ${loading || !name ? 'bg-white cursor-not-allowed' : 'bg-green-500 '}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : 'Create Playlist'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatePresence>
  );
}