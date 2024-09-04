import { Request, Response } from "express";
import { getMailItemsByPostman } from "../repositeries/mailrepository";

const getMailItems = async (req: Request, res: Response) => {
  try {
    const employeeID = parseInt(req.query.employeeID as string, 10); // Extract the employeeID and convert to a number of base 10

    // Check if the employeeID is provided
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" }); // 400 status code for Bad Request
    }

    // Fetch mail counts categorized by their categories
    // const mailCounts = await getMailItemsByPostman(employeeID);
    const deliveryCounts = {
      normal: 27,
      registered: 9,
      parcel: 4,
    };

    return res.status(200).json(deliveryCounts); // 200 status code for OK
  } catch (error) {
    console.error("Error fetching mail counts:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // 500 status code for Internal Server Error
  }
};

export { getMailItems };
