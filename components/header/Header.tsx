import Link from "next/link";
import styles from "./Header.module.css";

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div>The Road To Enterprise</div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/user/profile">Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
