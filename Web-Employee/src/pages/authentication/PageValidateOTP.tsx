"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button"
import {
  FormDescription,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import axios from "axios"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import {Toaster} from "../../components/ui/toaster"
import { useToast } from '../../hooks/use-toast';
import {useEffect, useState} from 'react';
import { IP } from "../../../config"
const formSchema = z.object({
  pin: z.string(),
  
})


export default function ValidateOTP() {
  const { toast } = useToast()
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
      pin: "",
      
      },
  })
  async function validateOTP(values: z.infer<typeof formSchema>){
    const queryParams = new URLSearchParams(location.search);
    const employeeID = queryParams.get('employeeID'); 
    const localCount = localStorage.getItem("count")
    console.log(employeeID)
    if (localCount == null){
      let count = 1
      setCount(1)
      console.log(count)
      localStorage.setItem("count", "1")

    }
    if(localCount != null){
      let validationCount =JSON.parse(localCount)
      validationCount = validationCount+1
      localStorage.setItem("count", validationCount)
      console.log(validationCount, "validation count")
      console.log(count, "count")
      setCount(validationCount)}

    
    if(count <= 3){
    const response = await axios.post(`http://${IP}/auth/validateOTP`, 
      {values,
      time : new Date(),
      employeeID
      })
      console.log(response)
      if(response.data == "valid"){
        toast({
          description:`OTP Validated`,
        })
        navigate(`/setpassword?employeeID=${employeeID}`)
        localStorage.removeItem("count")
        localStorage.removeItem("employeeID")
        
      }if(response.data == "expired"){
        localStorage.removeItem("employeeID")
        toast({
          description:"OTP Expired",
        })
      }
        else{
          form.reset()
          toast({
            description:"OTP Incorrect",
          })
      }

  } else{
   navigate("/forgotpassword")
   localStorage.removeItem("count")
   localStorage.removeItem("employeeID")
  }
   
    
  }

  useEffect(()=>{
    function getUser(){
      const ID = localStorage.getItem("employeeID");
      console.log(ID)
      if(ID == null){
        navigate("/forgotpassword")
      }
    }
    getUser();
  }, [])
  return (

    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
      <div className=" bg-white rounded-lg h-96 lg:flex">
      <div className="mr-20 ml-20 mt-8 flex flex-col items-end ">
        <div>
        <div>
        <h1 className="text-2xl mb-5 mt-5">Enter OTP</h1>
        </div>
        <Form {...form}>
        <form onSubmit= {form.handleSubmit(validateOTP)} className="w-2/3 space-y-6">
        <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your Email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
          <Button type="submit" className="bg-slate-600 ">Validate OTP</Button>
          <Toaster/>
          <Button type="button" className="bg-slate-800 " >Send OTP</Button>
          </div>
        </form>
      </Form>
        </div>
      </div>
      </div>
    </div>
    
  )
}