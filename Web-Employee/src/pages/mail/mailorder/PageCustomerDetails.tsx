"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "../../../components/ui/input";
import { useUser } from "@/pages/authentication/usercontext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {Label} from "../../../components/ui/label"
import { useToast } from "../../../hooks/use-toast";
import { Toaster } from "../../../components/ui/toaster";


import Addaddress from "./PageAddAddress";
const formSchema = z.object({
  customerName: z.string().min(5, {}),
  address: z.string(),
  telephone: z.string().min(10, {}),
});

export default function MailOrder() {
  const { toast } = useToast();
  const {user} = useUser();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [searchSelect, setSearchSelect] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [addressID, setAddressID] = useState<number|null>(null);
  const [addressMap, setAddressMap] = useState<{[key: string]: number}| null>(null);
  const [addAddress, setAddress] =useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      address: "",
      telephone: "",
    },
  });

  const getAddress = async (search: string) => {
    try {
      if (search !== "") {
        console.log("this is search", search)
        const result= await axios.post(
          "http://localhost:5000/mail/addresssearch",
          {search},
          {
            headers: {
              Authorization: `Bearer ${user?.token}`, 
            },
          }
        );
        console.log(result.data)
        setAddressMap(result.data);
        const addressArray: string[] = Object.keys(result.data)
        console.log(addressArray) 
        setSearchResults(addressArray);
        console.log("this is searchresults", searchResults)
      }
    } catch (error) {
      console.log("This is the error", error);
    }
  };

  const handleChange = (value: string) => {
    setSearch(value);
    getAddress(value);
  };

  useEffect(() => {
    if (search.length > 0) {
      form.setValue("address", search);
    }
  }, [search]);

  useEffect(()=>{
    const checkforOngoingTransaction = ()=>{
      const customer = localStorage.getItem("customerDetails");
      const confirmedMailArray = localStorage.getItem("confirmedMailArray");
      
      if(customer != null && confirmedMailArray == null){
        console.log(customer)
        navigate("/dashboard/maildetails" );

      }
      if(customer ==null ){
        localStorage.removeItem("confirmedMailArray");
        localStorage.removeItem("mailDetailsArray");
        localStorage.removeItem("mail details");
      }
    }
    checkforOngoingTransaction()
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(addressID, " address id in onSubmit")
    if(addressID){
      toast(
        {
          description:"Address verified"
        }
      )
      const postalCode = user?.postalCode
      localStorage.setItem("customerDetails", JSON.stringify({values, postalCode, addressID} ));
      const customerDetails = localStorage.getItem("customerDetails");
      console.log("customer Details set",customerDetails);
      navigate("/dashboard/maildetails" );
    }else{
      toast({
      description: "Address not verified",
      action:  <div>
      <Button className="p-3 text-white bg-slate-700 hover:bg-slate-300" onClick={()=>navigate("/dashboard/addAddress") }size={"md"}>Add address</Button>
      </div>,
      })
    }
  }

  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl font-bold">Mail Order</p>
      </div>
      <Form {...form}>
        
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
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
           <div>
              <Label>Address</Label>
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
                      <CommandEmpty >No address found.</CommandEmpty>
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
                                console.log(" address set")
                                console.log("hee", value);
                                console.log(addressMap[value]);
                                const addrressIDfromMap = addressMap[value]
                                console.log(addrressIDfromMap, " this is the value from map"  )
                                setAddressID(addrressIDfromMap);
                                console.log(addressMap);
                                console.log("address ID", addressID);
                              }
                            }}
                          >
                            {result}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </div>
            </div>
            <div className="flex justify-end mt-8">
            <Button type="submit" className=" bg-teal-600" >Proceed </Button>
            <Toaster/>
            </div>
          </div>
        </form>
      </Form>
      {addAddress &&
      <div className="flex justify-end"> 
      <Addaddress/></div>}
    </div>
  );
}
