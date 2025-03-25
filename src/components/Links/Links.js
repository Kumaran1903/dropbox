import React from "react";
import styles from "./Links.module.css";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { logout } from "@/lib/action";
const Links = async () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];
  const session = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((item, i) => {
          return (
            <div key={i}>
              <Link href={item.path}>{item.name}</Link>
            </div>
          );
        })}
      </div>
      {session?.user ? (
        <>
          <Link href={"/my-files"} className={styles.links}>
            My files
          </Link>
          <form action={logout}>
            <button className={styles.btn} type="submit">
              Log out
            </button>
          </form>
        </>
      ) : (
        <Link href={"/login"}>
          <button className={styles.btn}>Get Started</button>
        </Link>
      )}
    </div>
  );
};

export default Links;
