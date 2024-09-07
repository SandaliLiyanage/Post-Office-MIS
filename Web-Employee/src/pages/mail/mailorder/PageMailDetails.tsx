"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useState } from "react"
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
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  mailType: z.string().min(1, {}),
  recepientName: z.string().min(5, {
  }),
  address: z.string().min(1, {}),
  weight: z.string().min(1, {}),
})

export default function MailDetails() {
  const {user} = useUser();
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mailType: "",
      recepientName: "",
      address: "",
      weight: ""
    },
  })
    async function onClickCalculate() {
        const { mailType, weight } = form.getValues(); 
        if (mailType === "" || weight === "") {
          setError("Fill Weight and Mail Type");
          return;
        }
        const calculationData = { mailType, weight };
        const response = await axios.post(
          "http://localhost:5000/mail/calculatePrice", 
          calculationData, 
          {
            headers: {
              Authorization: `Bearer ${user?.token}`, 
            },
          }
        );
        console.log("Data submitted successfully", response.data)
        setError(null);
        setPrice(response.data)
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        const role = user?.role;
        console.log("This is the postmaster",role);
        if (!price) {
          let response = await axios.post(
            "http://localhost:5000/mail/mailDetails", 
            {
              ...values,
              price: price,
            }, 
            {
              headers: {
                Authorization: `Bearer ${user?.token}`, 
              },
            }
          );
        navigate('/dashboard/mailorder'	)
        console.log("Data submitted successfully", response.data)
        }
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
          <div className="flex justify-start gap-4">
            <Button className="bg-slate-700" onClick={onClickCalculate} type="button">Calculate</Button>
            {error !== null && price== null && <div className="text-sm text-red-500 p-2 rounded-sm font-bold">{error}</div> }
            {price !== null && <div className="bg-white p-2 border-opacity-45">{price}</div> }
          </div>         
          <div className="flex justify-end gap-2">
          <Button type="button" className="bg-slate-600">Print Barcode</Button>
          <Button type="submit"  className="bg-teal-600">Confirm Transaction</Button>
          </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

