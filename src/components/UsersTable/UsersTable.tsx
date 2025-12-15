"use client";

import React, { useState, useEffect } from "react";
import styles from "./table.module.scss";
import { User } from "@/types/types";
import { MdFilterList } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { BiUserX, BiUserCheck } from "react-icons/bi";
import { PiEye } from "react-icons/pi";
import Pagination from "../Pagination/Pagination";

interface Props {
  users: User[];
}
const tableItems = [
  "Organisation",
  "Username",
  "email",
  "phone number",
  "date joined",
  "status",
];

const UsersTable = ({ users }: Props) => {
  const router = useRouter();
  const actionRef = React.useRef<HTMLTableDataCellElement | null>(null);
  const [usersData, setUsersData] = useState(users);
  const [showActions, setShowActions] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const capitalizeText = (text: string) =>
    text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  const handleClickDots = (id: number) => {
    setShowActions((prev) => (prev === id ? null : id));
  };

  const USERS_STORAGE_KEY = "lendsqr_users";

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
  }, [usersData]);

  useEffect(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

    if (storedUsers) {
      setUsersData(JSON.parse(storedUsers));
    } else {
      setUsersData(users);
    }
  }, []);

  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedUsers = usersData.slice(startIndex, endIndex);

  const viewUser = (id: number) => {
    router.push(`/dashboard/users/${id}`);
  };

  const blacklistUser = (id: number) => {
    setUsersData((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: "Blacklisted" } : user
      )
    );
    setShowActions(null);
  };

  const activateUser = (id: number) => {
    setUsersData((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: "Active" } : user
      )
    );
    setShowActions(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        setShowActions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.userTable}>
        <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            {tableItems.map((item, i) => (
              <th key={i}>
                <h4>{item}</h4>
                <MdFilterList size={16} color="#545F7D" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>{capitalizeText(user.organization)}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>+234-{user.phone}</td>
              <td>{user.dateJoined}</td>
              <td className={styles.userStatus}>
                <span className={`${styles.status} ${styles[user.status]}`}>
                  {user.status}
                </span>
                <span
                  onClick={() => handleClickDots(user.id)}
                  className={styles.threeDots}
                >
                  <BsThreeDotsVertical />
                </span>
              </td>
              {showActions === user.id && (
                <td ref={actionRef} className={styles.actionMenu}>
                  <button onClick={() => viewUser(user.id)}>
                    <PiEye />
                    View Details
                  </button>

                  {user.status !== "Blacklisted" && (
                    <button onClick={() => blacklistUser(user.id)}>
                      <BiUserX />
                      Blacklist User
                    </button>
                  )}

                  {(user.status === "Inactive" ||
                    user.status === "Pending") && (
                    <button onClick={() => activateUser(user.id)}>
                      <BiUserCheck />
                      Activate User
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    <Pagination
        totalItems={usersData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UsersTable;
