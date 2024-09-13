import { useState, useEffect } from "react";
import { MailDetailsType } from "./PageMailDetails";
import { Label } from "../../../components/ui/label";

export function CardMail() {
  const [mailDetailsArray, setMailDetailsArray] = useState<MailDetailsType[]>([]);

  // Fetch mail details from localStorage whenever it changes
  useEffect(() => {
    const fetchMailDetails = () => {
      const localMailStorage = localStorage.getItem("mail details");
      if (localMailStorage) {
        setMailDetailsArray(JSON.parse(localMailStorage)); // Update the entire array of mail details
      }
    };

    fetchMailDetails(); // Fetch the initial data

    // Listen for any changes to localStorage (if mail details are updated in another part of the app)
    window.addEventListener("storage", fetchMailDetails);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", fetchMailDetails);
    };
  }, []);

  return (
    <div className="mt-16  h-full top-16 bg-slate-300 bg-opacity-25 ">
        <div className="font-bold pt-10 pl-2 pb-4 mt-16 ml-4">
          <p>Current Mail List</p></div>
   
      {mailDetailsArray.map((mail, index) => (
        <div key={index} className="m-5  p-4 bg-white">
          <div className="grid grid-cols-2 ">
          <div >
            <Label className="text-base">Recepient Name: <p className="text-slate-500 font-light text-sm"> {mail.recepientName}</p></Label>
          </div>
          <div>
            <Label className="text-base">Mail Type: <p className="text-slate-500 font-light text-sm"> {mail.mailType}</p></Label>
          </div>
          <div>
            <Label className="text-base">Weight:<p className="text-slate-500 font-light text-sm">  {mail.weight}</p></Label>
          </div>
          <div>
            <Label className="text-base">Price: <p className="text-slate-500 font-light text-sm"> {mail.price}</p></Label>
          </div>
          
          </div>
          <div>
            <Label className="text-base">Address: <p className="text-slate-500 font-light text-sm"> {mail.address}</p></Label>
          </div>

         
        </div>
      ))}
    </div>
  );
}