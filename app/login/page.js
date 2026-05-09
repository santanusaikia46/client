import { Suspense } from "react";
import AuthForm from "../../components/AuthForm";

export const metadata = {
  title: "Login | TatiAssam",
  description: "Sign in to your TatiAssam account to manage orders, track shipments, and access exclusive member benefits.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
