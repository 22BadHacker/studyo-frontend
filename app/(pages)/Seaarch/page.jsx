'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'

const page = () => {
   const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)

  const fetchResults = async (searchTerm) => {
    if (!searchTerm) return setResults(null)

    const res = await axios.get(`http://localhost:8000/api/search?q=${searchTerm}`, {
        withCredentials : true
    })
    setResults(res.data)
  }

  const debouncedSearch = debounce(fetchResults, 300)

  useEffect(() => {
    debouncedSearch(query)
    return () => debouncedSearch.cancel()
  }, [query])

  return (
    <div className="relative bg-black h-screen py-[200px]">

        <div className="container">

            <input
                type="text"
                className="p-2 rounded w-full"
                placeholder="Search for artists, tracks, albums..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {results && (
                <div className="absolute bg-white rounded mt-1 p-4 w-full shadow-xl z-10">
                {results.user.length > 0 && (
                    <div>
                    <h4 className="font-bold text-sm mb-1">Artists</h4>
                    {results.artists.map((artist) => (
                        <p key={artist.id}>{artist.name}</p>
                    ))}
                    </div>
                )}
                {results.albums.length > 0 && (
                    <div>
                    <h4 className="font-bold text-sm mt-3 mb-1">Albums</h4>
                    {results.albums.map((album) => (
                        <p key={album.id}>{album.title}</p>
                    ))}
                    </div>
                )}
                {results.tracks.length > 0 && (
                    <div>
                    <h4 className="font-bold text-sm mt-3 mb-1">Tracks</h4>
                    {results.tracks.map((track) => (
                        <p key={track.id}>{track.title}</p>
                    ))}
                    </div>
                )}
                </div>
            )}
        </div>
    </div>
  )
}

export default page
