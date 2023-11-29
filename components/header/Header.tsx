import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>The Road To Enterprise</div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/user/profile">Profile</Link>
        <Link href="/user/list">User List</Link>
        <Link href="/admin/dashboard">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;
