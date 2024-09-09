import { Request, Response } from "express";
import { MailRepository } from "../repositeries/mailrepository";
import { BundleRepository } from "../repositeries/bundlerepository";
import {TransactionRepository} from "../repositeries/transactionrepository"

const transactionRepository = new TransactionRepository();
const mailRepository = new MailRepository();
const bundleRepository = new BundleRepository();
const CalculatePrice = async (req: Request, res: Response) => {
  console.log("Request received in controller");
  const { mailType, weight } = req.body;
  const result = await mailRepository.calculatePrice(mailType, weight);
  return res.status(200).json(result);
};

const MailBundles = async (req: Request, res: Response) => {
  console.log("Request received in mail bundle controller");
  const { postalCode } = req.body;
  const result = await bundleRepository.getBundles(postalCode);
  console.log("Bundles received in controller:", result);
  return res.status(200).json(result);
};


const MailDetails = async (req: Request, res: Response) => {	
  console.log("Request received in mail details" ,req.body);
  const mailArray = req.body.mailArray;
  const cutomerDetails = req.body.customerDetails.values;
  const {addressID, postalCode} = req.body.customerDetails
  const {customerName, telephone} = cutomerDetails
  console.log("hyikjk;" ,customerName, telephone, addressID)
  const amount = 40
  const transaction = await transactionRepository.createTransactoin(telephone,customerName, amount, addressID )
  console.log(transaction)
  const transactionID  = transaction.transactionID 
  console.log("dfk", mailArray, transactionID)

  for (let mail of mailArray) {
    const {addressID, mailType, price, recepientName, telephone, weight} = mail
    const {postalCode} = req.body.postalCode;
    console.log(postalCode);
    await mailRepository.addMail(addressID, price, telephone, recepientName, weight, "10120", mailType, transactionID, 1 ); 
  }
}

const Mails = async (req: Request, res: Response) => {
  console.log("Request received in mail");
  const { postalCode } = req.body;
  const result = await mailRepository.getMail(postalCode);
  return res.status(200).json(result);
};

export const getMailDetails = async (req: Request, res: Response) => {
  try {
    const employeeID = req.query.employeeID as string;

    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }
    // Hard-coded delivery counts
    const deliveryCounts = {
      employeeID: "12345",
      normal: 27,
      registered: 9,
      parcel: 4,
    };

    // Optionally log or process the counts if needed
    console.log("Delivery counts fetched:", deliveryCounts);

    return res.status(200).json(deliveryCounts);
  } catch (error) {
    console.error("Error fetching delivery counts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Example function to get mail items for a specific employee
export const getMailItems = async (req: Request, res: Response) => {
  try {
    const employeeID = req.query.employeeID as string;

    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    // Hardcoded mail items for demonstration purposes
    const mailItems = [
      { id: "1", category: "Normal", status: "Delivered", employeeID: "12345" },
      {
        id: "2",
        category: "Registered",
        status: "Not Delivered",
        employeeID: "12345",
      },
      {
        id: "3",
        category: "Parcel",
        status: "To Be Delivered",
        employeeID: "12345",
      },
    ];

    // Filter mail items based on employeeID
    const filteredMailItems = mailItems.filter(
      (mail) => mail.employeeID === employeeID
    );

    if (filteredMailItems.length === 0) {
      return res
        .status(404)
        .json({ error: "No mail items found for this employee" });
    }

    // Return filtered mail items
    return res.status(200).json(filteredMailItems);
  } catch (error) {
    console.error("Error fetching mail items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { CalculatePrice, MailBundles, Mails, MailDetails};
