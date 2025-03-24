import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Get to work, with a lot less work</h1>
      <p>
        Dropbox delivers tools that help you move your work forward faster, keep
        it safe, and <br></br>let you collaborate with ease.
      </p>
      <Link className={styles.btn} href={"/login"}>
        Sign up for free{" "}
      </Link>
    </div>
  );
}
