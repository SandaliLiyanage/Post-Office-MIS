"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"

import { Button } from "../../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { useUser } from "@/pages/authentication/usercontext"

const formSchema = z.object({
  mailType: z.string().min(1, {}),
  recepientName: z.string().min(5, {
  }),
  address: z.string().min(10, {}),
  weight: z.string().min(1, {}),
})

export default function MailDetails() {
  const {user} = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mailType: "",
      recepientName: "",
      address: "",
      weight: "",
    },
  })
    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        const role = user?.role;
        console.log("This is the postmaster",role)
        const response = await axios.post(
          "http://localhost:5000/mail/customerDetails", 
          values, 
          {
            headers: {
              Authorization: `Bearer ${user?.token}`, 
            },
          }
        );
        console.log("Data submitted successfully", response.data)
      } catch (error) {
        console.error("Error submitting data", error)
      }
      console.log(values)
    }
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl">Mail Order</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField
              control={form.control}
              name="recepientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recepient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Recepient Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mailType"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Mail Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input placeholder="Weight" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between" >
          <Button className="bg-teal-600" type="button">Calculate</Button>
          <Button type="submit">Add Mail</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
