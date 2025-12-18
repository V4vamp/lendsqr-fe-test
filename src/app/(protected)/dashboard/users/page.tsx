/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import api from "@/lib/api";
import { User } from "@/types/types";
import Image from "next/image";
import UsersTable from "@/components/UsersTable/UsersTable";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/public/mock/users.json");
        setUsers(res.data);
        console.log(users.length);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [users.length]);

  if (loading) return <p className={styles.loading}>Loading users...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  const usersCount = users.length;

  const activeUsers = users.filter((user) => user.status === "Active").length;

  const usersWithSavings = users.filter(
    (user) =>
      Boolean(user.education.monthlyIncome) &&
      user.education.monthlyIncome !== "0"
  ).length;

  const usersWithLoan = users.filter(
    (user) => user.education.loanRepayment > 0
  ).length;

  return (
    <main className={styles.main}>
      <h1>Users</h1>
      <div className={styles.usersDataCards}>
        <div className={styles.card}>
          <span className={styles.iconWrapper}>
            <Image
              src={"/svgs/users.svg"}
              alt={"lendsqr"}
              width={22}
              height={22}
            />
          </span>
          <p>users</p>
          <h4>{usersCount}</h4>
        </div>
        <div className={styles.card}>
          <span
            style={{
              background: "rgba(87, 24, 255, 0.1)",
            }}
            className={styles.iconWrapper}
          >
            <Image
              src={"/svgs/active-users.svg"}
              alt={"lendsqr"}
              width={22}
              height={22}
            />
          </span>
          <p>active users</p>
          <h4>{activeUsers}</h4>
        </div>
        <div className={styles.card}>
          <span
            style={{
              background: "rgba(245, 95, 68, 0.1)",
            }}
            className={styles.iconWrapper}
          >
            <Image
              src={"/svgs/users-loans.svg"}
              alt={"lendsqr"}
              width={22}
              height={22}
            />
          </span>
          <p>users with loans</p>
          <h4>{usersWithLoan}</h4>
        </div>
        <div className={styles.card}>
          <span
            style={{
              background: "rgba(255, 51, 102, 0.1)",
            }}
            className={styles.iconWrapper}
          >
            <Image
              src={"/svgs/users-savings.svg"}
              alt={"lendsqr"}
              width={22}
              height={22}
            />
          </span>
          <p>users with savings</p>
          <h4>{usersWithSavings}</h4>
        </div>
      </div>
      <UsersTable users={users} />
    </main>
  );
};

export default Page;
