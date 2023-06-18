import React, { useRef, useEffect, useState } from 'react';
import './Pagination.scss';

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const pageListRef = useRef(null);
  const [visiblePages, setVisiblePages] = useState([]);

  const MAX_PAGES = 500;
  let MAX_VISIBLE_PAGES = 10;

  // Задаємо значення максимально видимих сторінок в залежності від ширини вікна
  if (window.innerWidth < 625) {
    MAX_VISIBLE_PAGES = 6;
  }

  if (window.innerWidth < 349) {
    MAX_VISIBLE_PAGES = 3;
  }

  // Фокусування на активній сторінці після зміни поточної сторінки
  useEffect(() => {
    const activePageElement = pageListRef.current.querySelector('.active');
    if (activePageElement) {
      activePageElement.focus();
    }
  }, [currentPage]);

  // Обробка зміни розміру вікна браузера
  useEffect(() => {
    const handleResize = () => {
      let updatedVisiblePages = 10;

      if (window.innerWidth < 625) {
        updatedVisiblePages = 6;
      }

      if (window.innerWidth < 349) {
        updatedVisiblePages = 3;
      }

      if (updatedVisiblePages !== MAX_VISIBLE_PAGES) {
        setVisiblePages([]);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [MAX_VISIBLE_PAGES]);

  // Генерація видимих сторінок для показу
  useEffect(() => {
    const generateVisiblePages = () => {
      const totalPagesToShow = Math.min(totalPages, MAX_VISIBLE_PAGES, MAX_PAGES);

      let startPage = currentPage - Math.floor(totalPagesToShow / 2);
      if (startPage < 1) {
        startPage = 1;
      }

      let endPage = startPage + totalPagesToShow - 1;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - totalPagesToShow + 1);
      }

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        if (i > 0 && i <= totalPages) {
          pages.push(i);
        }
      }

      setVisiblePages(pages);
    };

    generateVisiblePages();
  }, [currentPage, totalPages, MAX_VISIBLE_PAGES]);

  // Обробка кліку на сторінку
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Обробка кліку на першу сторінку
  const handleFirstPageClick = () => {
    onPageChange(1);
  };

  // Обробка кліку на останню сторінку
  const handleLastPageClick = () => {
    const lastPage = Math.min(totalPages, MAX_PAGES);
    const isLastPageValid = currentPage !== lastPage;
    if (isLastPageValid) {
      onPageChange(lastPage);
    }
  };

  // Обробка кліку на попередню сторінку
  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Обробка кліку на наступну сторінку
  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Рендеринг номерів сторінок
  const renderPageNumbers = () => {
    return visiblePages.map((page) => (
      <li
        key={page}
        className={currentPage === page ? 'active' : ''}
        onClick={() => handlePageClick(page)}
        tabIndex={0}
      >
        {page}
      </li>
    ));
  };

  return (
    <div className="pagination">
      <button onClick={handleFirstPageClick} disabled={currentPage === 1 || totalPages === 1}>
        First page
      </button>
      <button onClick={handlePrevPageClick} disabled={currentPage === 1}>
        ◄
      </button>
      <ul className="pagination_list" ref={pageListRef}>
        {renderPageNumbers()}
      </ul>
      <button onClick={handleNextPageClick} disabled={currentPage === totalPages}>
        ►
      </button>
      <button onClick={handleLastPageClick} disabled={currentPage === totalPages || totalPages === 1}>
        Last page
      </button>
    </div>
  );
};

export default Pagination;
