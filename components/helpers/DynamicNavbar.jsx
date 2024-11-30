"use client";
import { usePathname } from 'next/navigation'
import DashboardNavbar from './dashboard-helper/DashboardNavbar';
import Navbar from './Navbar';

export default function DynamicNavbar() {
    const pathname = usePathname()
  return (
    <>
    {pathname.includes("admin")|| pathname.includes("/add-vehicles")?<DashboardNavbar/>:<Navbar/>}
    </>
  )
}
