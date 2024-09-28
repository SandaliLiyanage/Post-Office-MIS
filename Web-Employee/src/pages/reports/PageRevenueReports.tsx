import { Calendar } from "@/components/ui/calendar"
import * as React from "react"
import { Button } from "../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {useEffect, useState} from 'react';
import Chart from './chart'
import axios from "axios";
  const formSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
    serviceType: z.string()

  })
  import { cn } from "@/lib/utils" 
import { Value } from "@radix-ui/react-select";
 
export interface IChartData {
  month: string,
  normal_mail: string,
  registered_mail: string,
  courier: string,
}
export default function RevenueReports() {
  const [endDate, setendDate] = React.useState<Date>()
  const [startDate, setStartDate] = React.useState<Date>()
  const [type, setType] = useState<string>("")
  const [chartData, setChartData] = useState<IChartData[]| null>()

  useEffect(()=>{
    async function generateReports(){
      console.log("in generate reports")
      const response = await axios.post("http://localhost:5000/mail/reportData")
      setChartData(response.data)
      
    }
    generateReports();
  }, [endDate, startDate, type])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(),
      endDate:new Date(),
      serviceType: "",

    },
  })
  
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl font-bold">Revenue Reports</p>
      </div>
    
        <div className="grid grid-cols-3 gap-4">
        <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate ? format(startDate, "PPP") : <span>Pick start date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={setStartDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !endDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={endDate}
          onSelect={setendDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Mail Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectItem value="all" onSelect={() => setType("all")}>all</SelectItem>
        <SelectItem value="normal mail" onSelect={() => setType("normal mail")}>normal mail</SelectItem>
      <SelectItem value="registered mail" onSelect={() => setType("registered mail")}>registered mail</SelectItem>
      <SelectItem value="courier" onSelect={() => setType("courier")}>courier</SelectItem>
      <SelectItem value="bulk mail" onSelect={() => setType("bulk mail")}>bulk mail</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    {chartData &&
    <Chart data={chartData}/>
    }
    
        </div>
    </div>
  )
}
