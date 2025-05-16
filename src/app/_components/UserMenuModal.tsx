"use client";

import {
  IoHomeOutline,
  IoSettingsOutline,
  IoBugOutline,
  IoExitOutline,
} from "react-icons/io5";
import { TbLayoutDashboard } from "react-icons/tb";
import { IoMdContacts } from "react-icons/io";
import { type ReactNode } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

type MenuItem = {
  icon: ReactNode;
  element: ReactNode;
  callback?: () => void;
};

export default function UserMenu() {
  const { data: session } = useSession();
  const userInSession = session?.user;

  const menuItems: MenuItem[] = [
    { icon: <IoHomeOutline />, element: <span>Home</span> },
    { icon: <TbLayoutDashboard />, element: <span>Dashboard</span> },
    { icon: <IoSettingsOutline />, element: <span>Settings</span> },
    { icon: <IoBugOutline />, element: <span>Report a bug</span> },
    { icon: <IoMdContacts />, element: <span>Contact</span> },
    {
      icon: <IoExitOutline />,
      element: (
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          Log Out
        </Link>
      ),
    },
  ];

  return (
    <section className="text-md absolute right-8 top-20 h-64 w-52 rounded-md bg-principal p-2 outline outline-1 outline-white">
      <header className="mb-2 flex flex-col gap-1">
        <span>{userInSession?.name}</span>
        <span className="">{userInSession?.email}</span>
      </header>

      <ul className="flex flex-col gap-2">
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className="flex cursor-pointer items-center gap-2 hover:underline"
          >
            {item.icon}
            {item.element}
          </li>
        ))}
      </ul>
    </section>
  );
}
