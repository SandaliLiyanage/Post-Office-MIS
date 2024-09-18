"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
  newPassword: z.string(),
  passwordCopy: z.string().min(5, {
  }),
})


export default function SetPassword() {

    const navigate = useNavigate();
    const { saveUser } = useUser();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          newPassword: "",
          passwordCopy: "",
        },
    })
  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
    <div className=" bg-white rounded-lg h-96 lg:flex">
    <div className="mr-20 ml-20 mt-8 flex flex-col items-end ">
      <div>
      <div>
      <h1 className="text-2xl mb-5 mt-5">Set Password</h1>
      </div>

      <Form {...form}>
      <form className="space-y-8">
        <div>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="New Password" {...field} />
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
                  <Input placeholder="Confirm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div >
        
          <Button type="submit" className="bg-slate-600 " >Confirm Password</Button>
          
      </form>
    </Form>
      </div>
    </div>
    </div>
  </div>
)
}
