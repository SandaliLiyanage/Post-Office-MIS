import {useLocation} from 'react-router-dom';
import { Button } from "../../components/ui/button"
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import {
  FormDescription,
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
import AddressSearch from '../mail/mailorder/address';
import {Toaster} from "../../components/ui/toaster"
import { useToast } from '../../hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ROLES = ['Supervisor', 'Postmaster', 'Receptionist', 'postman', 'dispatcher'] as const;

const formSchema = z.object({
  address: z.string().min(5, {}),
  role: z.enum(ROLES),
  telephone: z.string().min(10, {}),
  email: z.string().email(),
});
export default function Employeeupdate() {
  const { toast } = useToast()

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
      const employeeID =employee.employeeID;
      console.log(employeeID);
      console.log("heeh");
      const response = await axios.post(
        "http://localhost:5000/employee/update",
        {values,
        employeeID}
      )
      if(response.data){
        toast({
          description:response.data,
        })
      }
      console.log("successfully submitted data", response)
      return response
    }catch(error){
    }
  }

  const deleteAccount = async(employeeID: string)=>{
    console.log(employeeID)
    const response  = await axios.post("http://localhost:5000/employee/delete", {employeeID})
    console.log(response)
  }
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
      <p className="text-xl font-bold"> Account Summary </p>
        </div>
        <div className="bg-white p-4 rounded-sm m-4">
        <p className='text-xl mb-8 font-semibold'>Employee</p>
          <p className="m-2 ">Employee Name:  {employee.employeeName}</p>
          <p className="m-2 ">Employee Account:{employee.employeeID} </p>
        </div>
        <div className="bg-white p-4 m-4 rounded-sm">
          <p className='text-xl mb-8 font-semibold'>Update Employee Records</p>
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
                    <Input placeholder= "Updated Employee Role" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                The current role is: {employee.role.toLowerCase()}
              </FormDescription>
                </FormItem>
                
                 )}
                />
            <div className='grid grid-2'>
            <AddressSearch/>
            </div>
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone</FormLabel>
                  <FormControl>
                    <Input placeholder= "Updated Telephone" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                Existing telephone number: {employee.telephone}

              </FormDescription>
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
                    <Input placeholder="Updated Email" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                Existing email: {employee.email}

              </FormDescription>
                </FormItem>
                 )}
                />
           
          </div>
        <Button type="submit" className='bg-teal-600 justify-end' onClick={()=> {
        
      }}>Update</Button>
              <Toaster />

        </form>
      </Form>
      </div>
      <div className="bg-white p-4 rounded-sm m-4">
      
        <p className='text-xl mb-8 font-semibold'>Delete Employee Account</p>
        <div className='flex justify-between'>
          <p>The account will be deleted</p>
        <div className="flex justify-end">
          <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button  variant="outline" className="bg-red-600" onClick={()=>{deleteAccount(employee.employeeID)}}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </div>  
        </div>
          
        </div>
    </div>
  )
}
