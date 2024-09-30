"use client";
// imports
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  TabsContent, Card, CardContent, CardDescription, CardFooter, CardHeader,
  CardTitle,Badge, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuTrigger,Button, MoreHorizontal,Image,InfiniteScroll,IoIosRefresh,TbLoaderQuarter,
  useAgents,AddAgentsForm,useSelector,
} from "./imports";


const imagex = "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

export default function AgentList() {
  // # Extract users, loading state, hasMore, next, and handleRefresh from useAgents hook
  const { users, loading, hasMore, next, handleRefresh } = useAgents();
  const {searchTerm,} = useSelector((state)=>state.userFilter)

  // #Filter users based on search term and sort based on the filter
  const filteredUsers = users
    .filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.contact.toLowerCase().includes(searchTerm.toLowerCase())
    )
    

  return (
    <TabsContent value="all">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">Agents
          <div className="flex gap-3 justify-center items-center">
            <button
              onClick={handleRefresh}
              className="sm:flex text-gray-800 text-sm hidden
             hover:transition-transform hover:scale-105"
            >
              <IoIosRefresh size={17} /> refresh
            </button>
            {/* Add Agents form*/}
            <AddAgentsForm handleRefresh={handleRefresh} />
            </div>
          </CardTitle>
          <CardDescription >
            Manage your agents and view their performance.
            
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell" />
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  Email / Number
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Vehicles
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* map the users */}
            <TableBody>
              {filteredUsers.length > 0
                ? filteredUsers.map((user) => (
                    <TableRow className="cursor-pointer" key={user._id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          src={imagex}
                          alt="Agent image"
                          className="aspect-square rounded-xl 
                    object-cover"
                          height={40}
                          width={40}
                          priority
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.firstName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-violet-500">
                        {user.contact}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">6</TableCell>
                      <TableCell className="hidden md:table-cell text-orange-700">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
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
                  ))
                : !loading && (
                    <TableRow>
                      <TableCell colSpan="6" className="text-center">
                        No agents found.
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>

          {/* passing props to infinite scroll component */}
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={loading}
            next={next}
            threshold={1}
          >
            {hasMore && (
              <div className="flex justify-center items-center text-xs my-4">
                <TbLoaderQuarter className="h-6 w-6 animate-spin" /> loading..
              </div>
            )}
          </InfiniteScroll>
        </CardContent>

        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Total users - <strong>{users.length}</strong>
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
