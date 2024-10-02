import { Request, Response } from "express";
import { MailRepository } from "../repositeries/mailrepository";
import { BundleRepository } from "../repositeries/bundlerepository";
import { TransactionRepository } from "../repositeries/transactionrepository";
//import { MoneyOrderRepository } from "../repositories/moneyorderrepository";

import MailService from "../services/mailservice";
import BundleService from "../services/bundleservice";

const transactionRepository = new TransactionRepository();
const mailRepository = new MailRepository();
const mailService = new MailService();
const bundleservice = new BundleService();
//const moneyOrderRepository = new MoneyOrderRepository();

const CalculatePrice = async (req: Request, res: Response) => {
  console.log("Request received in controller");
  const { mailType, weight } = req.body;
  const result = await mailService.calculatePrice(mailType, weight);
  return res.status(200).json(result);
};

const MailBundles = async (req: Request, res: Response) => {
  console.log("Request received in mail bundle controller", req.body);
  const { postalCode } = req.body;
  const result = await bundleservice.getBundles(postalCode);
  console.log("Bundles received in controller:", result);
  return res.status(200).json(result);
};

const MailDetails = async (req: Request, res: Response) => {
  console.log("Request received in mail details", req.body);
  const mailArray = req.body.mailArray;
  const cutomerDetails = req.body.customerDetails.values;
  const { addressID, postalCode } = req.body.customerDetails;
  const currentPostCode = postalCode;
  const { customerName, telephone } = cutomerDetails;
  console.log("hyikjk;", customerName, telephone, addressID);
  const amount = mailService.calculateTotal(mailArray);
  const transaction = await transactionRepository.createTransactoin(
    telephone,
    customerName,
    amount,
    addressID
  );
  console.log(transaction);
  const transactionID = transaction.transactionID;
  console.log("dfk", mailArray, transactionID);
  const result = await mailService.insertMail(mailArray, transactionID, postalCode);
  console.log(result, "mail list");
  return res.status(200).json(transaction.amount);
};

const Mails = async (req: Request, res: Response) => {
  console.log("Request received in mail", req.body);
  const { postalCode } = req.body;
  const result = await mailRepository.getMail(postalCode);
  return res.status(200).json(result);
};

// Function to get mail items for a specific employee
export const getMailItems3 = async (req: Request, res: Response) => {
  const employeeID = req.query.employeeID as string; // Extract the employeeID

  try {
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    const mailItems = await mailRepository.getMailItemsByEmployeeID(employeeID);

    const inTransitMailItem = mailItems.find(
      (item) => item.mailstatus === "IN_TRANSIT"
    );

    if (!inTransitMailItem) {
      return res.status(404).json({ error: "No IN_TRANSIT mail item found" });
    }

    return res.status(200).json(inTransitMailItem);
  } catch (error) {
    console.error("Error fetching mail item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get mail items for a specific employee
export const getMailItems2 = async (req: Request, res: Response) => {
  const employeeID = req.query.employeeID as string; 

  try {
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    const mailItems = await mailRepository.getMailItemsByEmployeeID(employeeID);

    return res.status(200).json(mailItems);
  } catch (error) {
    console.error("Error fetching delivery counts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get mail items for a specific employee
export const getMailItems = async (req: Request, res: Response) => {
  const employeeID = req.query.employeeID as string;

  try {
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    const mailItems = await mailRepository.getMailItemsByEmployeeID(employeeID);

    const inTransitMailItems = mailItems.filter(
      (item) => item.mailstatus === "IN_TRANSIT"
    );

    const categorizedMailItems = inTransitMailItems.reduce(
      (mail: { [key: string]: any[] }, item) => {
        const category = item.mailType;
        if (!mail[category]) {
          mail[category] = [];
        }
        mail[category].push(item);
        return mail;
      },
      {}
    );

    const categoryCounts = Object.keys(categorizedMailItems).reduce(
      (countMail: { [key: string]: number }, category) => {
        countMail[category] = categorizedMailItems[category].length;
        return countMail;
      },
      {}
    );

    console.log("Mail counts fetched:", categoryCounts);

    return res.status(200).json(categoryCounts);
  } catch (error) {
    console.error("Error fetching mail counts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update mail status
export const updateMailStatus = async (req: Request, res: Response) => {
  const { mailID, newStatus, signature } = req.body;

  try {
    let updatedMail;
    if (newStatus === "DELIVERED" && signature) {
      updatedMail = await mailRepository.updateMailStatusWithSignature(
        mailID,
        newStatus,
        signature
      );
    } else {
      updatedMail = await mailRepository.updateMailStatus(mailID, newStatus);
    }
    res.status(200).json(updatedMail);
  } catch (error) {
    console.error("Error updating mail status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fix the placement of getTrackingDetails
export const getTrackingDetails = async (req: Request, res: Response) => {
  try {
    const { transactionID } = req.params;
    console.log(`Fetching tracking details for Transaction ID: ${transactionID}`);

    const mailDetails = await mailRepository.trackMail(transactionID);

    if (mailDetails) {
      res.status(200).json({
        success: true,
        data: mailDetails
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Mail not found for the given Transaction ID"
      });
    }
  } catch (error) {
    console.error("Error fetching mail details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while tracking mail"
    });
  }
};

// export const processMoneyOrder = async (req: Request, res: Response) => {
//   const { recipientName, recipientAddress, amount } = req.body;

//   try {
//     // Validate inputs
//     if (!recipientName || !recipientAddress || !amount) {
//       return res.status(400).json({ success: false, message: "All fields are required." });
//     }
//     if (amount <= 0 || amount > 50000) {
//       return res.status(400).json({ success: false, message: "The amount must be between 1 and 50,000." });
//     }

//     // Create a new money order entry in the database
//     const moneyOrder = await moneyOrderRepository.createMoneyOrder({
//       recipientName,
//       recipientAddress,
//       amount,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Money order processed successfully.",
//       data: moneyOrder,
//     });
//   } catch (error) {
//     console.error("Error processing money order:", error);
//     res.status(500).json({ success: false, message: "An error occurred while processing the money order." });
//   }
// };

// Exporting the functions
export { CalculatePrice, MailBundles, Mails, MailDetails };
