"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { IChartData } from "./PageRevenueReports"
import { ChartConfig, ChartContainer, ChartTooltip,ChartTooltipContent,ChartLegend,
  ChartLegendContent, } from "@/components/ui/chart"

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

export default function ChartRevenue({ data }: { data: IChartData[] } ) {
  const chartData = data 
  return (
    <ChartContainer config={chartConfig} className="min-h-[400px] min-w-[1000] m-8 px-5">
      <BarChart accessibilityLayer width={30000} height={30000} data={chartData}>
      <CartesianGrid vertical={true} />
      <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <YAxis
      label={{
        value: 'Revenue(Rs):',
        angle: -90,
        position: 'insideLeft', // Use 'insideLeft' or 'insideTopLeft' to keep it inside
        offset: 0, // You can adjust this value as necessary
        style: {
          textAnchor: 'middle', // Center the text
          fontSize: 14, // Increase font size if needed
        },
      }}
    
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="normal_mail" fill={chartConfig.normal_mail.color} radius={4} />
        <Bar dataKey="registered_mail" fill={chartConfig.registered_mail.color} radius={4} />
        <Bar dataKey="courier" fill={chartConfig.courier.color} radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
