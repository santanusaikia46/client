import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className={isLast ? styles.active : ""}>
              {isLast ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <>
                  <Link href={item.href}>{item.label}</Link>
                  <span className={styles.separator}>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
