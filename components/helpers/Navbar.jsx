"use client"
import React from "react";
import Link from "next/link"
import { Menu } from "lucide-react";
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CarFront} from "lucide-react";
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname()
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Log in", href: "/login",logo:FaRegUser },
    { name: "Contact", href: "/contact" },
  ];
 
  return (
    <nav className={`${pathname === "/vehicle-list" || pathname ==="/vehicle-details"?"bg-[#050B20]":"bg-none"} pt-6 p-7 fixed top-0
     left-0 w-full z-50 shadow-sm padding-x
    ${pathname.includes("dashboard")?"hidden":"block"}
    `}>
      <div className="flex justify-between items-center">
        <div className="relative">
          <Link href="/">
            <span className="text-gray-50 text-3xl flex items-center">
              <CarFront className="mr-1.5"/>Gaadi<span className="text-emerald-400  text-4xl">9</span></span>
          </Link>
        </div>
        <ul className="flex space-x-10 sm:padding-x">
          {navItems.map((item, index) => (
            <li key={index} className="sm:block hidden text-[16px] font-normal">
              <Link
                href={item.href}
                className={`${
                  item.name === "Log in" ? "text-green-400 hover:text-emerald-200" : "text-gray-100  hover:text-emerald-500"
                } hover:text-gray-950`}
              >
                {item.name === "Log in" ? <div className="flex items-center justify-center gap-2">{<item.logo/>}{item.name} </div> : item.name}
              </Link>
            </li>
          ))}
          <div className="sm:hidden block">
            <Sheet>
              <SheetTrigger>
                <Menu className="w-8 h-8 text-white" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <nav className="flex justify-center items-start flex-col space-y-4">
                    {navItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className={`${
                          item.name === "Log in"
                            ? "text-green-600"
                            : "text-gray-800"
                        } text-lg font-medium hover:text-gray-950`}
                      >
                        {item.name}
                      </Link>
                    ))}
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
