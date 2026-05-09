import { Suspense } from "react";
import AuthForm from "../../components/AuthForm";

export const metadata = {
  title: "Signup | TatiAssam",
  description: "Create your TatiAssam account to shop authentic Assam ethnic wear, track orders, and access exclusive deals.",
};

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>}>
      <AuthForm mode="signup" />
    </Suspense>
  );
}
