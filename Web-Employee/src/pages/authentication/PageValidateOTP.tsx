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
import { useUser } from './usercontext';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"

const formSchema = z.object({
  pin: z.string(),
  
})


export default function ValidateOTP() {

    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        pin: "",
       
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
      <form  className="w-2/3 space-y-6">
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
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
        <Button type="submit" className="bg-slate-600 " onClick={()=>navigate("/setpassword")}>Validate OTP</Button>
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