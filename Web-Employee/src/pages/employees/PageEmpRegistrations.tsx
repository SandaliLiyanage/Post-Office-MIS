"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Toaster } from "../../components/ui/toaster";
import { useToast } from "../../hooks/use-toast";
const ROLES = [
  "SUPERVISOR",
  "POSTMASTER",
  "RECEPTIONIST",
  "POSTMAN",
  "DISPATCHER",
] as const;

const formSchema = z.object({
  employeeName: z.string().min(1, {}),
  employeeID: z.string().min(1, {}),
  role: z.enum(ROLES),
  telephone: z.string().min(10, {}),
  email: z.string().email(),
  postalCode: z.string().min(5, {}),
});

export default function EmpRegistration() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      employeeID: "",
      telephone: "",
      email: "",
      postalCode: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const response = await axios.post(

        "http://localhost:5000/employee/registration",

        values
      );
      console.log("Data submitted successfully", response.data);
      if(response.data == null){
        toast({
          description: "Registration Unsuccessful"
        });
        form.reset()
      }
      else{
        toast({
          description: "Successfully registered"
        })
        form.reset()
      }
    } catch (error) {
      console.error("Error submitting data", error);
    }
    console.log(values);
  }

  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl font-bold">Employee Registration</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <FormField
              control={form.control}
              name="employeeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Employee Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeID"
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
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone</FormLabel>
                  <FormControl>
                    <Input placeholder="Telephone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                    <Input placeholder="Postal Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                 )}
                />
                <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Employee Role" className="text-slate-500" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="POSTMASTER">postmaster</SelectItem>
                  <SelectItem value="RECEPTIONIST">receptionist</SelectItem>
                  <SelectItem value="DISPATCHER">dispatch record manager</SelectItem>
                  <SelectItem value="POSTMAN">postman</SelectItem>
                </SelectContent>
              </Select>
    
              <FormMessage />
            </FormItem>
          )}
        />    
          </div>
          <Button className="bg-teal-800" type="submit">Submit</Button>
          <Toaster/>
        </form>
      </Form>
    </div>
  );
}
