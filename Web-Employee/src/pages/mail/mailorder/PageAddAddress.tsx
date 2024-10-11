import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../../components/ui/form";
import {Button} from "../../../components/ui/button"
import { z } from "zod";
import {Input} from "../../../components/ui/input"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import axios from 'axios';
import {Toaster} from "../../../components/ui/toaster"
import { useToast } from "../../../hooks/use-toast";
const formSchema = z.object({
    addressNo: z.string().min(1, {}),
    streetName: z.string().min(2, {}),
    locality: z.string().min(2, {}),
    postalCode: z.string().min(5, {})
  });
export default function Addaddress() {
const { toast } = useToast();

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        streetName: "",
        addressNo: "",
        locality: "",
        postalCode: ""
    },});
function handleSubmit(values: z.infer<typeof formSchema>){
    console.log(values, "hierer")

    if(values){
        toast({
            description: "Address Updated ",})
    }

    return 45
}
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
    <div>
    <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
      <p className="text-xl font-bold">Add New Address</p>
    </div>
     <div>
       <Form {...form}>
        <form onSubmit= {form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField
              control={form.control}
              name="addressNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Number</FormLabel>
                  <FormControl>
                    <Input placeholder= "Address Number" {...field} />
                  </FormControl>
                  <FormMessage />
                
                </FormItem>
                 )}
                />
         
            <FormField
              control={form.control}
              name="streetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Name</FormLabel>
                  <FormControl>
                    <Input placeholder= "Street name" {...field} />
                  </FormControl>
                  <FormMessage />
                 
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locality</FormLabel>
                  <FormControl>
                    <Input placeholder="Locality" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                 )}
                />
             <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder= "Postal code" {...field} />
                  </FormControl>
                  <FormMessage />
                 
                </FormItem>
              )}
            />
           
          </div>
        <Button type="submit" className='bg-green-600 justify-end' onClick={()=> {
        
      }}>Save new Address and Send for verification</Button>

      </form>
      </Form>
    </div>
   </div>
</div>
  )
}