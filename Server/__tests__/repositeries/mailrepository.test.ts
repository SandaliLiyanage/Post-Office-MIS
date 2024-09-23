import { PrismaClient } from "@prisma/client";
import { MailRepository } from "../../repositeries/mailrepository";

jest.mock("@prisma/client");

const prisma = new PrismaClient();
const mailRepository = new MailRepository();

describe("MailRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMailItemsByEmployeeID", () => {
    it("should return mail items for a given employeeID", async () => {
      // Mock data
      const mockMailItems = [
        {
          mailID: 1,
          recepientName: "Alice",
          recepientAddressID: 101,
          mailType: "PARCEL",
          mailstatus: "IN_TRANSIT",
          weight: "1kg",
          price: 10,
          addressNo: "123",
          streetName: "Main St",
          Locality: "Downtown",
          areaName: "Central",
        },
        {
          mailID: 2,
          recepientName: "Bob",
          recepientAddressID: 102,
          mailType: "LETTER",
          mailstatus: "DELIVERED",
          weight: "0.5kg",
          price: 5,
          addressNo: "456",
          streetName: "Second St",
          Locality: "Uptown",
          areaName: "North",
        },
      ];

      // Mock Prisma query
      (prisma.$queryRaw as jest.Mock).mockResolvedValue(mockMailItems);

      // Call the repository function
      const result = await mailRepository.getMailItemsByEmployeeID("1");

      // Assert: Check that the function returns the correct data
      expect(prisma.$queryRaw).toHaveBeenCalledWith(expect.anything()); // Removed extra argument
      expect(result).toEqual(mockMailItems);
    });
  });
});
