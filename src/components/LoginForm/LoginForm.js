"use client";
import React, { useEffect } from "react";
import styles from "./LoginForm.module.css";
import Image from "next/image";
import { login } from "@/lib/action";
import { useRouter } from "next/navigation";
const LoginForm = ({ session }) => {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <form className={styles.form} action={login}>
      <button type="submit" className={styles.btn}>
        <span>
          <Image
            src="/google.png"
            alt="google_logo"
            height={35}
            width={35}
          ></Image>
        </span>
        <p>Signin with Google</p>
      </button>
    </form>
  );
};

export default LoginForm;
