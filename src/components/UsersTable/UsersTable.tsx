/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import styles from "./table.module.scss";
import { User, UserFilters } from "@/types/types";
import { MdFilterList } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { BiUserX, BiUserCheck } from "react-icons/bi";
import { PiEye } from "react-icons/pi";
import Pagination from "../Pagination/Pagination";
import FilterModal from "../Modals/FilterModal/FilterModal";
import EmptyData from "../EmptyData/EmptyData";

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
  const actionRef = React.useRef<HTMLTableCellElement | null>(null);
  const actionMobileRef = React.useRef<HTMLTableCellElement | null>(null);
  const [usersData, setUsersData] = useState(users);
  const [showActions, setShowActions] = useState<number | null>(null);
  const [showMobileActions, setShowMobileActions] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<UserFilters>({
    organisation: "",
    fullName: "",
    email: "",
    phone: "",
    status: "",
    dateJoined: "",
  });
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const updateFilter = (key: keyof UserFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      organisation: "",
      fullName: "",
      email: "",
      phone: "",
      status: "",
      dateJoined: "",
    });
    setCurrentPage(1);
  };

  const filteredUsers = usersData.filter((user) => {
    const matchesOrganisation = filters.organisation
      ? user.organization
          .toLowerCase()
          .includes(filters.organisation.toLowerCase())
      : true;

    const matchesName = filters.fullName
      ? user.profile.fullName
          .toLowerCase()
          .includes(filters.fullName.toLowerCase())
      : true;

    const matchesEmail = filters.email
      ? user.email.toLowerCase().includes(filters.email.toLowerCase())
      : true;

    const matchesPhone = filters.phone
      ? user.profile.phone.includes(filters.phone)
      : true;

    const matchesStatus = filters.status
      ? user.status === filters.status
      : true;

    const matchesDateJoined = filters.dateJoined
      ? user.dateJoined.startsWith(filters.dateJoined)
      : true;

    return (
      matchesOrganisation &&
      matchesName &&
      matchesEmail &&
      matchesPhone &&
      matchesStatus &&
      matchesDateJoined
    );
  });

  const organisations = Array.from(
    new Set(usersData.map((user) => user.organization))
  );

  const capitalizeText = (text: string) =>
    text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  const handleClickDots = (id: number) => {
    setShowActions((prev) => (prev === id ? null : id));
  };

  const handleClickMobileDots = (id: number) => {
    setShowMobileActions((prev) => (prev === id ? null : id));
  };

  const usersStorageKey = "lendsqr_users";

  useEffect(() => {
    localStorage.setItem(usersStorageKey, JSON.stringify(usersData));
  }, [usersData]);

  useEffect(() => {
    const storedUsers = localStorage.getItem(usersStorageKey);

    if (storedUsers) {
      setUsersData(JSON.parse(storedUsers));
    } else {
      setUsersData(users);
    }
  }, [users]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (count: number) => {
    setItemsPerPage(count);
    setCurrentPage(1);
  };

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
      if (
        actionMobileRef.current &&
        !actionMobileRef.current.contains(event.target as Node)
      ) {
        setShowMobileActions(null);
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
                  <MdFilterList
                    size={16}
                    color="#545F7D"
                    onClick={toggleFilter}
                  />
                </th>
              ))}
            </tr>
          </thead>
          {showFilter && (
            <span className={styles.filterUsers}>
              <FilterModal
                filters={filters}
                onChange={updateFilter}
                onReset={resetFilters}
                onApply={() => setShowFilter(false)}
                organisations={organisations}
              />
            </span>
          )}
          <tbody className={styles.tableBody}>
            {paginatedUsers.length === 0 ? (
              <EmptyData text="Your search didn't return any result" />
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{capitalizeText(user.organization)}</td>
                  <td>{user.username}</td>
                  <td className={styles.email}>{user.email}</td>
                  <td>0{user.phone}</td>
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
                    {showActions === user.id && (
                      <span
                        onClick={(e) => e.stopPropagation()}
                        ref={actionRef}
                        className={styles.actionMenu}
                      >
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
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.mobileTable}>
        <div className={styles.filter}>
          <h6>Filter</h6>
          <MdFilterList size={16} color="#545F7D" onClick={toggleFilter} />
          {showFilter && (
            <span className={styles.filterUsers}>
              <FilterModal
                filters={filters}
                onChange={updateFilter}
                onReset={resetFilters}
                onApply={() => setShowFilter(false)}
                organisations={organisations}
              />
            </span>
          )}
        </div>
        {paginatedUsers.length === 0 ? (
          <div className={styles.emptyState}>
            <EmptyData text="Your search didn't return any result" />
          </div>
        ) : (
          paginatedUsers.map((user) => (
            <div className={styles.user} key={user.id}>
              <div className={styles.userDetails}>
                <h2>{user.profile.fullName}</h2>
                <p>{user.email}</p>
                <p>0{user.phone}</p>
                <h4>{user.organization}</h4>
              </div>

              <div className={styles.userStatus}>
                <div className={styles.statusCheck}>
                  <span className={`${styles.status} ${styles[user.status]}`}>
                    {user.status}
                  </span>
                  <p>{user.dateJoined}</p>
                </div>

                <span
                  onClick={() => handleClickMobileDots(user.id)}
                  className={styles.threeDots}
                >
                  <BsThreeDotsVertical size={12} color="#545F7D" />
                </span>
              </div>

              {showMobileActions === user.id && (
                <span ref={actionRef} className={styles.actionMenu}>
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
                </span>
              )}
            </div>
          ))
        )}
      </div>
      <Pagination
        totalItems={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default UsersTable;
