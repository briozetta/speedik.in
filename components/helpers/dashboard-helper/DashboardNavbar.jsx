"use client";
import Link from "next/link";
import {Home,LineChart,Package2,PanelLeft,Settings,} from "lucide-react";

import {Tooltip,TooltipContent,TooltipTrigger,TooltipProvider,} from "@/components/ui/tooltip";
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,
DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import profileVector from "@/public/assets/profileVector.webp";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FcAdvertising ,FcMultipleDevices  ,FcReadingEbook ,FcAddImage  } from "react-icons/fc";
import { useSession } from "next-auth/react";
import { useAgents } from "@/hooks/useAgents";
import EditAgentForm from "../admin-dashboard-helper/EditAgentForm";

export default function DashboardNavbar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role
  const userId = session?.user?._id
  const { handleRefresh } = useAgents();

  const navItems = [
    {
      name:"Dashboard",
      icon:FcMultipleDevices  ,
      protected:false,
      navLink:"/admin/dashboard-home"
    },
    {
      name:"Add Agents",
      icon:FcReadingEbook ,
      protected: role === "Admin" ? false : true,
      navLink:"/admin/dashboad-add-agent"
    },
    {
      name:"Add Vehicle",
      icon:FcAddImage ,
      protected:false,
      navLink:"/add-vehicles"
    },
    {
      name:"Add Ads",
      icon:FcAdvertising,
      protected: role === "Admin" ? false : true,
      navLink:"/admin/dashboard-add-advertisement"
    },
  ]
 
  return (
    <div className="flex  w-full flex-col bg-muted/40 ">
     
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-[125px] flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Home className="h-4 w-9 transition-all group-hover:scale-110" />
            <span className="sr-only">Go-Home</span>
          </Link>
        
          {/* map NavItems */}
          {navItems.map((item,index)=>( 
             item.protected === false && (
              <Link
              key={index}
                href={item.navLink}
                className={`flex justify-between items-center mt-4 rounded-md gap-2 p-2 w-auto
                  ${pathName === item.navLink ? "bg-emerald-600 text-white hover:text-[#00cc99]"
                    : "bg-gray-100 text-slate-800 hover:text-[#00cc99]"} `}
              >
                <item.icon size={20}/>
                <span className="text-xs">{item.name}</span>
              </Link>
            )
       
          ))}
         
          
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                 
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                 
                  <span className="sr-only">settings</span>
                  <EditAgentForm userId={userId} role={true} handleRefresh={handleRefresh}/>
                </span>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" /> 
                <span className="sr-only"> Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                {navItems.map((item,index)=>(
                   <Link
                   key={index}
                   href={item.navLink}
                   className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                 >
                   <item.icon className="h-5 w-5" />
                   {item.name}
                 </Link>
                ))}
                <span
                 
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </span>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex mt-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="relative ml-auto flex-1 md:flex-grow-0 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden border-2 border-emerald-500 rounded-full"
                >
                  <Image
                    src={profileVector}
                    width={100}
                    height={100}
                    alt="Avatar"
                    className="overflow-hidden w-12 h-12 rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>
    </div>
  );
}
