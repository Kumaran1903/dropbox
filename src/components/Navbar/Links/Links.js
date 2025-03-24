import React from "react";
import styles from "./Links.module.css";
import Link from "next/link";
const Links = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Signup", path: "/register" },
    { name: "Log in", path: "/login" },
  ];
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
      <Link href={"/login"}>
        <button className={styles.btn}>Get Started</button>
      </Link>
    </div>
  );
};

export default Links;
