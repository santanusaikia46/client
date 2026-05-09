import { Suspense } from "react";
import AdminLoginClient from "./AdminLoginClient";

export const metadata = {
  title: "Admin Login | TatiAssam",
  description: "Admin portal access for TatiAssam.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>}>
      <AdminLoginClient />
    </Suspense>
  );
}
