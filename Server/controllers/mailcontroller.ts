import { Request, Response } from "express";
import { MailRepository } from "../repositeries/mailrepository";
import { TransactionRepository } from "../repositeries/transactionrepository";
import MailService from "../services/mailmanagementservice";
import { BundleRepository } from "../repositeries/bundlerepository";
import PostOfficeRepository from "../repositeries/postofficerepository";
import { AddressRepository } from "../repositeries/addressrepository";
import MailTransferService from "../services/mailtransferservice";
import MailManagementService from "../services/mailmanagementservice";
import TrackMail from "../services/trackmail";

const bundleRepository = new BundleRepository();
const addressRepository = new AddressRepository();
const transactionRepository = new TransactionRepository();
const mailRepository = new MailRepository();
const postOfficeRepository = new PostOfficeRepository();
const bundleservice = new MailTransferService(
  postOfficeRepository,
  bundleRepository,
  addressRepository
);
const mailService = new MailManagementService(mailRepository, bundleservice);
const trackMail = new TrackMail();

const CalculatePrice = async (req: Request, res: Response) => {
  console.log("Request received in controller");
  const { mailType, weight } = req.body;
  const result = await mailService.calculatePrice(mailType, weight);
  return res.status(200).json(result);
};

const ChangeAddress = async (req: Request, res: Response) => {
  console.log("in mail controller", req);
  const { addressID, mailID, postalCode } = req.body;
  const address = Number(addressID);
  const mail = Number(mailID);
  console.log(mail, address);
  console.log(mail, addressID);
  const result = await mailService.changeAddress(address, mail, postalCode);
  console.log(result);
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
  const transaction = await transactionRepository.createTransaction(
    telephone,
    customerName,
    amount,
    addressID
  );
  console.log(transaction);
  const transactionID = transaction.transactionID;
  console.log("dfk", mailArray, transactionID);
  let result = await mailService.insertMail(
    mailArray,
    transactionID,
    postalCode
  );
  console.log(result, "mail list");
  return res.status(200).json({ result, total: transaction.amount });
};

const Mails = async (req: Request, res: Response) => {
  console.log("Request received in mail", req.body);
  const { postalCode } = req.body;
  console.log(postalCode);
  const result = await mailRepository.getMail(postalCode);
  return res.status(200).json(result);
};
const ReturnMail = async (req: Request, res: Response) => {
  console.log("Request received in mail", req.body);
  const { postalCode } = req.body;
  console.log(postalCode);
  const result = await mailService.getReturnMail(postalCode);
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

export const getAddresses = async (req: Request, res: Response) => {
  const employeeID = req.query.employeeID as string; // Extract the employeeID

  try {
    // Check if the employeeID is provided
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" }); // 400 status code for Bad Request
    }

    // Fetch addresses from the repository
    const addresses = await mailRepository.getDeliveryAddressesByEmployeeID(
      employeeID
    );

    return res.status(200).json(addresses); // 200 status code for OK
  } catch (error) {
    console.error("Error fetching delivery addresses:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // 500 status code for Internal Server Error
  }
};

// Update mail status
export const updateMailStatus = async (req: Request, res: Response) => {
  const { mailID, newStatus, signature } = req.body;

  try {
    let updatedMail;
    if (newStatus === "DELIVERED" && signature) {
      // Ensure signature is provided for Registered Mail
      // Store the signature in the database
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

export const getTrackingDetails = async (req: Request, res: Response) => {
  try {
    const { transactionID } = req.body; // Get transactionID from the request body
    console.log(`Fetching tracking details for Transaction ID: ${transactionID}`);

    const mailDetails = await mailRepository.trackMail(transactionID);

    if (mailDetails && mailDetails.length > 0) { // Check if mailDetails is an array and has elements
      res.status(200).json({
        success: true,
        data: mailDetails,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Mail not found for the given Transaction ID",
      });
    }
  } catch (error) {
    console.error("Error fetching mail details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while tracking mail",
    });
  }
};


export const estimateDeliveryTime = async (req: Request, res: Response) => {
  try {
    const { bundleID } = req.body;

    // Call service to estimate delivery time
    const estimatedTime = await trackMail.estimateDeliveryTime(bundleID);

    res.status(200).json({ success: true, deliveryTime: estimatedTime });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "An unknown error occurred." });
    }
  }
};

// export class MailController {
//   async estimateDeliveryTime(req: Request, res: Response) {
//     try {
//       const { bundleID } = req.body;

//       // Call service to estimate delivery time
//       const estimatedTime = await trackMail.estimateDeliveryTime(bundleID);

//       res.status(200).json({ success: true, deliveryTime: estimatedTime });
//     } catch (error) {
//       if (error instanceof Error) {
//         res.status(500).json({ success: false, message: error.message });
//       } else {
//         res
//           .status(500)
//           .json({ success: false, message: "An unknown error occurred." });
//       }
//     }
//   }
// }

// export const getTrackingDetails = async (req: Request, res: Response) => {
//   try {
//     const { transactionID } = req.body; // Get transactionID from the request body
//     console.log(
//       `Fetching tracking details for Transaction ID: ${transactionID}`
//     );

//     const mailDetails = await mailRepository.trackMail(transactionID);

//     if (mailDetails) {
//       res.status(200).json({
//         success: true,
//         data: mailDetails,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "Mail not found for the given Transaction ID",
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching mail details:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while tracking mail",
//     });
//   }
// };

// export class MailController {
//   async estimateDeliveryTime(req: Request, res: Response) {
//     try {
//       const { bundleID } = req.body;

//       // Call service to estimate delivery time
//       const estimatedTime = await trackMail.estimateDeliveryTime(bundleID);

//       res.status(200).json({ success: true, deliveryTime: estimatedTime });
//     } catch (error) {
//       if (error instanceof Error) {
//         res.status(500).json({ success: false, message: error.message });
//       } else {
//         res
//           .status(500)
//           .json({ success: false, message: "An unknown error occurred." });
//       }
//     }
//   }
// }

export { CalculatePrice, Mails, MailDetails, ReturnMail, ChangeAddress };
