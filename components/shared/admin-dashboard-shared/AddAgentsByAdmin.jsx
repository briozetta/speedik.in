"use client";
//imports
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentList from "@/components/helpers/admin-dashboard-helper/AgentList";
import AgentFilter from "@/components/helpers/admin-dashboard-helper/AgentFilter";
import Dashboardlayout from "@/components/ui/Dashboard-layout";
import { useState } from "react";

export default function AddAgentsByAdmin() {
  const [selectedValue,setSelectedValue] = useState("active")

  return (
    <Dashboardlayout>
      <Tabs defaultValue="active">
            <div className="flex items-start lg:flex-row flex-col gap-2 justify-between">
            <TabsList>
            <TabsTrigger onClick={()=>setSelectedValue("active")} value="active">Active Agents</TabsTrigger>
            <TabsTrigger onClick={()=>setSelectedValue("disabled")} value="disabled">Disabled Agents</TabsTrigger>
          </TabsList>
              {/* Filters */}
              <AgentFilter/>
            </div>
            {/* Agent lists */}
            <AgentList selectedValue={selectedValue}/>
          </Tabs>
    </Dashboardlayout>
  );
}
