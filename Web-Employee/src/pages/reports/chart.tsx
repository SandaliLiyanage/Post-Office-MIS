"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis,  } from "recharts"
import { IChartData } from "./PageRevenueReports"
import { ChartConfig, ChartContainer, ChartTooltip,ChartTooltipContent, } from "@/components/ui/chart"

const chartConfig = {
  normal_mail: {
    label: "normal_mail",
    color: "#2563eb",
  },
  registered_mail: {
    label: "registered_mail",
    color: "#60a5fa",
  },
  courier: {
    label: "courier",
    color: "#122c4d",
  },
} satisfies ChartConfig

export default function Chart({ data }: { data: IChartData[] } ) {
  const chartData = data 
  return (
    <ChartContainer config={chartConfig} className="min-h-[400px] w-full m-8">
      <BarChart accessibilityLayer width={10000} height={30000} data={chartData}>
      <CartesianGrid vertical={true} />
      <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <YAxis/>
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="normal_mail" fill={chartConfig.normal_mail.color} radius={4} />
    <Bar dataKey="registered_mail" fill={chartConfig.registered_mail.color} radius={4} />
    <Bar dataKey="courier" fill={chartConfig.courier.color} radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
