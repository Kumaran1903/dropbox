import React from "react";
import { auth } from "@/lib/auth";
import LoginForm from "@/components/LoginForm/LoginForm";
const Login = async () => {
  const session = await auth();

  return <LoginForm session={session} />;
};

export default Login;
