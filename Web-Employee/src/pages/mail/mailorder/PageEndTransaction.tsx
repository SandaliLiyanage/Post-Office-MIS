import { Barcode } from "lucide-react";
import JsBarcode from "jsbarcode";
import { Printer } from "lucide-react";
import { MailResponse } from "./PageMailDetails";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";

type finalMailProps = {
  confirmedMailArray: MailResponse[];
};

const generateBarcode = (mailID: number) => {
  const barcodeElement = document.getElementById(`barcode-${mailID}`);
  const ID = mailID.toString();
  JsBarcode(barcodeElement, ID);
  console.log("generating barcode");
};
export default function EndTransaction({ confirmedMailArray }: finalMailProps) {
  <div>
    {confirmedMailArray.map((mail, index) => (
      <div key={index} className="m-5  p-4 bg-white">
        <div className="flex justify-between">
          <div className="flex justify-start">
            <Label className="text-sky-800">Mail {index + 1}</Label>
          </div>
          {
            <div>
              <Button
                className="btn bg-white "
                size="icon"
                onClick={() => generateBarcode(mail.mailID)}
              >
                <Barcode color="black" size={18} />
              </Button>
              <Button className="btn bg-white " size="icon">
                <Printer color="black" size={18} />
              </Button>
            </div>
          }
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
              <p className="text-slate-500 font-light text-sm"> {mail.price}</p>
            </Label>
          </div>
          <div>
            <Label className="text-base">
              MailID:{" "}
              <p className="text-slate-500 font-light text-sm">
                {" "}
                {mail.mailID}
              </p>
            </Label>
          </div>
        </div>
        <svg id={`barcode-${mail.mailID}`}></svg>
      </div>
    ))}
  </div>;
}
