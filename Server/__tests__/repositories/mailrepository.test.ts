// import { PrismaClient, Mail, MailType, MailStatus } from "@prisma/client";
// import { MailRepository } from "../../repositeries/mailrepository";// Adjust the path
// import { Decimal } from "@prisma/client/runtime/library";

// jest.mock('@prisma/client', () => {
//   return {
//     PrismaClient: jest.fn().mockImplementation(() => ({
//       mail: {
//         create: jest.fn(),
//       },
//     })),
//   };
// });

// describe('MailRepository.addMail', () => {
//   const prisma = new PrismaClient();
//   const mailRepository = new MailRepository();

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test('should add a mail and return the created mail', async () => {
//     const mockMail: Mail = {
//       weight: new Decimal(500),
//       mailID: 1,
//       recepientAddressID: 2,
//       recepientName: "John Doe",
//       postalCode: "12345",
//       mailType: MailType.NORMAL_MAIL,
//       transactionID: 10,
//       price: new Decimal(500),
//       bundleID: 1,
//       signature: null,
//       mailstatus: MailStatus.DELIVERED,
//     };

//     // Mock the prisma.mail.create method to return the mockMail
//     (prisma.mail.create as jest.Mock).mockResolvedValue(mockMail);

//     // Call the addMail function
//     const result = await mailRepository.addMail(
//       mockMail.weight,
//       mockMail.recepientAddressID,
//       mockMail.price,
//       mockMail.recepientName,
//       mockMail.postalCode,
//       mockMail.mailType,
//       mockMail.transactionID,
//       mockMail.bundleID
//     );

//     // Assert the prisma.mail.create method was called with the correct arguments
//     expect(prisma.mail.create).toHaveBeenCalledWith({
//       data: {
//         recepientAddressID: mockMail.recepientAddressID,
//         recepientName: mockMail.recepientName,
//         postalCode: mockMail.postalCode,
//         mailType: mockMail.mailType,
//         weight: mockMail.weight,
//         transactionID: mockMail.transactionID,
//         price: mockMail.price,
//         bundleID: mockMail.bundleID,
//       },
//     });

//     // Assert the result is the mockMail
//     expect(result).toEqual(mockMail);
//   });

//   test('should throw an error when adding mail fails', async () => {
//     const errorMessage = "Failed to add mail";

//     // Mock the prisma.mail.create method to throw an error
//     (prisma.mail.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

//     // Expect the addMail function to throw the error
//     await expect(
//       mailRepository.addMail(2, new Decimal(500), "John Doe", new Decimal(50), "12345", MailType.NORMAL_MAIL, 10, 1)
//     ).rejects.toThrow(errorMessage);
//   });
// });
