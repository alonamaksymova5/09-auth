import { Metadata } from "next";
import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
//динамічні дані рядки 26-27

export const metadata: Metadata = {
  title: "User Profile",
  description: "View and edit your profile information on NoteHub.",
  openGraph: {
    title: "User Profile",
    description:
      "Access your personal profile page on NoteHub to edit your information and preferences.",
    url: "https://09-auth-eosin-kappa.vercel.app/profile",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function ProfilePage() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}
