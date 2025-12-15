"use client";

import React, { useState } from "react";
import styles from "./side.module.scss";
import { customer, business, settings } from "./sideItems";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");

  const isActive = (path: string) => pathname.startsWith(`/dashboard/${path}`);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabTitle: string) => {
    setActiveTab(tabTitle);
  };

  return (
    <aside className={styles.sideBar}>
      <div className={styles.container}>
        <span className={styles.switchOrg}>
          <Image
            src={"/svgs/briefcase.svg"}
            alt="Lendsqr"
            width={16}
            height={16}
          />
          <h4>Switch Organisation</h4>
          <span>
            <IoIosArrowDown color="#213F7D" size={16} />
          </span>
        </span>
        <Link className={styles.dashboardLink} href={"/dashboard"}>
          <Image src={"/svgs/home.svg"} alt="lendsqr" width={16} height={16} />
          <h3>Dashboard</h3>
        </Link>
        <section className={styles.dashboardTabs}>
          <h5>Customers</h5>
          {customer.map((item, idx) => {
            const active = isActive(item.link);
            return (
              <Link
                href={`/dashboard/${item.link}`}
                key={idx}
                className={`${styles.tab} ${active ? styles.active : ""}`}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={16}
                  height={16}
                />
                <h3>{item.title}</h3>
              </Link>
            );
          })}
        </section>
        <section className={styles.dashboardTabs}>
          <h5>Businesses</h5>
          {business.map((item, idx) => (
            <Link href={item.link} key={idx} className={`${styles.tab}`}>
              <Image src={item.icon} alt={item.title} width={16} height={16} />
              <h3>{item.title}</h3>
            </Link>
          ))}
        </section>
        <section className={styles.dashboardTabs}>
          <h5>Settings</h5>
          {settings.map((item, idx) => (
            <Link href={item.link} key={idx} className={`${styles.tab}`}>
              <Image src={item.icon} alt={item.title} width={16} height={16} />
              <h3>{item.title}</h3>
            </Link>
          ))}
        </section>
      </div>
    </aside>
  );
};

export default SideBar;
