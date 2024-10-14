import { useState, useEffect } from "react";
import { MailDetailsType } from "./PageMailDetails";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Trash } from "lucide-react";
import { MailResponse } from "./PageMailDetails";
import JsBarcode from "jsbarcode";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Toaster } from "../../../components/ui/toaster";
import { useToast } from "../../../hooks/use-toast";
type CardMailProps = {
  mailArray: MailDetailsType[];
  confirm: boolean;
  price: number | null;
  transaction: boolean;
};
import { useUser } from "@/pages/authentication/usercontext";
import axios from "axios";
import { generateInvoice } from "./generatePDF";
import { useNavigate } from "react-router-dom";

export function CardMail({ mailArray, transaction }: CardMailProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [mailDetailsArray, setMailDetailsArray] =
    useState<MailDetailsType[]>(mailArray);
  const [confirmedMailArray, setConfrimedMailArray] = useState<MailResponse[]>(
    []
  );
  const onConfirmTransaction = async function (mailArray: MailDetailsType[]) {
    if (mailArray.length > 0) {
      toast({
        description: "Transaction Completed",
      });
      const postalCode = user?.postalCode;
      const localCustomerStorage = localStorage.getItem("customerDetails");

      if (localCustomerStorage) {
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
        const total = response.data.total;
        console.log(total);
        console.log(total);
        generateInvoice(
          customerDetails.name,
          customerDetails.telephone,
          mailArray,
          total
        );
        localStorage.setItem("total", total);
        localStorage.removeItem("customerDetails");
        console.log("adata", response);
        setConfrimedMailArray(response.data.result);
        localStorage.setItem(
          "confirmedMailArray",
          JSON.stringify(response.data.result)
        );
        console.log(confirmedMailArray);
        console.log("Data submitted successfully", response.data);
        navigate("/dashboard/receipt");
      } else {
        toast({
          description: "Zero mails added",
        });
      }
      console.log("in", mailArray);
    }
  };
  // Fetch mail details from localStorage on component mount
  useEffect(() => {
    const fetchMailDetails = () => {
      const localMailStorage = localStorage.getItem("mail details");
      if (localMailStorage) {
        setMailDetailsArray(JSON.parse(localMailStorage));
      }
      console.log(mailDetailsArray, "in card mail");
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

  return (
    <div className="bg-slate-300 bg-opacity-25 flex-1 flex flex-col min-h-screen">
      <div className="bg-slate-300 bg-opacity-25 min-h-screen">
  <div ><div className="font-bold pt-8 pl-2 pb-4 mt-16 ml-4">
      {/* <p>Ongoing Transaction: Mail List</p> */}
    </div>
    
    <div className="flex justify-between mx-2 gap-2 ">
      <div className="justify-start flex">
      <div className="text-lg font-bold ml-4">
      <p>Ongoing Transaction</p>
    </div>
    </div>
    <div className=" flex justify-end gap-2">
  
          <Button
            type="button"
            className="bg-slate-600 p-2"
            onClick={() => {
              const localMailStorage = localStorage.getItem("mail details");
              if (localMailStorage) {
                onConfirmTransaction(JSON.parse(localMailStorage));
                console.log("in if", JSON.parse(localMailStorage));
                console.log(confirmedMailArray, "hi hi");
              }
            }}
            size={"md"}
          >
            Print Receipt
          </Button> 
  
          <Button
                    type="button"
                    className="bg-red-400 text-black flex justify-start p-2"
                    onClick={() => {
                      navigate("/dashboard/mailorder");
                      localStorage.removeItem("mail details");
                      localStorage.removeItem("customerDetails");
                    }}
                    size={"md"} 
                  >
                    Cancel 
          </Button>
          </div>
        </div>
                    </div>
   
      <div className="flex flex-col h-full flex-1 p-2">
        <div className="flex-1 overflow-y-auto">

          {mailDetailsArray &&
            mailDetailsArray.map((mail, index) => (
              <div key={index} className="m-5 p-4 bg-white">
                <div className="flex justify-between">
                  <div className="flex justify-start">
                    <Label className="text-sky-800">Mail {index + 1}</Label>
                  </div>
                  {!transaction && (
                    <div className="flex justify-end">
                      <Button
                        className="btn bg-white "
                        size="icon"
                        onClick={() => removeMail(index)}
                      >
                        <Trash color="red" size={18} />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2">
                  <div>
                    <Label className="text-base">
                      Recepient Name:{" "}
                      <p className="text-slate-500 font-light text-sm">
                        {" "}
                        {mail.recepientName}
                      </p>
                    </Label>
                  </div>
                  <div>
                    <Label className="text-base">
                      Mail Type:{" "}
                      <p className="text-slate-500 font-light text-sm">
                        {" "}
                        {mail.mailType}
                      </p>
                    </Label>
                  </div>
                  <div>
                    <Label className="text-base">
                      Weight:
                      <p className="text-slate-500 font-light text-sm">
                        {" "}
                        {mail.weight}
                      </p>
                    </Label>
                  </div>
                  <div>
                    <Label className="text-base">
                      Price:{" "}
                      <p className="text-slate-500 font-light text-sm">
                        {" "}
                        {mail.price}
                      </p>
                    </Label>
                  </div>
                </div>
                <div>
                  <Label className="text-base">
                    Address:{" "}
                    <p className="text-slate-500 font-light text-sm">
                      {" "}
                      {mail.address}
                    </p>
                  </Label>
                </div>
              </div>
            ))}
        </div>
      
        
        <Toaster />
      </div>
    </div>
    </div>
      
  );
}
