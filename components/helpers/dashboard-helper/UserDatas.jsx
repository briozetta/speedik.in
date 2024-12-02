"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";
import { SpecificVehicle } from "./SpecificVehicle";
import { useState, useMemo } from "react";
import { chartConfig, getDefaultTestimonial,INITIAL_CHART_DATA } from "@/lib/contants";
import VehicleTableView from "./VehicleTableView";
import ChartViewer from "./ChartViewer";
import VehicleCardSkeleton from "@/components/ui/SkeletonLoadings/VehicleCardSkeleton";

export function UserDatas({ vehicle, agentData }) {
  const defaultTestimonial = getDefaultTestimonial(vehicle, agentData);
  const [testimonials, setTestimonials] = useState([defaultTestimonial]);

  // Calculate chart data dynamically
  const calculatedChartData = useMemo(() => {
    const initialData = INITIAL_CHART_DATA.map((item) => ({ ...item }));

    if (agentData?.vehicles) {
      agentData.vehicles.forEach((vehicle) => {
        switch (vehicle.vehicleType) {
          case "Two-Wheeler":
            initialData[0].visitors += 1;
            break;
          case "Four-Wheeler":
            initialData[1].visitors += 1;
            break;
          case "Commercial Vehicle":
            initialData[2].visitors += 1;
            break;
          default:
            initialData[3].visitors += 1;
            break;
        }
      });
    }
    return initialData;
  }, [agentData?.vehicles]);

  // Calculate total vehicles
  const totalVehicles = useMemo(() => {
    return calculatedChartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [calculatedChartData]);

  const addTestimonial = (vehicle) => {
    const newTestimonial = {
      brand: `${vehicle.brand} ${vehicle.model}`,
      year: vehicle.year,
      transmissionType: vehicle.transmissionType,
      ownership: vehicle.ownership,
      fuelType: vehicle.fuelType,
      agentName: agentData?.user?.[0]
        ? `${agentData.user[0].firstName} ${agentData.user[0].lastName}`
        : `${vehicle.fullname}`,
      contact: agentData?.user[0]?.contact,
      primaryContact: vehicle.primaryContact,
      secondaryContact: vehicle.secondaryContact,
      vehicleType: vehicle.vehicleType,
      price: vehicle.price,
      place: vehicle.place,
      district: vehicle.district,
      src: vehicle.uploadedImages?.[0] || "https://via.placeholder.com/150",
    };

    const existingIndex = testimonials.findIndex(
      (testimonial) =>
        testimonial.agentName === newTestimonial.agentName &&
        testimonial.brand === newTestimonial.brand &&
        testimonial.src === newTestimonial.src
    );

    if (existingIndex !== -1) {
      const updatedTestimonials = [...testimonials];
      const [existingTestimonial] = updatedTestimonials.splice(existingIndex, 1);
      setTestimonials([existingTestimonial, ...updatedTestimonials]);
    } else {
      setTestimonials((prevTestimonials) => [
        newTestimonial,
        ...prevTestimonials,
      ]);
    }
  };

  return (
    <Card className="flex flex-col justify-around padding-x bg-[#ededed]">
      {agentData?.user[0]?.contact ? (
        <SpecificVehicle testimonials={testimonials} />
      ) : (
        <VehicleCardSkeleton />
      )}

      <div className="flex lg:flex-row flex-col justify-between gap-6">
        {/* Table Section */}
        <VehicleTableView agentData={agentData} addTestimonial={addTestimonial} />

        {/* Chart Section */}
        <ChartViewer
          chartConfig={chartConfig}
          chartData={calculatedChartData}
          totalVehhicles={totalVehicles}
        />
      </div>
    </Card>
  );
}
