import React from "react";
import styles from "./paginate.module.scss";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { getPageNumbers } from "@/hooks/usePaginate";

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = getPageNumbers(currentPage, totalPages);

  if (totalPages <= 1) return null;
  return (
    <div className={styles.paginationWrapper}>
      <p className={styles.showing}>
        Showing{" "}
        <span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </span>{" "}
        out of {totalItems}
      </p>
      <div className={styles.pagination}>
        <button
          className={styles.prev}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <MdKeyboardArrowLeft size={14} />
        </button>

        {pages.map((page, index) => {
  if (page === "...") {
    return (
      <span
        key={`ellipsis-${index}`}
        className={styles.ellipsis}
      >
        …
      </span>
    );
  }

  return (
    <button
      key={`page-${page}`}
      className={page === currentPage ? styles.active : styles.pageButton}
      onClick={() => onPageChange(page as number)}
    >
      {page}
    </button>
  );
})}

        <button
          className={styles.next}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <MdKeyboardArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
