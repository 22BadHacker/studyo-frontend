'use client'
import { useRef, useState } from 'react'

export default function CoverUpload({ onFileSelect }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    onFileSelect(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      onFileSelect(file)
    }
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border border-dashed border-white/70 rounded  hover:border-white/60 transition cursor-pointer p-6 text-center flex items-center justify-center flex-col space-y-3"
    >
      {preview ? (
        <img src={preview} alt="Cover Preview" className="max-h-40 rounded-md shadow" />
      ) : (
        <>
          <p className="text-white/80 font-medium text-sm">Click or drag & drop to upload cover image</p>
          <p className="text-white/40 text-xs">JPG / PNG • Max 5MB</p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
