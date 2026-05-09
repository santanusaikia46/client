import AuthForm from "../../components/AuthForm";
import { Suspense } from "react";

export const metadata = {
  title: "Reset Password | TatiAssam",
  description: "Set a new password for your TatiAssam account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>}>
      <AuthForm mode="resetPassword" />
    </Suspense>
  );
}
