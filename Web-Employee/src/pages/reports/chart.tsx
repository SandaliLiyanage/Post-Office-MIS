"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis,  } from "recharts"
import { IChartData } from "./PageRevenueReports"
import { ChartConfig, ChartContainer, ChartTooltip,ChartTooltipContent, ChartLegend,
  ChartLegendContent,} from "@/components/ui/chart"

const chartConfig = {
  normal_mail: {
    label: "normal_mail",
    color: "#22c55e",
  },
  registered_mail: {
    label: "registered_mail",
    color: "#fde047",
  },
  courier: {
    label: "courier",
    color: "#1e2a05",
  },
} satisfies ChartConfig

export default function Chart({ data }: { data: IChartData[] } ) {
  const chartData = data 
  return (
    <ChartContainer config={chartConfig} className="min-h-[400px] min-w-[1000] m-8">
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
        value: 'Transaction Count',
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
