import Link from 'next/link';
import styles from './navMenu.module.css';
import Image from 'next/image';

export default function NavMenu() {
  return (
    <nav className={styles.nav}>
      <Link href={'/'}>
        <Image
          src="/playontabletop-logo.svg" // Route of the image file
          width={216}
          height={30}
          alt="NextSpace Logo"
        />
      </Link>
      <ul className={styles.links}>
        <li>
          <Link href={'/about'}>About</Link>
        </li>
        <li>
          <Link href={'/status'}>Status</Link>
        </li>
        <li>
          <Link href={'/config'}>Config</Link>
        </li>
      </ul>
    </nav>
  );
}