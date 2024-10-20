"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { CardMail } from "./PageMailLIst";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {IP} from "../../../../config";
const formSchema = z.object({
  mailType: z.string().min(1, {}),
  recepientName: z.string().min(5, {}),
  address: z.string().min(1, {}),
  weight: z.coerce
    .number()
    .min(1, { message: "Weight must be at least 1" })
    .max(2000, { message: "Weight cannot exceed 2000" }),
});
export type MailDetailsType = {
  price: number | null;
  mailType: string;
  recepientName: string;
  address: string;
  weight: number;
};
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
export interface MailResponse {
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
  const transaction = false;
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState<String>("");
  const [customerAddress, setCustomerAddress] = useState<String>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mailType: "",
      recepientName: "",
      address: "",
      weight: undefined,
    },
  });
  const getAddress = async (search: string) => {
    try {
      if (search !== "") {
        console.log("this is search", search);
        const result = await axios.post(
          `http://${IP}/mail/addresssearch`,
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
    } else if (weight > 2000 || weight < 0) {
      toast({
        description: "Weight should be within 0 and 2000",
      });
    } else {
      const calculationData = { mailType, weight };
      const response = await axios.post(
        `http://${IP}/mail/calculatePrice`,
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
  async function onConfirm(values: z.infer<typeof formSchema>) {
    console.log("in confirm");
    try {
      const mailDetails = { ...values, price, addressID };
      let localMailStorage = localStorage.getItem("mail details");
      console.log("in confirm", localMailStorage);
      if (addressID) {
        if (localMailStorage && price && !confirm) {
          let array: MailDetailsType[] = [];
          let item2 = JSON.parse(localMailStorage);
          console.log("in if", item2);
          if (item2.length > 0) {
            console.log("in if");
            item2.forEach((i: MailDetailsType) => {
              array.push(i);
            });
          }

          array.push(mailDetails);
          setMailArray(array);
          localStorage.setItem("mail details", JSON.stringify(array));
          setConfirm(true);
          const console2 = localStorage.getItem("mail details");
          location.reload();
          console.log("in if", console2);
        } else if (price && !confirm) {
          let array: MailDetailsType[] = [];
          array.push(mailDetails);
          localStorage.setItem("mail details", JSON.stringify(array));
          setConfirm(true);
          location.reload();
          setMailArray(array);
        }
      } else {
        toast({
          description: "Address not verified",
          action: (
            <div>
              <Button
                className="p-3 text-white bg-slate-700 hover:bg-slate-700"
                onClick={() => navigate("/dashboard/addAddress")}
                size={"md"}
              >
                Add address
              </Button>
            </div>
          ),
        });
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
    const customerDetails = localStorage.getItem("customerDetails");
    if (!customerDetails) {
      navigate("/dashboard/mailorder");
    }
  }, [search]);

  useEffect(() => {
    const customerDetails = localStorage.getItem("customerDetails");
    if (customerDetails) {
      const customer = JSON.parse(customerDetails);
      console.log(customer);
      setCustomerAddress(customer.values.address);
      setCustomerName(customer.values.customerName);
      console.log(customerName, " hi");
      console.log(customerAddress, " hi address");
    }
    if (!customerDetails) {
      navigate("/dashboard/mailorder");
    }
  }, []);

  return (
    <div>
      <div className="flex overflow-hidden ">
        <div className=" flex-[2_2_0%] pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col ">
          <div className="font-bold top-16 pt-8 pb-8 mt-16 flex justify-between">
            <p className="text-xl font-bold " data-testId="cypress-mailorder-title">Mail Order</p>
          </div>
          <div className="flex justify-end  mr-10"></div>
          <div className="p-8">
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
                    <div className="relative">
                      <Command className="mt-2">
                        <CommandInput
                          placeholder="Address"
                          onValueChange={(value) => {
                            handleChange(value);
                            console.log(value);
                          }}
                          value={search}
                          data-testId="cypress-address_search"
                        />
                        <CommandList >
                          {search != "" && searchSelect == false && (
                            <div className="absolute top-full left-0 w-full h-min">
                              <CommandEmpty>No address found.</CommandEmpty>
                            </div>
                          )}
                          {search != "" && (
                            <CommandGroup data-testid="suggestion-dropdown"
                              className="absolute top-full left-0 w-full h-[90px] rounded-md 
                     bg-white"
                            >
                              {searchResults?.map((result) => (
                                <CommandItem
                                data-testid="suggestion-item"
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
                  <FormField
                    control={form.control}
                    name="mailType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mail Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="mailtype-dropdown">
                              <SelectValue
                                placeholder="Mail Type "
                                className="text-slate-500"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent data-testId="mailtypeselect-dropdown">
                            <SelectItem value="normal mail" data-testid="select-item">
                              Normal mail
                            </SelectItem>
                            <SelectItem value="registered mail">
                              Register Mail
                            </SelectItem>
                            <SelectItem value="courier">Courier</SelectItem>
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
                        <FormLabel>Weight (g)</FormLabel>
                        <FormControl>
                          <Input placeholder="Weight" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between mt-7">
                  <div className="flex justify-start gap-4">
                    <Button data-testid="calculate-button"
                      className="bg-slate-600 text-white hover:bg-slate-300 hover:text-black"
                      onClick={onClickCalculate}
                      type="button"
                    >
                      Calculate Price
                    </Button>
                    <Toaster />
                    {error !== null && price == null && (
                      <div className="text-sm text-red-500 p-2 rounded-sm font-bold">
                        {error}
                      </div>
                    )}
                    {price !== null && (
                      <div className="bg-stone-300 bg-opacity-0 p-2 border-opacity-45">
                        Rs: {price}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 ">
                    {price && !confirm && (
                      <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                        <Button
                        type="submit"
                        className="bg-green-600 text-white hover:bg-slate-300 hover:text-black"
                        // className="btn bg-stone-300 bg-opacity-5 hover:bg-stone-300 hover:bg-opacity-5"
                      >
                        Add to the List
                        {/* <MailPlus color="black" size={30} /> */}
                      </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to the List</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                
                      
                    )}
                    <Toaster />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="flex-1 overflow-auto ">
          <CardMail
            mailArray={mailArray}
            confirm={confirm}
            price={price}
            transaction={transaction}
          />
        </div>
      </div>
    </div>
  );
}
