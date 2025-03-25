import { auth } from "@/lib/auth";
import styles from "./page.module.css";
import { Dropbox } from "@/components/Dropbox/Dropbox";
export default async function Home() {
  const session = await auth();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Get to work, with a lot less work</h1>
      <p>
        Dropbox delivers tools that help you move your work forward faster, keep
        it safe, and <br></br>let you collaborate with ease.
      </p>
      <Dropbox session={session} />
    </div>
  );
}
