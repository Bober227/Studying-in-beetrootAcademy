import React, { useState, useEffect } from 'react';
import './Header.scss';

const Header = ({ genres, onSearch, onFilterChange, filters }) => {
  const [searchInput, setSearchInput] = useState('');
  const [years, setYears] = useState([]);

  // Обробник зміни значення в полі вводу
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Обробник подання форми пошуку
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchInput);
  };

  // Ефект, який виконується при завантаженні компонента
  useEffect(() => {
    const fetchReleaseDates = async () => {
      try {
        const startYear = 1900;
        const endYear = new Date().getFullYear();
        const releaseDates = [];

        // Створення масиву років від startYear до endYear
        for (let year = startYear; year <= endYear; year++) {
          const dateString = `${year}-01-01`;
          releaseDates.push(dateString);
        }

        // Вибір унікальних років і сортування їх у зворотному порядку
        const uniqueYears = [...new Set(releaseDates.map((date) => new Date(date).getFullYear()))];
        const sortedYears = uniqueYears.sort((a, b) => b - a);
        setYears(sortedYears);
      } catch (error) {
        console.error('Error fetching release dates:', error);
      }
    };

    fetchReleaseDates();
  }, []);

  // Обробник зміни значення фільтра
  const handleFilterChange = (filterName, value) => {
    const updatedFilters = {
      ...filters,
      [filterName]: value,
    };
    onFilterChange(updatedFilters);
  };

  return (
    <div className="header-content">
      <a href="/" className="header-content_logo">
        Movie Search
      </a>
      <form id="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="search-input"
          placeholder="Search for a movie..."
          name="search-input"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button type="submit" id="search-button">
          Search
        </button>
      </form>
      <div className="filters">
       
        {genres.length > 0 && (
          <select
            id="genre"
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="custom-select"
          >
            <option value="">All genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        )}

      
        <select
          id="rating"
          value={filters.rating}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
          className="custom-select"
        >
          <option value="">All ratings</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
          <option value="9">9+</option>
        </select>

        
        <select
          id="year"
          value={filters.year}
          onChange={(e) => handleFilterChange('year', e.target.value)}
          className="custom-select"
        >
          <option value="">All years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
