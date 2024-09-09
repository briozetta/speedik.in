"use client";
import Image from "next/image";
import Link from "next/link";
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "@/redux/api/userData";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export default function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const status = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);
  const [content,setContent] = useState([]);

  useEffect(() => {
   
    if (status === 'idle') {
      dispatch(fetchData());
    } else if (status === 'succeeded') {
      setContent(data)
      console.log(data);
      
    } else if (status === 'failed') {
      console.log("Error:", error);
    }
  
  
  }, [status, data, error, dispatch]);
  
  
  return (
    <section className="mx-6">
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 mt-3 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">

              <div className="flex items-start lg:flex-row flex-col gap-2 justify-between">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                </TabsList>
                <div className=" flex gap-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Archived
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button size="sm" className="h-8 gap-1  bg-emerald-600">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only text-emerald-50 sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </Button>
                </div>
              </div>

              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      {/* table header */}
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Price
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Total Sales
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Created at
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      {/* table header end */}

                      {/* table content */}
                     {content.map((con)=>(
                       <TableBody key={con.id}>
                       <TableRow>
                         <TableCell className="hidden sm:table-cell">
                           <Image
                             src={con.thumbnailUrl}
                             alt="Product image"
                             className="aspect-square rounded-md object-cover"
                             placeholder="blur"
                             blurDataURL="data:image/jpeg..."
                             height={64}
                             width={64}
                           />
                         </TableCell>
                         <TableCell className="font-medium">
                           {con.title}
                         </TableCell>
                         <TableCell>
                           <Badge variant="outline">Draft</Badge>
                         </TableCell>
                         <TableCell className="hidden md:table-cell">
                           $499.99
                         </TableCell>
                         <TableCell className="hidden md:table-cell">
                           25
                         </TableCell>
                         <TableCell className="hidden md:table-cell">
                           2023-07-12 10:42 AM
                         </TableCell>
                         <TableCell>
                           <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                               <Button
                                 aria-haspopup="true"
                                 size="icon"
                                 variant="ghost"
                               >
                                 <MoreHorizontal className="h-4 w-4" />
                                 <span className="sr-only">Toggle menu</span>
                               </Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent align="end">
                               <DropdownMenuLabel>Actions</DropdownMenuLabel>
                               <DropdownMenuItem>Edit</DropdownMenuItem>
                               <DropdownMenuItem>Delete</DropdownMenuItem>
                             </DropdownMenuContent>
                           </DropdownMenu>
                         </TableCell>
                       </TableRow>
                     </TableBody>
                     ))}
                      
                      {/* table content  end*/}
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                      products
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </section>
  );
}
