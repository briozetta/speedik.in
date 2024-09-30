"use client";
import { usePathname } from 'next/navigation'
import DashboardNavbar from './dashboard-helper/DashboardNavbar';
import Navbar from './Navbar';

export default function DynamicNavbar() {
    const pathname = usePathname()
  return (
    <>
    {pathname.includes("admin")?<DashboardNavbar/>:<Navbar/>}
    </>
  )
}
