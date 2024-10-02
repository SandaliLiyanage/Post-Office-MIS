"use client";
import { generateInvoice } from "./generatePDF";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { useUser } from "@/pages/authentication/usercontext";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect } from "react";
import { Label } from "../../../components/ui/label";

import { Toaster } from "../../../components/ui/toaster";
import { useToast } from "../../../hooks/use-toast";
import {CardMail} from "./cardMail";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"


const formSchema = z.object({
  mailType: z.string().min(1, {}),
  recepientName: z.string().min(5, {}),
  address: z.string().min(1, {}),
  weight: z.coerce.number().min(1, { message: "Weight must be at least 1" }) 
  .max(2000, { message: "Weight cannot exceed 2000" }),
});

export type MailDetailsType = {
  price: number | null;
  mailType: string;
  recepientName: string;
  address: string;
  weight: number;
  
};

export interface MailResponse{
  mailType: string;
  recepientName: string;
  recepientAddressID: number;
  mailID: number;
  bundleID: number;
  mailstatus: string;
  transactionID: number;
  weight: number | string | null;
  price: number | string | null;
  postalCode: string;
}

export default function MailDetails() {
  const { toast } = useToast();
  const { user } = useUser();
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchSelect, setSearchSelect] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [addressID, setAddressID] = useState<number | null>(null);
  const [addressMap, setAddressMap] = useState<{
    [key: string]: number;
  } | null>(null);
  const [mailArray, setMailArray] = useState<MailDetailsType[]>([]);
  const [transaction, setTransaction] = useState<boolean>(false);
  const navigate = useNavigate();
  const [confirmedMailArray, setConfrimedMailArray] = useState<MailResponse[]>([]);
  const [customerName, setCustomerName] = useState<String>("");
  const [customerAddress, setCustomerAddress] = useState<String>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mailType: "",
      recepientName: "",
      address: "",
      weight: undefined
     
    },
  });
  const getAddress = async (search: string) => {
    try {
      if (search !== "") {
        console.log("this is search", search);
        const result = await axios.post(
          "http://localhost:5000/mail/addresssearch",
          { search }
        );
        console.log(result.data);
        setAddressMap(result.data);
        const addressArray: string[] = Object.keys(result.data);
        console.log(addressArray);
        setSearchResults(addressArray);
        console.log("this is searchresults", searchResults);
      }
    } catch (error) {
      console.log("This is the error", error);
    }
  };
  //calculate price of the mail
  async function onClickCalculate() {
    const { mailType, weight } = form.getValues();
    if (mailType === "" || weight === undefined) {
      toast({
        description: "Fill mail type and weight",
      });
    }
    else if ( weight > 2000 || weight<0 ) {
      toast({
        description: "Weight should be within 0 and 2000",
      });
    }else{
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
    console.log("Data submitted successfully", response.data);
    setError(null);
    setPrice(response.data);
    }
    
  }

  //set the details of the mail to local storage(enable multiple mailitems to a single transaction)
  async function onConfirm(values: z.infer<typeof formSchema>) {4
    console.log("in confirm")
    try {
      const mailDetails = { ...values, price, addressID };
      let localMailStorage = localStorage.getItem("mail details");
      console.log("in confirm", localMailStorage);
      if (localMailStorage && price && !confirm) {
        let array: MailDetailsType[] = [];
        let item2 = JSON.parse(localMailStorage);
        item2.forEach((i: MailDetailsType) => {
          array.push(i);
        });
        array.push(mailDetails);
        setMailArray(array)
        localStorage.setItem("mail details", JSON.stringify(array));
        setConfirm(true);
        const console2 = localStorage.getItem("mail details");
        console.log("in if", console2);
      } else if (price && !confirm) {
        let array: MailDetailsType[] = [];
        array.push(mailDetails);
        localStorage.setItem("mail details", JSON.stringify(array));
        setConfirm(true);
        setMailArray(array)
      }
    } catch (error) {
      console.error("Error submitting data", error);
    }
  }
  const handleChange = (value: string) => {
    setSearch(value);
    getAddress(value);
  };

  useEffect(() => {
    if (search.length > 0) {
      form.setValue("address", search);
    }   
    const customerDetails = localStorage.getItem("customerDetails")
    if(!customerDetails){
      navigate("/dashboard/mailorder")
    } 
  }, [search]);

  useEffect(()=>{
    const customerDetails = localStorage.getItem("customerDetails")
    if(customerDetails){
      const customer = JSON.parse(customerDetails)
      console.log(customer)
      setCustomerAddress(customer.values.address)
      setCustomerName(customer.values.customerName)
      console.log(customerName, " hi")
      console.log(customerAddress, " hi address")

    }
    if(!customerDetails){
      navigate("/dashboard/mailorder")
    }
  }, [])

  const onConfirmTransaction = async function (mailArray: MailDetailsType[]) {
    if(mailArray.length > 0){
    toast({
      description: "Transaction Completed",
    });
    const postalCode = user?.postalCode;
    const localCustomerStorage = localStorage.getItem("customerDetails");

    if (confirm && price && localCustomerStorage) {
      const customerDetails = JSON.parse(localCustomerStorage);
      const response = await axios.post(
        "http://localhost:5000/mail/mailDetails",
        {
          mailArray,
          postalCode,
          customerDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const total = response.data.total
      console.log(total)
      console.log(total)
      generateInvoice(
        customerDetails.name,
        customerDetails.telephone,
        mailArray,
        total
      );
      
      localStorage.removeItem("customerDetails");
      setTransaction(true)
      console.log("adata", response)
      setConfrimedMailArray(response.data.result)
      console.log(confirmedMailArray)
      console.log("Data submitted successfully", response.data);
      // navigate("/dashboard/endtransaction")
    }else{
      toast({
        description: "Zero mails added",
      });
    }
    console.log("in", mailArray);
    
  };
  } 
  return (
    
    <div className="flex overflow-hidden ">
      <div className=" flex-[2_2_0%] pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col static">
        <div className="font-bold top-16 pt-8 pb-8 mt-16 flex justify-between flex-col">
          <p className="text-xl font-bold">Mail Order</p>
          
          {/* <div className="mt-4 flex justify-between p-3">
          <div className="flex justify-start">
            <Label className="text-base">Customer Name: <p className="text-slate-500 font-light text-sm"> {customerName}</p></Label>
          </div>
          <div className="flex justify-end">
            <Label className="text-base">Customer Address: <p className="text-slate-500 font-light text-sm"> {customerAddress}</p></Label>
          </div>

          </div> */}
          <div className="flex justify-end gap-2 ">
          </div>
        </div>
        <div className="p-8 bg-">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onConfirm)}>
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
              <div>
                <Label>Recepient Address</Label>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="relative">
                  <Command className="mt-2">
                    <CommandInput
                      placeholder="Address"
                      onValueChange={(value) => {
                        handleChange(value);
                        console.log(value);
                      }}
                      value={search}
                    />
                    <CommandList className="">
                      {search != "" && searchSelect == false && (
                        <div className="absolute top-full left-0 w-full h-min">
                          <CommandEmpty>No address found.</CommandEmpty>
                        </div>
                      )}
                      {search != "" && (
                        <CommandGroup
                          className="absolute top-full left-0 w-full h-[90px] overflow-y-auto rounded-md 
                     bg-white"
                        >
                          {searchResults?.map((result) => (
                            <CommandItem
                              key={result}
                              onSelect={(value) => {
                                setSearch(value);
                                setSearchSelect(true);
                                setSearchResults([]);
                                if (addressMap) {
                                  console.log(addressMap[value]);
                                  setAddressID(addressMap[value]);
                                  console.log(addressMap);
                                }
                              }}>
                              {result}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </div>
              </div>
          <FormField
          control={form.control}
          name="mailType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}> 
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Mail Type " className="text-slate-500" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="normal mail">normal mail</SelectItem>
                  <SelectItem value="registered mail">register mail</SelectItem>
                  <SelectItem value="courier">courier</SelectItem>
                </SelectContent>
              </Select>
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
                      <Input placeholder="Weight"   {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between mt-7">
              <div className="flex justify-start gap-4">
                <Button
                  className="bg-white border border-slate-300 text-slate-800"
                  onClick={onClickCalculate}
                  type="button"
                >
                  Calculate
                </Button>
                <Toaster />
                {error !== null && price == null && (
                  <div className="text-sm text-red-500 p-2 rounded-sm font-bold">
                    {error}
                  </div>
                )}
                {price !== null && (
                  <div className="bg-stone-300 bg-opacity-10 p-2 border-opacity-45">{price}</div>
                )}
              </div>

              <div className="flex justify-end gap-2 ">

                <Button type="submit" className="bg-white border border-slate-300  text-slate-800">
                  Save Mail Details
                </Button>

                <Button
              type="button"
              className="bg-white border-b-2 border border-slate-300 text-slate-800"
              onClick={() => {
                if (confirm) {
                  // form.reset()
                  // setSearch("")
                  // setPrice(null)
                  location.reload()
                  
                }
                setConfirm(false);
              }}>
              Add new mail item
            </Button>
                <Toaster />
              </div>
            </div>
          </form>
        </Form>
    
   

        <div className=" flex mt-32 justify-between">
        <div className="flex justify-start  mr-10">
        <Button
        type="button"
        className="bg-slate-300 text-black flex justify-start"
        onClick={() => {
          navigate("/dashboard/mailorder")
          localStorage.removeItem("mail details");
          localStorage.removeItem("customerDetails");

          
        }}
      >
        Cancel Transacion
      </Button>
        </div>
      
      <div className="flex justify-end">
      <Button 
        type="button"
        className="bg-slate-600 "
        onClick={() => {
          const localMailStorage =
            localStorage.getItem("mail details");
          if (localMailStorage) {
            onConfirmTransaction(JSON.parse(localMailStorage));
            console.log("in if", JSON.parse(localMailStorage));
            form.reset()
            localStorage.removeItem("mail details");
            localStorage.removeItem("customerDetails");
            console.log(confirmedMailArray, "hi hi");
          }
        }}>
        End Transaction and Print Receipt
      </Button>
      <Toaster />
      </div>
      </div>
      </div>
      </div>

      <div>

      </div>
      <div className="flex-1 overflow-auto">
          <CardMail mailArray={mailArray} confirm ={ confirm}  price={price} transaction={transaction} confirmedMailArray={confirmedMailArray}/>
      </div>
    </div>
    
  );
}
