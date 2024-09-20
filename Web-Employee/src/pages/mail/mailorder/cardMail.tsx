import { useState, useEffect } from "react";
import { MailDetailsType } from "./PageMailDetails";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Printer } from 'lucide-react';
import { Trash } from 'lucide-react';
import {MailResponse} from './PageMailDetails';
import {Barcode} from 'lucide-react';
import JsBarcode from 'jsbarcode';
type CardMailProps = {
  mailArray: MailDetailsType[],
  confirm: boolean,
  price: number|null,
  transaction: boolean,
  confirmedMailArray: MailResponse[];
}


export function CardMail({ mailArray , transaction, confirmedMailArray}: CardMailProps) {
  const [mailDetailsArray, setMailDetailsArray] = useState<MailDetailsType[]>(mailArray);
  
  // Fetch mail details from localStorage on component mount
  useEffect(() => {
    const fetchMailDetails = () => {
      const localMailStorage = localStorage.getItem("mail details");
      if (localMailStorage) {
        setMailDetailsArray(JSON.parse(localMailStorage));
      }
    };

    fetchMailDetails(); // Fetch initial mail details

    // Listen for changes to localStorage
    window.addEventListener("storage", fetchMailDetails);

    return () => {
      window.removeEventListener("storage", fetchMailDetails);
    };
  }, [mailArray]); // Only run on component mount


  const removeMail = (index: number) => {
    const newMailArray = mailDetailsArray.filter((mail, i) => i !== index); // Remove the mail by index
    setMailDetailsArray(newMailArray); // Update state to re-render the UI
    localStorage.setItem("mail details", JSON.stringify(newMailArray)); // Update localStorage
  };

  const generateBarcode = (mailID: number) => {
    const barcodeElement = document.getElementById(`barcode-${mailID}`);
    const ID =  mailID.toString();
    JsBarcode(barcodeElement, ID,);
    console.log("generating barcode")
  } 



  return (
    <div className="mt-16  h-full top-16 bg-slate-300 bg-opacity-25 ">
        <div className="font-bold pt-10 pl-2 pb-4 mt-16 ml-4">
          <p>Current Mail List</p></div>
      
      { !transaction && mailDetailsArray.map((mail, index) => (
        <div key={index} className="m-5  p-4 bg-white">
          <div className="flex justify-between"> 
          <div className="flex justify-start">
            <Label className="text-sky-800">Mail {index + 1}</Label>
            </div>
            {!transaction  && 
          <div className="flex justify-end" >
            <Button className="btn bg-white "  size="icon" onClick={()=>removeMail(index)} ><Trash color="red" size={18} /></Button>
            </div>}
           
          </div>
          <div className="grid grid-cols-2">
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
      { transaction && confirmedMailArray.map((mail, index) => (
        <div key={index} className="m-5  p-4 bg-white">
          <div className="flex justify-between"> 
          <div className="flex justify-start">
            <Label className="text-sky-800">Mail {index + 1}</Label>
            </div>
            {!transaction  && 
          <div className="flex justify-end" >
            <Button className="btn bg-white "  size="icon" onClick={()=>removeMail(index)} ><Trash color="red" size={18} /></Button>
            </div>}
            {transaction && 
            <div>
            <Button className="btn bg-white "  size="icon" onClick={()=> generateBarcode(mail.mailID)}><Barcode color="black" size={18} /></Button>;
            <Button className="btn bg-white "  size="icon" ><Printer color="black" size={18} /></Button>;
            </div>
            }
          </div>
          <div className="grid grid-cols-2">
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
          <div>
            <Label className="text-base">MailID: <p className="text-slate-500 font-light text-sm"> {mail.mailID}</p></Label>
          </div>
          </div>
          <svg id={`barcode-${mail.mailID}`}></svg>
        </div>
      ))}
    </div>
  );
}