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
import {Toaster} from "../../components/ui/toaster";
import { useToast } from '../../hooks/use-toast';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom"
const formSchema = z.object({
  employeeID: z.string().min(3, {
  }),
  password: z.string().min(5, {
  }),
})

export default function Login() {
  const { toast } = useToast()
  const navigate = useNavigate();
  const { saveUser } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeID: "",
      password: "",
    },
  })

  async function handleLoginData(values: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting login data", values)
      const validateID = await axios.post("http://localhost:5000/auth/validateID", values)
      if(validateID.data == true){
      const user = await axios.post("http://localhost:5000/auth/login", values)
      if(user.data.login == true){
      console.log(user.data.login)
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
      navigate('/dashboard')}
      else{
        form.reset();
        toast({
          description: "Invalid Password",
        })
      }
    }
      else{
        form.reset();
        toast({
          description: "Employee ID does not Exist",
        })
      }
    } catch (error) {
      console.error("Error submitting login data", error)
    }
    console.log(values)
  }

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
      <div className=" bg-white rounded-lg h-fit grid grid-cols-2 w-full max-w-3xl">
      <div className="flex justify-center items-center">
      <img src={logo} alt="Post Office Logo" className="w-2/3 h-auto" />
      </div>
      <div className="mr-20 ml-20 mt-8 ">
        <div>
        <div>
        <h1 className="text-2xl mb-5 mt-5">Employee Login</h1>
        </div>
 
        <Form {...form}>
        <form onSubmit= {form.handleSubmit(handleLoginData)} className="space-y-8">
          <div>
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
          <div className="gap-5 flex pb-5">
            <Button type="submit" className="bg-slate-800" >Log in</Button>
            <Toaster/>
            <Button type="button" className="bg-slate-700" onClick={() => navigate('/forgotpassword')}>Forgot Password</Button>
          </div>
          {/* <div className="pb-5">
          <Link className ="mt-5" to='/forgotpassword'>Forgot Password?Reset!</Link>
          </div> */}
        </form>
      </Form>
        </div>
      </div>
      </div>
    </div>
  )
}
