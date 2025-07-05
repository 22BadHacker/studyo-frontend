import { useState } from 'react'
import PlaylistModal from './PlaylistModal' // Create this next
import { IoIosAddCircleOutline } from 'react-icons/io'

export default function TrackActions({ trackId }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-white px-3 py-1 rounded-full"
      >
        <IoIosAddCircleOutline />
      </button>

      {showModal && (
        <PlaylistModal trackId={trackId} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
