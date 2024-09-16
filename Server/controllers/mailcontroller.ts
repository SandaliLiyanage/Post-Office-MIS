import { Request, Response } from "express";
import { MailRepository } from "../repositeries/mailrepository";
import { BundleRepository } from "../repositeries/bundlerepository";
import { TransactionRepository } from "../repositeries/transactionrepository";
import MailService from "../services/mailservice";

const transactionRepository = new TransactionRepository();
const mailRepository = new MailRepository();
const mailService = new MailService();
const bundleRepository = new BundleRepository();

const CalculatePrice = async (req: Request, res: Response) => {
  console.log("Request received in controller");
  const { mailType, weight } = req.body;
  const result = await mailService.calculatePrice(mailType, weight);
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
  console.log("Request received in mail details", req.body);
  const mailArray = req.body.mailArray;
  const cutomerDetails = req.body.customerDetails.values;
  const { addressID, postalCode } = req.body.customerDetails;
  const currentPostCode = postalCode;
  const { customerName, telephone } = cutomerDetails;
  console.log("hyikjk;", customerName, telephone, addressID);
  const amount = 40;
  const transaction = await transactionRepository.createTransactoin(
    telephone,
    customerName,
    amount,
    addressID
  );
  console.log(transaction);
  const transactionID = transaction.transactionID;
  console.log("dfk", mailArray, transactionID);
  mailService.insertMail(mailArray, transactionID, postalCode);
};

const Mails = async (req: Request, res: Response) => {
  console.log("Request received in mail");
  const { postalCode } = req.body;
  const result = await mailRepository.getMail(postalCode);
  return res.status(200).json(result);
};

// Function to get mail items for a specific employee
export const getMailItems3 = async (req: Request, res: Response) => {
  const employeeID = req.query.employeeID as string; // Extract the employeeID

  try {
    // Check if the employeeID is provided
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" }); // 400 status code for Bad Request
    }

    // Fetch mail details from the repository
    const mailItems = await mailRepository.getMailItemsByEmployeeID(employeeID);

    // Filter for the first mail item with status 'IN_TRANSIT'
    const inTransitMailItem = mailItems.find(
      (item) => item.mailstatus === "IN_TRANSIT"
    );

    if (!inTransitMailItem) {
      return res.status(404).json({ error: "No IN_TRANSIT mail item found" }); // 404 for Not Found
    }

    // Return the first IN_TRANSIT mail item
    return res.status(200).json(inTransitMailItem); // 200 status code for OK
  } catch (error) {
    console.error("Error fetching mail item:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // 500 status code for Internal Server Error
  }
};

// Function to get mail items for a specific employee
export const getMailItems2 = async (req: Request, res: Response) => {
  const employeeID = req.query.employeeID as string; // Extract the employeeID

  try {
    // Check if the employeeID is provided
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" }); // 400 status code for Bad Request
    }

    // Fetch mail details from the repository
    const mailItems = await mailRepository.getMailItemsByEmployeeID(employeeID);

    // console.log("Mail items fetched:", mailItems);

    return res.status(200).json(mailItems); // 200 status code for OK
  } catch (error) {
    console.error("Error fetching delivery counts:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // 500 status code for Internal Server Error
  }
};

// Function to get mail items for a specific employee
export const getMailItems = async (req: Request, res: Response) => {
  const employeeID = req.query.employeeID as string; // Extract the employeeID

  try {
    // Check if the employeeID is provided
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" }); // 400 status code for Bad Request
    }

    // Fetch mail details from the repository
    const mailItems = await mailRepository.getMailItemsByEmployeeID(employeeID);

    // Filter mail items by status 'IN_TRANSIT'
    const inTransitMailItems = mailItems.filter(
      (item) => item.mailstatus === "IN_TRANSIT"
    );

    // Group the filtered mail items by category (mailType)
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

    // Get the count of each category
    const categoryCounts = Object.keys(categorizedMailItems).reduce(
      (countMail: { [key: string]: number }, category) => {
        countMail[category] = categorizedMailItems[category].length; // Count the items in each category
        return countMail;
      },
      {}
    );

    // Optionally log or process the counts if needed
    console.log("Mail counts fetched:", categoryCounts);

    return res.status(200).json(categoryCounts); // 200 status code for OK
  } catch (error) {
    console.error("Error fetching mail counts:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // 500 status code for Internal Server Error
  }
};

// Update mail status
export const updateMailStatus = async (req: Request, res: Response) => {
  const { mailID, newStatus } = req.body;

  try {
    // Call the method on the instance
    const updatedMail = await mailRepository.updateMailStatus(
      mailID,
      newStatus
    );
    res.status(200).json(updatedMail);
  } catch (error) {
    console.error("Error updating mail status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Example function to get mail items for a specific employee
// export const getMailItems = async (req: Request, res: Response) => {
//   try {
//     const employeeID = req.query.employeeID as string;

//     if (!employeeID) {
//       return res.status(400).json({ error: "Employee ID is required" });
//     }

//     // Hardcoded mail items for demonstration purposes
//     const mailItems = [
//       { id: "1", category: "Normal", status: "Delivered", employeeID: "12345" },
//       {
//         id: "2",
//         category: "Registered",
//         status: "Not Delivered",
//         employeeID: "12345",
//       },
//       {
//         id: "3",
//         category: "Parcel",
//         status: "To Be Delivered",
//         employeeID: "12345",
//       },
//     ];

//     // Filter mail items based on employeeID
//     const filteredMailItems = mailItems.filter(
//       (mail) => mail.employeeID === employeeID
//     );

//     if (filteredMailItems.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "No mail items found for this employee" });
//     }

//     // Return filtered mail items
//     return res.status(200).json(filteredMailItems);
//   } catch (error) {
//     console.error("Error fetching mail items:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export { CalculatePrice, MailBundles, Mails, MailDetails };
