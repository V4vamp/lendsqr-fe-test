/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import styles from "./nav.module.scss";
import Image from "next/image";
import Link from "next/link";
import { HiSearch } from "react-icons/hi";
import { getSession, clearSession } from "@/utils/auth";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "../SideBar/SideBar";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Navbar = () => {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      setSession(getSession());
    });
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClickDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

  const logout = () => {
    clearSession();
    window.location.href = "/signin";
  };

  return (
    <nav className={styles.navbar}>
      <span className={styles.hamburger}>
        <GiHamburgerMenu
          onClick={toggleMenu}
          className={styles.hamIcon}
          size={20}
        />
        <Image src={"/images/logo.png"} alt="Lendsqr" width={86} height={20} />
      </span>
      <Link href={"/"} className={styles.navLogo}>
        <Image src={"/images/logo.png"} alt="Lendsqr" width={144} height={30} />
      </Link>
      <span className={styles.mobileAvatar}>
        <div className={styles.avatarWrapper}>
          <Image
            src={"/images/user.png"}
            alt="Lendsqr"
            fill
            className={styles.userAvatar}
          />
        </div>
        <span onClick={handleClickDropdown} className={styles.userName}>
          {session?.user?.firstName || "User"}
          <MdOutlineArrowDropDown />
        </span>
      </span>
      <div className={styles.navItems}>
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="Search for anything" />
          <button>
            <HiSearch color="#FFF" size={14} />
          </button>
        </div>
        <div className={styles.userActions}>
          <Link href={"#"} className={styles.docsLink}>
            Docs
          </Link>
          <span>
            <Image
              src={"/svgs/bell.svg"}
              alt="Lendsqr"
              width={20}
              height={20}
            />
          </span>
          <div className={styles.userInfo}>
            <div className={styles.avatarWrapper}>
              <Image
                src={"/images/user.png"}
                alt="Lendsqr"
                fill
                className={styles.userAvatar}
              />
            </div>
            <span onClick={handleClickDropdown} className={styles.userName}>
              {session?.user?.firstName || "User"}
              <MdOutlineArrowDropDown color="#213F7D" size={20} />
            </span>
          </div>
        </div>
      </div>
      {isDropdown && (
        <div className={styles.dropdown}>
          <span>Profile</span>
          <span>Settings</span>
          <span onClick={logout}>Logout</span>
        </div>
      )}
      {openMenu && (
        <div className={styles.mobileMenu}>
          <span className={styles.span}></span>
          <IoIosCloseCircleOutline
            className={styles.close}
            size={24}
            onClick={() => setOpenMenu(false)}
          />
          <SideBar />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
