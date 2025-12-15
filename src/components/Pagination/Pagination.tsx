import React, { useState } from "react";
import { User } from "@/types/types";
import styles from "./paginate.module.scss";

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange, }: PaginationProps) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;
  

  return (
    <div className={styles.paginationWrapper}>
      {/* Left */}
      <p className={styles.showing}>
        Showing <span>{itemsPerPage}</span> out of {totalItems}
      </p>

      {/* Right */}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={page === currentPage ? styles.active : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <span className={styles.ellipsis}>…</span>

        {[totalPages - 1, totalPages].map((page) => (
          <button
            key={page}
            className={page === currentPage ? styles.active : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;
