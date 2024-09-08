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
  telephone: z.string().min(10, {}),
})
type MailDetails={
  price: number | null;
    mailType: string;
    recepientName: string;
    address: string;
    weight: string;
    telephone: string;
}

export default function MailDetails() {
  const {user} = useUser();
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mailType: "",
      recepientName: "",
      address: "",
      weight: "",
      telephone: ""
    },
  })

    //calculate price of the mail
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

    //set the details of the mail to local storage(enable multiple mailitems to a single transaction)
    async function onConfirm(values: z.infer<typeof formSchema>) {
      try {
        const mailDetails = {...values, price}
        let localMailStorage = localStorage.getItem("mail details");
        console.log("in confirm", localMailStorage)
        if(localMailStorage && price && !confirm){
          let array: MailDetails[] = []
          let item2 = JSON.parse(localMailStorage)
          item2.forEach((i: MailDetails) => {
            array.push(i);
          });
          array.push(mailDetails)
          localStorage.setItem("mail details", JSON.stringify(array))
          setConfirm(true)
          const console2 = localStorage.getItem("mail details")
          console.log("in if", console2)

        }else if(price && !confirm){
          let array: MailDetails[] = []
          array.push(mailDetails)
          localStorage.setItem("mail details", JSON.stringify(array))
          setConfirm(true)

        }
      } catch (error) {
        console.error("Error submitting data", error)
      }
    }


  const onConfirmTransaction = async function(mailArray: MailDetails[]){
    const postalCode = user?.postalCode;
    const localCustomerStorage = localStorage.getItem("customerDetails")
    

    if (confirm && price && localCustomerStorage) {
      const customerDetails = JSON.parse(localCustomerStorage)
      let response = await axios.post(
        "http://localhost:5000/mail/mailDetails", 
        {
          mailArray,
          postalCode,
          customerDetails
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
    console.log("in" ,mailArray)
  }
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between flex-col">
      <p className="text-xl">Mail Order</p>

      <div className='flex justify-end gap-2 '>
      <Button type="submit" className="bg-white border-b-2 text-black" onClick={()=>{if(confirm){location.reload()}; setConfirm(false)}}>Add new mail item</Button>
      </div>

      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onConfirm)} className="space-y-8">
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
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Telephone" {...field} />
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
          <Button type="submit" className="bg-slate-600">Confirm</Button>
          <Button type="button" className="bg-slate-600">Print Barcode</Button>
          <Button type="button"  className="bg-teal-600" onClick={ ()=> 
          {const localMalStorage = localStorage.getItem("mail details"); 
            if(localMalStorage){
              onConfirmTransaction(JSON.parse(localMalStorage));
              
              console.log("in if", JSON.parse(localMalStorage));
              localStorage.removeItem("mail details")
            }}}>End Transaction</Button>
          </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

