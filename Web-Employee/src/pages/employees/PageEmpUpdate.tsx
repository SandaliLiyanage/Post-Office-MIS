import {useLocation} from 'react-router-dom';
import { Button } from "../../components/ui/button"
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import axios from "axios"
import {useUser} from "../authentication/usercontext"

const ROLES = ['Supervisor', 'Postmaster', 'Receptionist', 'postman', 'dispatcher'] as const;
const {user} = useUser()
const formSchema = z.object({
  address: z.string().min(5, {}),
  role: z.enum(ROLES),
  telephone: z.string().min(10, {}),
  email: z.string().email(),
  postalCode: z.string().min(5, {}),
});
export default function Employeeupdate() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      telephone: "",
    },});	
    const location = useLocation();
    const employee = location.state;
  async function handleUpdate(values: z.infer<typeof formSchema>){
    try{
      const response = await axios.post(
        "http://localhost:5000/employee/update",
        values,
        employee.employeeID,
      )
      console.log("successfully submitted data", response.data)
    }catch(error){

    }
    
  }
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
      <p className="text-xl"> Account Summary </p>
        </div>
        <div className="bg-white p-4 rounded-sm m-4">
        <p className='text-xl mb-8'>Employee</p>
          <p className="m-2">Employee Name: {employee.employeeName} </p>
          <p className="m-2">Employee Account:{employee.employeeID} </p>
        </div>
        <div className="bg-white p-4 m-4 rounded-sm">
          <p className='text-xl mb-8'>Update Employee Records</p>
          <Form {...form}>
        <form onSubmit= {form.handleSubmit(handleUpdate)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Role</FormLabel>
                  <FormControl>
                    <Input placeholder={employee.role.toLowerCase()} {...field} />
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
                    <Input placeholder="address" {...field} />
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
                    <Input placeholder={employee.telephone} {...field} />
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
                    <Input placeholder={employee.email}{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                 )}
                />
            {/* <FormField
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
                /> */}
          </div>
        <Button type="submit" className='bg-teal-600 justify-end' onClick={()=> {navigate("dashboard/employeeRecords")}}>Update</Button>
        </form>
      </Form>
      </div>
      <div className="bg-white p-4 rounded-sm m-4">
        <p className='text-xl mb-8'>Delete Employee Account</p>
        <div className='flex justify-between'>
          <p>The account will be deleted</p>
        <div className="flex justify-end">
          <Button type="submit" className="bg-red-600">Update</Button>
        </div>  
        </div>
          
        </div>
    </div>
  )
}
