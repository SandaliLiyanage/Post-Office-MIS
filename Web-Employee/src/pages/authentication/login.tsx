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
          name: user.data.employeeName,
          role: user.data.role,
          token: user.data.token,
          postalCode: user.data.postalCode,
        }
      )
      navigate('/dashboard')
    } catch (error) {
      console.error("Error submitting login data", error)
    }
    console.log(values)
  }

  return (
    <div className="bg-stone-300 bg-opacity-15 min-h-screen flex items-center justify-center">
      <div className="flex justify-center">
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
            <Button type="submit">Log in</Button>
            <Button type="button"onClick={() => navigate('/forgotpassword')}>Forgot Password</Button>
          </div>
        </form>
      </Form>
      </div>
    </div>
  )
}
