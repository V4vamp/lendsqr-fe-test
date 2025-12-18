"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

export default function NotFound() {
const router = useRouter();

return (
    <div className={styles.notFound}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <button onClick={() => router.push("/dashboard/users")}>Go to Home</button>
      </div>
  );
}