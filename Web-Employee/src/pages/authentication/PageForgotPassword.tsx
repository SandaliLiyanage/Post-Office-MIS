"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import {Toaster} from "../../components/ui/toaster"
import { useToast } from '../../hooks/use-toast';

const formSchema = z.object({
  employeeID: z.string().min(1, {
    message: "Incorrect EmployeeID",
  }),
})


export default function ForgotPassword() {
  const { toast } = useToast()
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        employeeID: "",
      },
  })

  const generateOTP= async function(values: z.infer<typeof formSchema>){
    console.log("generating OTP ---  in front end")
    localStorage.setItem("employeeID", values.employeeID)
    console.log("hehe", values.employeeID)
    const result = await axios.post("http://localhost:5000/auth/validateID", values)
    console.log(result)
    if(result.data == true){
      const result =await axios.post("http://localhost:5000/auth/generateOTP", values)
      navigate("/validateOTP")
      console.log(result)}
    else{
      form.reset();
      toast({
        description:"Invalid Employee ID",
      })
    }
  }
    
  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
    <div className=" bg-white rounded-lg h-96 lg:flex">
    <div className="mr-20 ml-20 mt-8 flex flex-col items-end ">
      <div>
      <div>
      <h1 className="text-2xl mb-5 mt-5">Reset Password</h1>
      </div>
      <Form {...form}>
      <form onSubmit= {form.handleSubmit(generateOTP)} className="space-y-8">
        <div className="grid " >
          <FormField
            control={form.control}
            name="employeeID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input placeholder="Employee ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-slate-600 mt-5">Send OTP</Button>
          <Toaster/>
        </div>
      </form>
    </Form>
      </div>
    </div>
    </div>
  </div>
)
}
