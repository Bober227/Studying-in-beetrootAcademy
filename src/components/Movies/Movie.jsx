import React, { useState, useEffect } from 'react';
import './Movie.scss';
import Modal from '../Modal/Modal';

const apiKey = "fad018afaf84e97fa01b40811e31ebc0";
const baseUrl = "https://api.themoviedb.org/3";
const customPosterUrl = "https://s3-eu-west-1.amazonaws.com/entertainmentie/uploads/2021/08/27144852/generic-movie-poster.jpg?w=170&h=257&q=high";
const MAX_PAGES = 500;


const Movie = ({ searchTerm, currentPage, setTotalPages, showAllMovies, filters, onPageChange }) => {

  // Змінні стану, використовуючи хук useState з React
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Хук useEffect для отримання жанрів при монтажі компонента
  useEffect(() => {
    fetchGenres();
  }, []);

  // Хук useEffect для отримання фільмів при зміні залежностей
  useEffect(() => {
    setMovies([]);
    setTotalPages(0);
    setNotFound(false);
    if (showAllMovies) {
      fetchAllMovies();
    } else if (searchTerm) {
      fetchMovies();
    }
  }, [searchTerm, currentPage, showAllMovies, filters]);

  // Функція для отримання фільмів на основі пошукового запиту і фільтрів
  const fetchMovies = async () => {
    try {
      const filterParams = buildFilterParams();
      const searchParams = `query=${encodeURIComponent(searchTerm)}${filterParams}`;
      const response = await fetch(
        `${baseUrl}/search/movie?api_key=${apiKey}&${searchParams}&page=${currentPage}`
      );
      const data = await response.json();
      if (response.ok) {
        const filteredMovies = data.results.filter(applyFilters);
        const moviesToDisplay = mapMoviesData(filteredMovies);
        setMovies(moviesToDisplay);

        // Обновление количества страниц
        setTotalPages(data.total_pages);

        setNotFound(moviesToDisplay.length === 0);
      } else {
        console.error("Error fetching movies:", response.status);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Функція для отримання всіх фільмів на основі вибраних фільтрів
  const fetchAllMovies = async () => {
    try {
      const filterParams = buildFilterParams();
      const response = await fetch(
        `${baseUrl}/discover/movie?api_key=${apiKey}&page=${currentPage}${filterParams}`
      );
      const data = await response.json();
      if (response.ok) {
        const totalPages = Math.min(data.total_pages, MAX_PAGES);
        const moviesToDisplay = mapMoviesData(data.results);
        setMovies(moviesToDisplay);

        // Обновление количества страниц
        setTotalPages(totalPages);

        setNotFound(moviesToDisplay.length === 0);
      } else {
        console.error("Error fetching movies:", response.status);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };


  // Функція для створення параметрів фільтра на основі вибраних фільтрів
  const buildFilterParams = () => {
    const { rating, genre, year } = filters;
    let filterParams = '';

    if (rating) {
      filterParams += `&vote_average.gte=${rating}`;
    }

    if (genre) {
      filterParams += `&with_genres=${genre}`;
    }

    if (year) {
      filterParams += `&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`;
    }

    return filterParams;
  };

  // Функція для отримання жанрів з API
  const fetchGenres = async () => {
    try {
      const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Функція для відображення отриманих даних про фільми в потрібному форматі
  const mapMoviesData = (moviesData) => {
    return moviesData.map(movie => ({
      ...movie,
      poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : customPosterUrl
    }));
  };

  // Функція для отримання назви жанру за його ідентифікатором
  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre ? genre.name : '';
  };

  // Функція для визначення CSS-класу кольору рейтингу
  const getRatingColorClass = (average) => {
    const roundedAverage = parseFloat(average).toFixed(1);

    if (roundedAverage >= 7) {
      return 'movies_movie_info_average movies_movie_info_average--green';
    } else if (roundedAverage >= 5) {
      return 'movies_movie_info_average movies_movie_info_average--orange';
    } else {
      return 'movies_movie_info_average movies_movie_info_average--red';
    }
  };


  // Функція для застосування фільтрів до фільму
  const applyFilters = (movie) => {
    const { rating, genre, year } = filters;

    if (rating && !isMovieRatingInRange(movie.vote_average, rating)) {
      return false;
    }

    if (genre && !isMovieInGenre(movie.genre_ids, genre)) {
      return false;
    }

    if (year && !isMovieInYearRange(movie.release_date, year)) {
      return false;
    }

    return true;
  };


  // Функція для перевірки, чи потрапляє рейтинг фільму у вибраний діапазон
  const rangeConditions = {
    '6': rating => rating >= 6,
    '7': rating => rating >= 7,
    '8': rating => rating >= 8,
    '9': rating => rating >= 9
  };

  const isMovieRatingInRange = (rating, range) => {
    const condition = rangeConditions[range];
    return condition ? condition(rating) : false;
  };


  // Функція для перевірки, чи належить фільм до вибраного жанру
  const isMovieInGenre = (genreIds, selectedGenre) => {
    return genreIds.includes(parseInt(selectedGenre));
  };

  // Функція для перевірки, чи потрапляє фільм до вибраного діапазону року
  const isMovieInYearRange = (releaseDate, selectedYear) => {
    if (!releaseDate) {
      return false;
    }
    const movieYear = new Date(releaseDate).getFullYear();
    const selectedYearInt = parseInt(selectedYear);
    return movieYear === selectedYearInt;
  };

  // Функція для відкриття модального вікна з деталями обраного фільму
  const openModal = (movieId) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  // Функція для закриття модального вікна
  const closeModal = () => {
    setSelectedMovieId(null);
    setIsModalOpen(false);
  };

  return (
    <div className='movies'>
      {notFound && <div className="movies_not-found">Movie not found</div>}
      <div className='movies_list'>
        {movies.map((movie) => {
          return (
            <div className='movies_movie' key={movie.id}>
              <div className='movies_movie_cover-inner' onClick={() => openModal(movie.id)}>
                <img
                  src={movie.poster_path}
                  alt=""
                  className='movies_movie_cover-inner_banner'
                />
                <div className='movies_movie_cover-inner_banner-darkened'></div>
              </div>
              <div className='movies_movie_info'>
                <div className='movies_movie_info_title'>{movie.title}</div>
                <div className='movies_movie_info_category'>
                  {movie.genre_ids.map((genreId, index) => (
                    <span key={genreId}>
                      {getGenreName(genreId)}
                      {index !== movie.genre_ids.length - 1 && ', '}
                    </span>
                  ))}
                </div>
                <div className={getRatingColorClass(parseFloat(movie.vote_average).toFixed(1))}>
                  {parseFloat(movie.vote_average).toFixed(1)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedMovieId && (
        <Modal movie={movies.find(movie => movie.id === selectedMovieId)} onClose={closeModal} />
      )}
    </div>
  );
};

export default Movie;
