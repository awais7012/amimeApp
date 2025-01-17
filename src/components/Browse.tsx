import React, { useEffect, useState, useRef } from 'react';
import { getTopAnime, getPopularMovies } from '../services/api';
import { Play, Info } from 'lucide-react';
import gsap from 'gsap';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
}

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  synopsis: string;
}

export default function Browse() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [movieRes, animeRes] = await Promise.all([
          getPopularMovies(),
          getTopAnime()
        ]);
        setMovies(movieRes.data.results);
        setAnimes(animeRes.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (sliderRef.current && !loading) {
      gsap.fromTo(
        sliderRef.current.children,
        {
          opacity: 0,
          x: 100
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      {movies[0] && (
        <div className="relative h-[80vh] w-full">
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`}
              alt={movies[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 p-12 space-y-4 max-w-2xl">
            <h1 className="text-5xl font-bold">{movies[0].title}</h1>
            <p className="text-lg text-gray-200">{movies[0].overview}</p>
            <div className="flex space-x-4">
              <button className="flex items-center px-6 py-2 bg-white text-black rounded hover:bg-opacity-80 transition">
                <Play className="mr-2" /> Play
              </button>
              <button className="flex items-center px-6 py-2 bg-gray-500/70 text-white rounded hover:bg-gray-500/50 transition">
                <Info className="mr-2" /> More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movies Section */}
      <section className="px-12 py-8">
        <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
        <div ref={sliderRef} className="flex space-x-4 overflow-x-auto pb-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-64">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-36 object-cover rounded transition transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Anime Section */}
      <section className="px-12 py-8">
        <h2 className="text-2xl font-bold mb-4">Top Anime</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {animes.map((anime) => (
            <div key={anime.mal_id} className="flex-none w-64">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full h-36 object-cover rounded transition transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}