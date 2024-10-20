import { Button } from "../../../components/ui/button";
import { Printer } from 'lucide-react';
import { Trash } from 'lucide-react';
import JsBarcode from 'jsbarcode';
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { useState, useEffect } from "react";
import { MailResponse } from './PageMailDetails';
import { Label } from "../../../components/ui/label";
import { useNavigate } from "react-router-dom";

export default function PageReceipt() {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [mailResponse, setResponse] = useState<MailResponse[]>();
  const [total, setTotal] = useState<number>(0);
  const reactToPrintFn = useReactToPrint({ contentRef });

    useEffect(() => {
        const fetchMailDetails = () => {
          const localMailStorage = localStorage.getItem("confirmedMailArray");
          const total = localStorage.getItem("total");
          console.log(total, "total")
            if (total) {
                
                setTotal(parseInt(total));
            }
          if (localMailStorage) {
            setResponse(JSON.parse(localMailStorage));
          }
        };
    
        fetchMailDetails(); // Fetch initial mail details
      }, []); 

    const generateBarcode = (mailID: number) => {
        const barcodeElement = document.getElementById(`barcode-${mailID}`);
        const ID =  mailID.toString();
        JsBarcode(barcodeElement, ID,{
          height: 40,
        });
        console.log("generating barcode")
      } 

      useEffect(() => {
        if (mailResponse && Array.isArray(mailResponse)) {
            mailResponse.forEach(mail => {
                generateBarcode(mail.mailID);
            });
        }
    }, [mailResponse]);

  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
    <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
      <p className="text-xl font-bold">Receipt</p>
    </div>
        <div>
            <p className="font-semibold">The Total Amount = Rs: {total}</p>
        </div>
        {mailResponse &&
       mailResponse.map((mail, index) => (
        <div>
        <div key={index} className="m-5 p-4 bg-white ">
          <div className="flex justify-between"> 
          <div className="flex justify-start">
            <Label className="text-sky-800">Mail {index + 1}</Label>
            </div>
            <div>
            <div ref={contentRef}></div>
            <Button className="btn bg-white "  size="icon" onClick={()=>reactToPrintFn()}><Printer color="black" size={18}  data-testId="print-barcode-button"/></Button>
            </div>
          </div>
          <div className="grid grid-cols-6">
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
          <div ref={contentRef}>
          <svg id={`barcode-${mail.mailID}`  } height="100"></svg>
          </div>
          </div>
        </div>
        </div>
      )) }
      <div className="flex justify-between ml-10 mb-8">
       <Button className="bg-red-500 px-40" onClick={()=> {
          localStorage.removeItem("mail details");
          localStorage.removeItem("customerDetails");
          localStorage.removeItem("confirmedMailArray");
          navigate("/dashboard/mailorder")
        }}data-testId="end-transaction">End Transaction</Button>
    </div>
    </div>
  )
}
