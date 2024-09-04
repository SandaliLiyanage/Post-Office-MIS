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
  password: z.string().min(5, {
  }),
})

export default function Login() {
  const navigate = useNavigate();
  const { saveUser } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function handleLoginData(values: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting login data", values)
      const user = await axios.post("http://localhost:5000/auth/login", values)
      console.log("Data submitted successfully", user.data)
      saveUser(
        {
          name: user.data.name,
          role: user.data.role,
          token: user.data.token,
          postalCode: user.data.postalCode,
          postOfficeName: user.data.postOfficeName,
          email: user.data.email
        }
      )
      navigate('/dashboard')
    } catch (error) {
      console.error("Error submitting login data", error)
    }
    console.log(values)
  }

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
      <div className=" bg-white rounded-lg h-96 lg:flex">
      {/* <div className="lg:w-1/2 flex lg:justify-center lg:items-center">
        <h1 className="lg:text-3xl pt-4 pl-8">Post Office Management Information System</h1>
      </div> */}
      <div className="mr-20 ml-20 mt-8 flex flex-col items-end ">
        <div>
        <div>
        <h1 className="text-2xl mb-5 mt-5">Employee Login</h1>
        </div>
 
        <Form {...form}>
        <form onSubmit= {form.handleSubmit(handleLoginData)} className="space-y-8">
          <div>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" 
                    placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div >
          <div className="flex justify-between gap-2">
            <Button type="submit" className="bg-teal-600" >Log in</Button>
            <Button type="button" className="bg-slate-700" onClick={() => navigate('/forgotpassword')}>Forgot Password</Button>
          </div>
        </form>
      </Form>
        </div>
      </div>
      </div>
    </div>
  )
}
