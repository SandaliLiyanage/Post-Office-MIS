import { Calendar } from "@/components/ui/calendar"
import * as React from "react"
import { Button } from "../../components/ui/button";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import ChartRevenue from './chartRevenue'
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
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {useEffect, useState} from 'react';
import Chart from './chart'
import axios from "axios";
import { cn } from "@/lib/utils" 
import { useUser } from '../authentication/usercontext';
import { Label } from "@/components/ui/label";

export interface IChartData {
  month: string,
  normal_mail: string,
  registered_mail: string,
  courier: string,
}
export default function RevenueReports() {
  const {user, removeUser} = useUser();
  const today = new Date();  // Get today's date
  const lastYearTimestamp = today.setFullYear(today.getFullYear() - 1);  // Modify the year
  const lastYearDate = new Date(lastYearTimestamp);
  const [endDate, setendDate] = React.useState<Date|undefined>(new Date())
  const [startDate, setStartDate] = React.useState<Date|undefined>(lastYearDate)
  const [type, setType] = useState<string>("Revenue")
  const [chartData, setChartData] = useState<IChartData[]| null>()

  useEffect(()=>{
    async function generateReports(){
      console.log("in generate reports", startDate,endDate, type)
      const response = await axios.post("http://localhost:5000/mail/reportData", {startDate, endDate, type},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, 
          }
        }
          
      )
      console.log(response.data)
      setChartData(response.data)
    }
    generateReports();
  }, [endDate, startDate, type])
    
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl font-bold">Reports</p>
      </div>
    
        <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
        <Label>Start Date</Label>
        <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal mt-2",
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
    </div>
    <div className="flex flex-col">
    <Label>End Date</Label>

    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal mt-2",
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
    </div>
    <div className="flex flex-col">
    <Label>Report Type</Label>

    <Select 
            onValueChange={(newValue) => setType(newValue)}>
      <SelectTrigger className="w-[180px] mt-2">
        <SelectValue placeholder="Select Report Type" onSelect={()=>setType(Select.name)} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectItem value="Revenue" onClick={() => setType("Revenue")}>Revenue</SelectItem>
      <SelectItem value="Transaction_Count" onClick={() => setType("Tranaction_Count")}>Tranaction Count</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  
    {chartData && type=="Revenue" &&
    <ChartRevenue data={chartData}/>
    }
    {chartData && type=="Transaction_Count" &&
    <Chart data={chartData}/>
    }
        </div>
        <div className="flex justify-center">
    <p>Select start date end date and Report type to generate reports</p>
    </div>
    </div>
  )
}
