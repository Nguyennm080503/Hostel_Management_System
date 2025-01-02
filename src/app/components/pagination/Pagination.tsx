import React, { useEffect, useState } from "react";

interface PaginationProps<T> {
  itemsPerPage: number;
  items: T[];
  onPageChange: (currentItems: T[]) => void;
}

const RenderPagination: React.FC<PaginationProps<any>> = ({
  itemsPerPage,
  items,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    // Calculate the items for the current page and pass them back to the parent
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    onPageChange(currentItems);
  }, [currentPage, items, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [items.length]);

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 6) {
      // Case 1: Display all pages when total is <= 6
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`px-4 py-2 border rounded-lg cursor-pointer ${
              currentPage === i ? "bg-blue-500 text-white" : "text-gray-900"
            } rounded-full`}
          >
            {i + 1}
          </button>
        );
      }
    } else {
      // Case 2 & 3: Total pages > 6
      if (currentPage <= 2) {
        // Pages near the start (1, 2, 3, 4)
        for (let i = 0; i <= 3; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`px-4 py-2 border rounded-lg cursor-pointer ${
                currentPage === i ? "bg-blue-500 text-white" : "text-gray-900"
              } rounded-full`}
            >
              {i + 1}
            </button>
          );
        }
        pageNumbers.push(<span key="start-ellipsis">...</span>);

        // Pages near the end (8, 9, 10)
        for (let i = totalPages - 3; i < totalPages; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`px-4 py-2 border rounded-lg cursor-pointer ${
                currentPage === i ? "bg-blue-500 text-white" : "text-gray-900"
              } rounded-full`}
            >
              {i + 1}
            </button>
          );
        }
      } else if (currentPage >= totalPages - 4) {
        // Pages near the end (e.g., 7, 8, 9, 10)
        pageNumbers.push(
          <button
            key={0}
            onClick={() => handlePageClick(0)}
            className={`px-4 py-2 border rounded-lg cursor-pointer ${
              currentPage === 0 ? "bg-blue-500 text-white" : "text-gray-900"
            } rounded-full`}
          >
            1
          </button>
        );
        pageNumbers.push(<span key="end-ellipsis">...</span>);

        for (let i = totalPages - 5; i < totalPages; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`px-4 py-2 border rounded-lg cursor-pointer ${
                currentPage === i ? "bg-blue-500 text-white" : "text-gray-900"
              } rounded-full`}
            >
              {i + 1}
            </button>
          );
        }
      } else {
        // Current page in the middle (e.g., page 5 or 6)
        pageNumbers.push(
          <button
            key={0}
            onClick={() => handlePageClick(0)}
            className={`px-4 py-2 border rounded-lg cursor-pointer ${
              currentPage === 0 ? "bg-blue-500 text-white" : "text-gray-900"
            } rounded-full`}
          >
            1
          </button>
        );
        pageNumbers.push(<span key="start-ellipsis">...</span>);

        // Display surrounding pages of the current page
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`px-4 py-2 border rounded-lg cursor-pointer ${
                currentPage === i ? "bg-blue-500 text-white" : "text-gray-900"
              } rounded-full`}
            >
              {i + 1}
            </button>
          );
        }

        pageNumbers.push(<span key="end-ellipsis">...</span>);

        for (let i = totalPages - 3; i < totalPages; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`px-4 py-2 border rounded-lg cursor-pointer ${
                currentPage === i ? "bg-blue-500 text-white" : "text-gray-900"
              } rounded-full`}
            >
              {i + 1}
            </button>
          );
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div
      className={`flex justify-center items-center ${
        items.length <= itemsPerPage ? "hidden" : ""
      }`}
    >
      {totalPages > 1 && (
        <div className="pb-2 space-x-1">
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 0}
            className="px-4 py-2 border rounded-lg cursor-pointer"
          >
            &lt;
          </button>
          {renderPageNumbers()}
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 border rounded-lg cursor-pointer"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default RenderPagination;
