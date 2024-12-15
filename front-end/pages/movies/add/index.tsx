'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Movie, Genre } from '../../../types'
import MovieService from '../../../services/MovieService'
import MediaService from '../../../services/MediaService'
import Header from '../../../components/header'

export default function AddMovie() {
  const router = useRouter()
  const [newMovie, setNewMovie] = useState<Movie>({
    genres: [],
    type: "MOVIE"
  })
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genres = await MediaService.getGenres()
        setGenres(genres)
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    getGenres()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewMovie(prevState => ({
      ...prevState,
      [name]: name === "genres" ? value.split(",") as Genre[] : value
    }))
  }

  const handleGenreToggle = (genre: Genre) => {
    setNewMovie(prevState => {
      const updatedGenres = prevState.genres.includes(genre)
        ? prevState.genres.filter(g => g !== genre)
        : [...prevState.genres, genre]
      return { ...prevState, genres: updatedGenres }
    })
  }

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await MovieService.createMovie(newMovie as Movie)
      router.push('/movies')
    } catch (error) {
      console.error('Error adding movie:', error)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-8">
              Add a movie to the application
            </h1>
            <form onSubmit={handleAddMovie} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newMovie.title}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <label htmlFor="director" className="block text-sm font-medium text-gray-700 mb-1">Director:</label>
                <input
                  type="text"
                  id="director"
                  name="director"
                  value={newMovie.director}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={newMovie.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="block w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700 mb-1">Release Year:</label>
                  <input
                    type="number"
                    id="releaseYear"
                    name="releaseYear"
                    placeholder="YYYY"
                    value={newMovie.releaseYear}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes):</label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={newMovie.duration}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Genres:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => handleGenreToggle(genre)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out ${
                        newMovie.genres.includes(genre)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-lg font-extrabold text-white bg-[#1429b1] hover:bg-[#007bff]"
                >
                  Add movie
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

