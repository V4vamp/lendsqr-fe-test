"use client";

import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/navigation";

export default function NotFound() {
const router = useRouter();

return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <button onClick={() => router.push("/")}>Go to Home</button>
      </div>
    </Layout>
  );
}