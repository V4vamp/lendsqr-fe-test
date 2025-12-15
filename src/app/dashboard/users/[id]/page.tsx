"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/types";
import usersData from "../../../../../public/mock/users.json";
import styles from "./page.module.scss";
import Layout from "@/components/Layout/Layout";
import { HiArrowLongLeft } from "react-icons/hi2";
import Link from "next/link";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Number(id);
    if (Number.isNaN(userId)) {
      setLoading(false);
      return;
    }

    const storedUsers = localStorage.getItem("lendsqr_users");

    const users: User[] = storedUsers ? JSON.parse(storedUsers) : usersData;

    const foundUser = users.find((u) => u.id === userId);
    setUser(foundUser || null);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    const session = localStorage.getItem("lendsqr_session");
    if (!session) router.push("/signin");
  }, []);

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <Layout>
      <div className={styles.userPage}>
        <Link className={styles.goBackLink} href={"/dashboard/users"}>
          <HiArrowLongLeft size={26} color="#545F7D" />
          <span>Back to Users</span>
        </Link>
        <header className={styles.pageHeader}>
          <h1>User Details</h1>
          <div className={styles.actionButtons}>
            <button
              className={`${styles.blacklist} ${
                user.status === "Blacklisted" ? styles.blacklisted : ""
              }`}
            >
              {user.status === "Blacklisted" ? "Blacklisted" : "Blacklist user"}
            </button>
            <button
              className={`${styles.activate} ${
                user.status === "Active" ? styles.active : ""
              }`}
            >
              {user.status === "Active" ? "Active" : "Activate user"}
            </button>
          </div>
        </header>
      </div>
    </Layout>
  );
};

export default Page;
