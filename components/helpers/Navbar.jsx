"use client";
import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,SheetClose
} from "@/components/ui/sheet";

import { CarFront } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const userData = session?.user;

  const pathname = usePathname();
  const navItems = [
   
    { name: "Four-Wheeler", href: "/vehicle-list", query: "Four-Wheeler" },
    { name: "Two-Wheeler", href: "/vehicle-list", query: "Two-Wheeler" },
    {
      name: "Commercial Vehicles",
      href: "/vehicle-list",
      query: "Commercial Vehicle",
    },
  ];

  return (
    <nav
      className={`${
        pathname.includes("/vehicle-list/") || pathname.includes("/vehicle-details") 
          ? "bg-[#050B20]"
          : "bg-none"
      } pt-6 p-7 fixed top-0
     left-0 w-full z-50 shadow-sm padding-x
    ${pathname.includes("dashboard") ? "hidden" : "block"}
    `}
    >
      <div className="flex justify-between items-center">
        <div className="relative">
          <Link href="/">
            <span className="text-gray-50 text-3xl flex items-center">
              <CarFront className="mr-1.5" />
              Gaadi<span className="text-emerald-400  text-4xl">9</span>
            </span>
          </Link>
        </div>
        <ul className="flex space-x-10 sm:padding-x">
          <>
          <li><Link
                  href={ '/'}
                  className={`hover:text-emerald-400 xl:block hidden text-gray-100`}
                >Home</Link></li>
            {navItems.map((item, index) => (
              <li
                key={index}
                className="xl:block hidden text-[16px] font-normal"
              >
                <Link
                  href={ `/vehicle-list/${item.query}`}
                  className={`hover:text-emerald-400 text-gray-100`}
                >
                  {item.name === "Log in" ? (
                    <div className="flex items-center justify-center gap-2">
                      {<item.logo />}
                      {item.name}{" "}
                    </div>
                  ) : (
                    item.name
                  )}
                </Link>
              </li>
            ))}

            {!userData ? (
              <li className="sm:block hidden  text-[16px]">
                <Link
                  href={"/login"}
                  className="text-lg text-emerald-400 font-medium hover:text-emerald-300"
                >
                  Log-in
                </Link>
              </li>
            ) : (
              <>
                <li className="xl:block hidden  text-[16px]">
                  <Link
                    href={"/admin/dashboard-home"}
                    className=" text-emerald-400 flex justify-center items-center gap-1 hover:text-emerald-300"
                  >
                    <FaRegUser /> Dashboard
                  </Link>
                </li>
                <li className="xl:block hidden  text-[16px]">
                  <button
                    onClick={() => signOut({ redirect: false })}
                    className=" text-emerald-400 hover:text-emerald-300"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </>
          <div className="xl:hidden block">
            <Sheet>
              <SheetTrigger>
                <Menu className="w-8 h-8 text-white" />
              </SheetTrigger>
              <SheetContent className="bg-[#090909]">
                <SheetHeader>
                  <nav className="flex justify-center items-start flex-col space-y-4">
                    <>
                    <SheetClose asChild>
                  <Link href="/" className={`text-lg font-medium text-emerald-50`}>Home</Link>
                </SheetClose>
                      {navItems.map((item, index) => (
                          <SheetClose asChild>
                         <Link
                        key={index}
                        href={ `/vehicle-list/${item.query}`}
                          className={`text-lg font-medium text-emerald-50`}
                        >
                          {item.name}
                        </Link>   
                        </SheetClose>
                      ))}
                      {userData ? (
                        <Link
                          href="/admin/dashboard-home"
                          className="text-lg font-medium text-emerald-500"
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          href="/login"
                          className="text-lg font-medium text-emerald-600"
                        >
                          Login
                        </Link>
                      )}                             
                    </>
                  </nav>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </ul>
      </div>
    </nav>
  );
}
