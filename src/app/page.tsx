import Image from "next/image";
import styles from "./page.module.scss";
import SideBar from "@/components/SideBar/SideBar";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SideBar />
      </main>
    </div>
  );
}
