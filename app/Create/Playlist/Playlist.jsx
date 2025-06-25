'use client'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useAppHook } from '@/context/AppProvider'
import toast from 'react-hot-toast'
import Svg from '@/Component/Svg'
import { GoChevronLeft } from 'react-icons/go'
import Link from 'next/link'

export default function Playlist() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [isPublic, setIsPublic] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  const router = useRouter()
   const { public_id } = useParams();
  const { authToken, user } = useAppHook()

   const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setCoverImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreviewImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreviewImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }


  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('is_public', isPublic ? '1': '0')
    if (coverImage) formData.append('cover_image', coverImage)

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`)
    }

    try {
      await axios.post('http://localhost:8000/api/playlists', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`
        }
      })
      // console.log('Response:', response.data)
      
      // if (response.data.is_public !== undefined) {
      //   toast.success(`Playlist created as ${response.data.is_public ? 'public' : 'private'}`)
      // } else {
      // }
      toast.success(`${name} Playlist Created!`)

      setLoading(false)
      router.push(`/${user.role}/${user?.public_id}`)
    } catch (error){
      console.error('Playlist creation failed:', error)
      toast.error('Failed to create playlist')
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex max-w-[800px] py-5 pt-10 flex-col gap-9">
      <Link href={'/'} className='size-12 mb-1 relative top-5  flex-center text-white bg-main2 rounded-full text-[23px]'><GoChevronLeft/></Link>
      <div className="flex leading-snug flex-col gap-1">
        <p className="text-white/95 font-semibold tracking-wide font-NeueMontreal text-[15px]">Create Playlist</p>
        <h2 className="text-[37px] w-[670px] leading-[1.1] text-white font-NeueMontreal font-semibold">Your vibe, your playlist – mix the sounds that define you!</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pt-3">
        {/* Playlist Name */}
        <div className="flex relative">
          <span className='text-[14px] absolute -top-3 left-2 bg-black px-[6px] text-white font-semibold font-NeueMontreal'>
            Playlist Name
          </span>
          <input
            type="text"
            className="w-full rounded hover:border-white ease-in-out border-white/50 duration-200 border-[1px] bg-transparent font-NeueMontreal outline-none px-2 py-[10px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="flex gap-[6px] flex-col relative">
          <span className='text-[14px] absolute -top-3 left-2 bg-black px-[6px] text-white font-semibold font-NeueMontreal'>
            Description (Optional)
          </span>
          <textarea
            className="min-h-[100px] w-full rounded hover:border-white ease-in-out border-white/50 duration-200 border-[1px] bg-transparent font-NeueMontreal outline-none px-2 py-[10px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's the vibe of this playlist?"
          />
        </div>

            {/* Privacy Toggle */}
            <div className="flex items-center gap-3 relative pt-2">
                <span className='text-[14px] absolute -top-3 left-2 bg-[#000] px-[6px] text-white font-semibold font-NeueMontreal'>
                  Visibility
                </span>
                <label className="relative  inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main"></div>
                  <span className="ml-3 text-sm font-medium text-white/80 font-NeueMontreal">
                    {isPublic ? 'Public' : 'Private'}
                  </span>
                </label>
                <span className="text-xs text-white/40">
                  {isPublic ? 'Anyone can see this playlist' : 'Only you can see this playlist'}
                </span>
              </div>

        {/* Drag-and-Drop Cover Image with Preview */}
        <div
          className={`w-full  rounded hover:border-white ease-in-out border-white/50 duration-200 border-[1px] relative flex-center flex-col h-[240px] text-center ${
            coverImage ? 'border-green-500' : isDragging ? 'border-main' : 'border-white/50'
          } transition cursor-pointer `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={triggerFileInput}
        >
          <span className='text-[15px] z-10 absolute -top-3 left-2 bg-[#000] px-[6px] text-white font-semibold font-NeueMontreal'>
            Cover Image
          </span>
          
          {previewImage ? (
            <div className="relative flex-center overflow-hidden p-4 rounded w-full h-full group">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="size-[90%] rounded-md object-contain absolute "
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                <p className="text-white font-medium mb-2">
                  {coverImage.name}
                </p>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setCoverImage(null)
                    setPreviewImage(null)
                  }}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm"
                >
                  Change Image
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1 items-center p-4">
              {isDragging ? (
                <span className="text-white/80 font-medium text-sm">Drop your image here</span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 mb-2">
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                    <line x1="16" y1="5" x2="22" y2="5"></line>
                    <line x1="19" y1="2" x2="19" y2="8"></line>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                  <span className="text-white/80 font-medium text-sm">Drag & Drop Cover Image Here or Click</span>
                  <span className="text-white/40 text-xs">JPEG / JPG / PNG • Max 5MB</span>
                </>
              )}
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!name || loading}
            className={`w-[160px] border flex-center ${
              !name || loading
                ? 'bg-main/15 text-white/30 border-main/15 cursor-not-allowed' 
                : 'bg-white text-main2 border-white/50 cursor-pointer'
            } h-[55px] font-NeueMontreal font-semibold text-black rounded-full transition`}
          >
            {loading ? <Svg/> : "Create Playlist"}
          </button>
        </div>
      </form>
    </div>
  )
}