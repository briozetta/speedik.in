"use client";
//imports
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddList from "@/components/helpers/AddMain/Advertisement";
import Dashboardlayout from "@/components/ui/Dashboard-layout";
import { useState } from "react";

export default function AddAgentsByAdmin() {

  return (
    <Dashboardlayout>
      <Tabs defaultValue="active">

        <AddList />
      </Tabs>
    </Dashboardlayout>
  );
}
