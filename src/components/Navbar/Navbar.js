import Image from "next/image";
import React from "react";
import styles from "./Navbar.module.css";
import Links from "./Links/Links";
function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <Image src="/logo.png" height={50} width={50} alt="logo" />
        <div> Dropbox</div>
      </div>
      <div>
        <Links />
      </div>
    </div>
  );
}

export default Navbar;
