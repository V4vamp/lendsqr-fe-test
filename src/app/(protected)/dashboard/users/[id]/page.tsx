/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/types";
import usersData from "../../../../../../public/mock/users.json";
import styles from "./page.module.scss";
import { HiArrowLongLeft } from "react-icons/hi2";
import Link from "next/link";
import { AiFillStar, AiOutlineStar, AiOutlineUser } from "react-icons/ai";
import Details from "@/components/GeneralDetails/Details";
import EmptyData from "@/components/EmptyData/EmptyData";
import Loader from "@/components/Loader/Loader";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<number | null>(0);

  const handleClickTab = (index: number) => {
    setActiveTab(index);
  };

 useEffect(() => {
  const userId = Number(id);
  if (Number.isNaN(userId)) return;

  setLoading(true);

  const storedUsers = localStorage.getItem("lendsqr_users");
  const users: User[] = storedUsers ? JSON.parse(storedUsers) : usersData;
  const foundUser = users.find((u) => u.id === userId);

  setUser(foundUser || null);
  setLoading(false);
}, [id]);


  useEffect(() => {
    const session = localStorage.getItem("lendsqr_session");
    if (!session) router.push("/signin");
  }, [router]);

  const updateUserStatus = (status: "Active" | "Blacklisted") => {
    if (!user) return;

    const storedUsers = localStorage.getItem("lendsqr_users");
    if (!storedUsers) return;

    const users: User[] = JSON.parse(storedUsers);

    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, status } : u
    );

    localStorage.setItem("lendsqr_users", JSON.stringify(updatedUsers));

    setUser((prev) => (prev ? { ...prev, status } : prev));
  };

  if (loading) return <Loader />;
  if (!user) return <p>User not found</p>;

  return (
    <div className={styles.userPage}>
        <Link className={styles.goBackLink} href={"/dashboard/users"}>
          <HiArrowLongLeft size={26} color="#545F7D" />
          <span>Back to Users</span>
        </Link>
        <header className={styles.pageHeader}>
          <h1>User Details</h1>
          <div className={styles.actionButtons}>
            <button
              disabled={user.status === "Blacklisted"}
              onClick={() => updateUserStatus("Blacklisted")}
              className={`${styles.blacklist} ${
                user.status === "Blacklisted" ? styles.blacklisted : ""
              }`}
            >
              {user.status === "Blacklisted" ? "Blacklisted" : "Blacklist user"}
            </button>
            <button
              disabled={user.status === "Active"}
              onClick={() => updateUserStatus("Active")}
              className={`${styles.activate} ${
                user.status === "Active" ? styles.active : ""
              }`}
            >
              {user.status === "Active" ? "Active" : "Activate user"}
            </button>
          </div>
        </header>
        <div className={styles.userPersonalDetails}>
          <section className={styles.detailsSection}>
            <div className={styles.userProfileDetails}>
              <span className={styles.userAvatar}>
                <AiOutlineUser size={30} color="#213F7D" />
              </span>
              <span className={styles.userFullName}>
                <h4>{user.profile.fullName}</h4>
                <p>{user.id}</p>
              </span>
            </div>
            <span className={styles.userTier}>
              <p>User&apos;s Tier</p>
              <span className={styles.tiers}>
                {[1, 2, 3].map((level) =>
                  level <= user.tier ? (
                    <AiFillStar key={level} size={14} color="#E9B200" />
                  ) : (
                    <AiOutlineStar key={level} size={14} color="#E9B200" />
                  )
                )}
              </span>
            </span>
            <span className={styles.userAccountDetails}>
              <h2>{user.account.balance}</h2>
              <p>
                {user.account.accountNumber}/{user.account.bankName}
              </p>
            </span>
          </section>
          <section className={styles.pageTabs}>
            {[
              "General Details",
              "Documents",
              "Bank Details",
              "Loans",
              "Savings",
              "App and System",
            ].map((item, idx) => (
              <button
                onClick={() => handleClickTab(idx)}
                key={idx}
                className={`${styles.pageTab} ${
                  activeTab === idx ? styles.activeTab : ""
                }`}
              >
                {item}
              </button>
            ))}
          </section>
        </div>
        <div className={styles.tabContent}>
          {activeTab === 0 && <Details user={user} />}
          {activeTab === 1 && <EmptyData text="No documents to display" />}
          {activeTab === 2 && <EmptyData text="Bank details not available" /> }
          {activeTab === 3 && <EmptyData text="No loans data not available" />}
          {activeTab === 4 && <EmptyData text="User has no savings" />}
          {activeTab === 5 && <EmptyData text="No Apps or Systems connected to this User" />}
        </div>
      </div>
  );
};

export default Page;
