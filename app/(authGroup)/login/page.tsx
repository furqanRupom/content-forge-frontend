import LoginForm from "@/components/modules/Auth/LoginForm";
import { Metadata } from "next";

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}
export const metadata: Metadata = {
  title: "Login | ContentForge AI",
  description: "Log in to your ContentForge AI account to access your dashboard and continue generating high-quality content.",
};
const LoginPage = async ({ searchParams }: LoginParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;

  return <LoginForm redirectPath={redirectPath} />;
};

export default LoginPage;