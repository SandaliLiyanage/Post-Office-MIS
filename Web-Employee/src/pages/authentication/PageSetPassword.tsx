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
  newPassword: z.string(),
  passwordCopy: z.string().min(5, {
  }),
})


export default function SetPassword() {
  const { toast } = useToast()
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        newPassword: "",
        passwordCopy: "",
      },
  })
  const setPassword = async function(values: z.infer<typeof formSchema>){
    console.log("setting the password");
    const queryParams = new URLSearchParams(location.search);
    const employeeID = queryParams.get('employeeID'); 
    console.log(employeeID)
    if(employeeID){
    const response = await axios.post("http://localhost:5000/auth/setpassword", {
      values, employeeID} );
    console.log(response.data)
    form.reset()
    if(response.data == "password updated"){
      localStorage.removeItem("employeeID");
      toast({
        description:"Password Updated",
      })
      navigate("/")
    }else{
      toast({
        description:response.data,
      })
    }
    
    }

  }
  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
    <div className=" bg-white rounded-lg h-96 lg:flex">
    <div className="mr-20 ml-20 mt-8 flex flex-col items-end ">
      <div>
      <div>
      <h1 className="text-2xl mb-5 mt-5">Set Password</h1>
      </div>

      <Form {...form }>
      <form onSubmit= {form.handleSubmit(setPassword)} className="space-y-8">
        <div>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" 
                    placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordCopy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" 
                    placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div >
        
          <Button type="submit" className="bg-slate-600 " >Confirm Password</Button>
          <Toaster/>
      </form>
    </Form>
      </div>
    </div>
    </div>
  </div>
  )
}
