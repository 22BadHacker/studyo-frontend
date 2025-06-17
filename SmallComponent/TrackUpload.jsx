'use client'
import { useRef, useState } from 'react'
import { FaMusic } from 'react-icons/fa'

export default function TrackUpload({ onFileSelect }) {
  const inputRef = useRef(null)
  const [fileName, setFileName] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFileName(file.name)
    onFileSelect(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setFileName(file.name)
      onFileSelect(file)
    }
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border border-dashed border-white/70 rounded hover:border-white/60 transition cursor-pointer p-6 text-center flex items-center justify-center flex-col space-y-3"
    >
      <FaMusic className="text-white text-3xl" />
      {fileName ? (
        <p className="text-white/80 font-medium text-sm">{fileName}</p>
      ) : (
        <>
          <p className="text-white/80 font-medium text-sm">Click or drag & drop to upload audio track</p>
          <p className="text-white/40 text-xs">MP3 / WAV • Max 20MB</p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
