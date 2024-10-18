import { Request, Response } from "express";
import AdderessService from "../services/addressservice";
import { AddressRepository } from "../repositeries/addressrepository";

const addressRepository = new AddressRepository();
const addressService = new AdderessService(addressRepository);

const Address = async (req: Request, res: Response) => {
  const search = req.body.search;
  const addressList = await addressService.searchSuggestions(search);
  console.log("In the address controller", addressList);
  res.send(addressList);
};

const AddAddress = async (req: Request, res: Response) => {
  const { addressNo, streetName, locality, postalCode } = req.body.values;
  console.log(
    "In the address controller",
    addressNo,
    streetName,
    locality,
    postalCode
  );
  const result = await addressService.addAddress(
    addressNo,
    streetName,
    locality,
    postalCode
  );
  res.send(result);
};

export const getUnverifiedAddresses = async (req: Request, res: Response) => {
  const employeeID = req.query.employeeID as string; // Extract the employeeID

  try {
    // Check if the employeeID is provided
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" }); // 400 status code for Bad Request
    }

    // Fetch mail details from the repository
    const addresses = await addressRepository.getUnverifiedAddresses(
      employeeID
    );

    return res.status(200).json(addresses); // 200 status code for OK
    console.log("Unverified addresses fetched:", addresses);
  } catch (error) {
    console.error("Error fetching delivery addresses:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // 500 status code for Internal Server Error
  }
};

export const updateAddressLocation = async (req: Request, res: Response) => {
  const { addressID, latitude, longitude, verified } = req.body;

  try {
    if (!addressID || !latitude || !longitude) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const updatedAddress = await addressRepository.updateAddressLocation(
      addressID,
      latitude,
      longitude,
      verified
    );

    if (updatedAddress) {
      return res.status(200).json(updatedAddress);
    } else {
      return res.status(404).json({ error: "Address not found." });
    }
  } catch (error) {
    console.error("Error updating address location:", error);
    return res
      .status(500)
      .json({ error: "Failed to update address location." });
  }
};

export { Address, AddAddress };
