"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import styles from "./page.module.scss";
import api from "@/lib/api";
import { User } from "@/types/types";


const Page = () => {
    const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/public/mock/users.json");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className={styles.loading}>Loading users...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
    return ( 
        <Layout>
            <main className={styles.mainPage}>
                <h1>Users</h1>
            </main>
        </Layout>
     );
}
 
export default Page;