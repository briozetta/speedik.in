"use client";
//imports
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentList from "@/components/helpers/admin-dashboard-helper/AgentList";
import AgentFilter from "@/components/helpers/admin-dashboard-helper/AgentFilter";

export default function AddAgentsByAdmin() {
 
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 mt-3 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-start lg:flex-row flex-col gap-2 justify-between">
              <TabsList>
                <TabsTrigger value="all">Active agents</TabsTrigger>
                <TabsTrigger value="active">Disabled agents</TabsTrigger>
              </TabsList>

              {/* Filters */}
              <AgentFilter/>
            </div>
            {/* Agent lists */}
            <AgentList/>

          </Tabs>
        </div>
      </div>
    </div>
  );
}
