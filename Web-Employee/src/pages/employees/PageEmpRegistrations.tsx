"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
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
import { useUser } from "../authentication/usercontext";

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
});

export default function EmpRegistration() {
  const { user } = useUser();
  const { toast } = useToast();
  const [password, setPassword] = useState<string>(""); // Use state to store the password

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      employeeID: "",
      telephone: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(user, "user", user?.role, user?.postalCode);
    try {
      if (user && user.role == "POSTMASTER" && user.postalCode) {
        const postalCode = user.postalCode;
        console.log("in if", postalCode, user);
        const newValue = { ...values, postalCode, password }; 
        console.log(newValue)
        const response = await axios.post(
          "http://localhost:5000/employee/registration",
          newValue
        );
        console.log("Data submitted successfully", response.data);
        form.reset();
        if (response.data == null) {
          toast({
            description: "Registration Unsuccessful",
          });
          form.reset();
        } else {
          toast({
            description: "Successfully registered",
          });
          form.reset();
        }
      }
    } catch (error) {
      console.error("Error submitting data", error);
    }
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Employee Role" className="text-slate-500" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="POSTMASTER">Postmaster</SelectItem>
                      <SelectItem value="RECEPTIONIST">Receptionist</SelectItem>
                      <SelectItem value="DISPATCHER">Dispatch Record Manager</SelectItem>
                      <SelectItem value="POSTMAN">Postman</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
                <Button className="bg-teal-800" type="submit">Submit</Button>
            <Toaster />
        </form>
      </Form>
    </div>
  );
}
