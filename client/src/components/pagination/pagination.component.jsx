import React from "react";
import "./pagination.styles.css";

const Pagination = ({
  firstHandler,
  prevHandler,
  nextHandler,
  lastHandler,
  pagination,
  totalDogs,
  dogsPerPage,
  currentPage,
  pageNumberLimit,
  maxPageNumberLimit,
  minPageNumberLimit,
}) => {
  const numOfPages = [];
  const firstPage = 0;
  let lastPage = 0;
  const amountOfPages = Math.ceil(totalDogs / dogsPerPage);
  for (let i = 0; i < amountOfPages; i++) {
    lastPage = i;
    numOfPages.push(i);
  }

  return (
    <div className="buttons-pag">
      <button
        onClick={() => firstHandler(firstPage)}
        disabled={!currentPage}
        className="button"
      >
        First
      </button>
      <button
        onClick={prevHandler}
        disabled={!currentPage}
        className="button"
      >
        Prev
      </button>
      {numOfPages?.map((page) => {
        if (page < maxPageNumberLimit && page >= minPageNumberLimit) {
          return (
            <button
              className={
                page === currentPage ? "pageButtonActive" : "pageButton"
              }
              id={page}
              key={page}
              onClick={() => pagination(page)}
            >
              {page + 1}
            </button>
          );
        } else {
          return null;
        }
      })}
      <button
        onClick={nextHandler}
        disabled={currentPage === lastPage}      
        className="button"  
      >
        Next
      </button>
      <button
        onClick={() => lastHandler(lastPage)}
        disabled={currentPage === lastPage}        
        className="button"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
