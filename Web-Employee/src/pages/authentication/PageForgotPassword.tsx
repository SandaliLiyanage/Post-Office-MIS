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
import { useUser } from './usercontext';

const formSchema = z.object({
  username: z.string(),
  pin: z.string(),
})


export default function ForgotPassword() {

    const navigate = useNavigate();
    const { saveUser } = useUser();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        username: "",
        },
    })
  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
    <div className=" bg-white rounded-lg h-96 lg:flex">
    <div className="mr-20 ml-20 mt-8 flex flex-col items-end ">
      <div>
      <div>
      <h1 className="text-2xl mb-5 mt-5">Reset Password</h1>
      </div>
      <Form {...form}>
      <form className="space-y-8">
        <div className="grid " >
          <FormField
            control={form.control}
            name="username"
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
          <Button type="submit" className="bg-slate-600 mt-5"  onClick={()=>navigate("/validateOTP")}>Send OTP</Button>
        </div >
        
       
      </form>
    </Form>
      </div>
    </div>
    </div>
  </div>
)
}
