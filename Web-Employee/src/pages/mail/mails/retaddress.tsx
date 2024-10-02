import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command";
import { useState } from "react";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import { useLocation } from 'react-router-dom';

export default function Retaddress() {
    const [search, setSearch] = useState<string>("");
    const [searchSelect, setSearchSelect] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [addressID, setAddressID] = useState<number|null>(null);
    const [addressMap, setAddressMap] = useState<{[key: string]: number}| null>(null);
    const changeAddress = async ()=>{
        try{
            const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const mailID = queryParams.get('mailID'); 
        console.log(mailID)
            const  res = await axios.post(
                "http://localhost:5000/mail/addresssearch",
              {addressID, mailID}
            )
        }catch(error){
          console.log(error)
        }
    }
    const getAddress = async (search: string) => {
        try {
          if (search !== "") {
            console.log("this is search", search)
            const result= await axios.post(
              "http://localhost:5000/mail/addresssearch",
              {search}
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
    
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl font-bold">Change Return Address</p>
      </div>
              <div >
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
            <div className="flex justify-end mt-5">
                <Button onClick={() => changeAddress()}>Change the Return Address</Button>
            </div>
      </div>    
  )
}
