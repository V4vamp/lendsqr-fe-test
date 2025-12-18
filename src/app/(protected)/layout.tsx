import Layout from "@/components/Layout/Layout";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Layout>{children}</Layout>
    </AuthGuard>
  );
}
