import React from 'react'
import Navbar from '../NavBar/Navbar';
import SideBar from '../SideBar/SideBar';
import styles from './layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main>
        <div className={styles.sideBarContainer}>
            <SideBar />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout;
