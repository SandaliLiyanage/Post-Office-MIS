"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
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

const formSchema = z.object({
  customerName: z.string(),
  address: z.string().min(5, {}),
  telephone: z.string().min(10, {}),
});

export default function MailOrder() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [searchSelect, setSearchSelect] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);

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
        const response = await axios.post(
          "http://localhost:5000/mail/addresssearch",
          {search}
        );
        setSearchResults(response.data);
        console.log("this is searchresults", searchResults)
        
      }
    } catch (error) {
      console.log("This is the error", error);
    }
  };

  const handleChange = (value: string) => {
    console.log("This is the address so far", value);
    setSearch(value);
    getAddress(value);
  };

  useEffect(() => {
    if (search.length > 0) {
      form.setValue("address", search);
    }
  }, [search]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("he he")
    console.log("he he proceed is working", values);
  }

  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl">Mail Order</p>
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
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input placeholder="Telephone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Command>
              <CommandInput
                placeholder="Address"
                onValueChange={(value) => {
                  handleChange(value);
                  console.log(value);
                }}
                value={search}
              />
              <CommandList>
                {search != "" &&
                  searchSelect == false && (
                    <CommandEmpty>No address found.</CommandEmpty>
                  )}
                {search != "" && (
                  <CommandGroup>
                    {searchResults?.map((result) => (
                      <CommandItem
                        key={result}
                        onSelect={(value) => {
                          setSearch(value);
                          setSearchSelect(true);
                          setSearchResults([]);
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
          <Button type="submit" 
          onClick={() => navigate("/dashboard/maildetails")}
          >
             Proceed </Button>
        </form>
      </Form>
    </div>
  );
}
