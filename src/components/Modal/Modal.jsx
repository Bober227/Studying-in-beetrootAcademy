import React, { useEffect, useState } from 'react';
import './Modal.scss';


const apiKey = 'fad018afaf84e97fa01b40811e31ebc0';

const getTrailerUrl = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
const getCountryUrl = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${apiKey}`;
const getCreditsUrl = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

const Modal = ({ movie, onClose }) => {
  // Станові змінні для трейлера, завантаження, країни та акторів фільму
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('');
  const [actors, setActors] = useState([]);

  // Ефект виконується при зміні значення movie
  useEffect(() => {
    const fetchTrailers = async () => {
      if (!movie) return;

      try {
        // Отримання трейлера фільму
        const response = await fetch(getTrailerUrl(movie.id));
        if (response.ok) {
          const { results } = await response.json();
          if (results.length > 0) {
            setTrailer(results[0]);
          }
        } else {
          throw new Error('Failed to fetch movie trailers from TMDb');
        }

        // Отримання країни випуску фільму
        const countryResponse = await fetch(getCountryUrl(movie.id));
        if (countryResponse.ok) {
          const countryData = await countryResponse.json();
          const countryInfo = countryData.results.find((result) => result.iso_3166_1 === 'US');
          if (countryInfo) {
            setCountry(countryInfo.release_dates[0].certification);
          }
        }

        // Отримання інформації про акторів фільму
        const creditsResponse = await fetch(getCreditsUrl(movie.id));
        if (creditsResponse.ok) {
          const creditsData = await creditsResponse.json();
          setActors(creditsData.cast.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch movie trailers from TMDb:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, [movie]);

  // Обробник кліку на вміст модального вікна
  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={`modal ${movie ? 'modal--active' : ''}`}>
      <div className="modal__content" onMouseDown={handleContentClick}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {movie && (
          <div className="modal__details">
            <h2 className="modal__title">{movie.title}</h2>
            <p className="modal__release-date">
              <span>Release Date:</span> {movie?.release_date}
            </p>
            <p className="modal__overview">
              <span>Overview:</span> {movie?.overview || 'No overview available'}
            </p>
            <p className="modal__original-title">
              <span>Original Title:</span> {movie?.original_title}
            </p>
            <p className="modal__vote-average">
              <span>Vote Average:</span> {movie?.vote_average}
            </p>
            <div className="modal__actors">
              <span>Actors:</span>
              <p>{actors.map((actor) => actor.name).join(', ')}</p>
            </div>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : trailer ? (
          <div className="modal__trailer">
            <h3 className="modal__trailer-title">Trailer:</h3>
            <iframe
              title={trailer.name}
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="modal__trailer-not-found">NO TRAILER AVAILABLE FOR THIS FILM</p>
        )}
      </div>
    </div>
  );
};
export default Modal;
