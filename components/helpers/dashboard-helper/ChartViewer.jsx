import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function ChartViewer({chartData,chartConfig,totalVehhicles}) {
  return (
    <div className="flex-1 w-full max-w-md lg:max-w-none">
            <CardHeader className="items-center text-gray-900 pb-0">
              <CardTitle>Agent's Vehicle Overview</CardTitle>
              <CardDescription>
                {" "}
                vehicles added by the agent, categorized by type
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px] sm:max-h-[300px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="visitors"
                    nameKey="category" // Map the name key to the 'category' field
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-[#0c0c0c] text-3xl font-bold"
                              >
                                {totalVehhicles.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Total vehicles
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-gray-900 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Distribution of vehicle types added by the agent..{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardFooter>
          </div>
  )
}
