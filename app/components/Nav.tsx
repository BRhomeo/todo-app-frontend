"use client";
import styles from "../styles/layout.module.css";
import { ModeToggle } from "./theme/ModeToggle";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/auth/authSlice";

export const Nav = () => {
  const user = useAppSelector(selectUser);
  return (
    <nav className={styles.nav}>
      {user?.id && user.name && (
        <span
          className="
            text-sm
            font-semibold
            text-gray-800
            dark:text-gray-200
            ml-4
          "
        >
          Welcome, {user.name}!
        </span>
      )}
      <ModeToggle />
    </nav>
  );
};
