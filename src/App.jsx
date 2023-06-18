import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Movie from './components/Movies/Movie';
import Pagination from './components/Pagination/Pagination';
import Footer from './components/Footer/Footer';

const apiKey = "fad018afaf84e97fa01b40811e31ebc0";
const baseUrl = "https://api.themoviedb.org/3";

const App = () => {
  // Створюємо стани за допомогою useState()
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    rating: '',
    genre: '',
    year: '',
  });
  const [genres, setGenres] = useState([]);

  // Обробник для пошуку фільмів
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Обробник для зміни поточної сторінки
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Обробник для зміни фільтрів
  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setCurrentPage(1);
  };

  // Ефект, який виконується після рендерингу компонента
  useEffect(() => {
    // Викликаємо функцію fetchGenres() для отримання жанрів фільмів
    fetchGenres();
  }, []);

  // Асинхронна функція для отримання жанрів фільмів з API
  const fetchGenres = async () => {
    try {
      // Виконуємо запит до API для отримання списку жанрів
      const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
      const data = await response.json();
      // Зберігаємо отримані жанри у стані genres
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };


  return (
    <div className='app'>
      <div className=' container'>
        <Header
          onSearch={handleSearch} // Передаємо обробник пошуку в Header компонент
          genres={genres} // Передаємо список жанрів у Header компонент
          onFilterChange={handleFilterChange} // Передаємо обробник зміни фільтрів у Header компонент
          filters={filters} // Передаємо поточні фільтри у Header компонент
        />
        <Movie
          searchTerm={searchTerm} // Передаємо пошуковий термін у Movie компонент
          currentPage={currentPage} // Передаємо поточну сторінку у Movie компонент
          setTotalPages={setTotalPages} // Передаємо функцію для встановлення загальної кількості сторінок у Movie компонент
          showAllMovies={searchTerm === ''} // Визначаємо, чи потрібно відображати всі фільми чи застосовувати фільтри
          filters={filters} // Передаємо поточні фільтри у Movie компонент
        />
        <Pagination
          currentPage={currentPage} // Передаємо поточну сторінку у Pagination компонент
          onPageChange={handlePageChange} // Передаємо обробник зміни сторінки у Pagination компонент
          totalPages={totalPages} // Передаємо загальну кількість сторінок у Pagination компонент
        />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
