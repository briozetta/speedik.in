"use client";
//imports
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentList from "@/components/helpers/admin-dashboard-helper/AgentList";
import AgentFilter from "@/components/helpers/admin-dashboard-helper/AgentFilter";
import Dashboardlayout from "@/components/ui/Dashboard-layout";

export default function AddAgentsByAdmin() {
 
  return (
    <Dashboardlayout>
      <Tabs defaultValue="all">
            <div className="flex items-start lg:flex-row flex-col gap-2 justify-between">
              <TabsList>
                <TabsTrigger value="all">Active agent</TabsTrigger>
                <TabsTrigger value="active">Disabled agents</TabsTrigger>
              </TabsList>
              {/* Filters */}
              <AgentFilter/>
            </div>
            {/* Agent lists */}
            <AgentList/>
          </Tabs>
    </Dashboardlayout>
  );
}
