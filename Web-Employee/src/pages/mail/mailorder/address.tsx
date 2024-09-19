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

export default function AddressSearch() {
    const [search, setSearch] = useState<string>("");
    const [searchSelect, setSearchSelect] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [addressID, setAddressID] = useState<number | null>(null);
    const [addressMap, setAddressMap] = useState<{
      [key: string]: number;
    } | null>(null);

    const handleChange = (value: string) => {
        setSearch(value);
        getAddress(value);
      };
    
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
  return (
    <div className="grid grid-cols-2">

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
                    console.log("hee", value);
                    console.log(addressMap[value]);
                    setAddressID(addressMap[value]);
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
  )
}
