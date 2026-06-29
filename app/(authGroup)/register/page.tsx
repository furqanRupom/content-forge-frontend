import RegisterForm from "@/components/modules/Auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | ContentForge AI",
  description: "Join ContentForge AI today. Sign up to start generating content faster with our advanced AI-powered templates.",
};
const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;