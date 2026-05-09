import { Suspense } from "react";
import AuthForm from "../../components/AuthForm";

export const metadata = {
  title: "Forgot Password | TatiAssam",
  description: "Request a password reset link for your TatiAssam account.",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>}>
      <AuthForm mode="forgotPassword" />
    </Suspense>
  );
}
