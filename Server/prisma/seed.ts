import {
  PrismaClient,
  Role,
  PostOfficeCategory,
  LeaveType,
  RequestStatus,
  MailStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.mail.deleteMany({});
  await prisma.bundle.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.area.deleteMany({});
  await prisma.leave.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.postOffice.deleteMany({});
  await prisma.mailCategory.deleteMany({});

  // Seed Post Offices
  const headOffice = await prisma.postOffice.create({
    data: {
      postalCode: "10000",
      postOfficeCategory: PostOfficeCategory.HEAD_OFFICE,
      postOfficeName: "Central Head Office",
    },
  });

  const subOffice = await prisma.postOffice.create({
    data: {
      postalCode: "20000",
      postOfficeCategory: PostOfficeCategory.SUB_OFFICE,
      postOfficeName: "Moratuwa Post Office",
      headOfficeID: headOffice.postalCode,
    },
  });

  // Seed Employees
  const employee1 = await prisma.employee.create({
    data: {
      employeeID: "0001",
      employeeName: "John Doe",
      email: "john.doe@gmail.com",
      telephone: "123456789",
      role: Role.POSTMASTER,
      postalCode: headOffice.postalCode,
      password: "password234",
    },
  });

  const employee2 = await prisma.employee.create({
    data: {
      employeeID: "0002",
      employeeName: "Jane Smith",
      email: "jane.smith@gmail.com",
      telephone: "987654321",
      role: Role.POSTMAN,
      postalCode: subOffice.postalCode,
      password: "password123",
    },
  });

  // Seed Areas
  await prisma.area.create({
    data: {
      areaID: 1,
      areaName: "Area01",
      postalCode: subOffice.postalCode,
      employeeID: employee2.employeeID,
    },
  });

  // Seed Addresses
  const address1 = await prisma.address.create({
    data: {
      postalCode: headOffice.postalCode,
      addressNo: "123",
      streetName: "Main St",
      Locality: "Central City",
      latitude: 40.7128,
      longitude: -74.006,
      areaID: 1,
    },
  });

  const address2 = await prisma.address.create({
    data: {
      postalCode: subOffice.postalCode,
      addressNo: "456",
      streetName: "Market St",
      Locality: "Suburbia",
      latitude: 34.0522,
      longitude: -118.2437,
      areaID: 1,
    },
  });

  // Seed Mail Categories
  const mailCategory1 = await prisma.mailCategory.create({
    data: {
      mailCategoryName: "Normal",
      PricePer1kg: 5.0,
    },
  });

  const mailCategory2 = await prisma.mailCategory.create({
    data: {
      mailCategoryName: "Registered",
      PricePer1kg: 10.0,
    },
  });

  const mailCategory3 = await prisma.mailCategory.create({
    data: {
      mailCategoryName: "Parcel",
      PricePer1kg: 15.0,
    },
  });

  // Seed Transactions
  const transaction = await prisma.transaction.create({
    data: {
      customerName: "Alice Johnson",
      customerTelephone: "555123456",
      customerAddressID: address1.addressID,
      date: new Date(),
      amount: 10.5,
    },
  });

  // Seed Bundles
  const bundle = await prisma.bundle.create({
    data: {
      destPostalCode: subOffice.postalCode,
    },
  });

  // Seed Mail
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory1.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory1.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory1.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory1.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory1.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory2.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory2.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory2.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory2.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory3.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory3.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      recepientTelephone: "555987654",
      postalCode: headOffice.postalCode,
      bundleID: bundle.bundleID,
      transactionID: transaction.transactionID,
      mailCategoryName: mailCategory3.mailCategoryName,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  // Seed Leaves
  await prisma.leave.create({
    data: {
      employeeID: employee1.employeeID,
      leaveType: LeaveType.FULL_DAY,
      startDate: new Date("2024-09-10"),
      endDate: new Date("2024-09-11"),
      description: "Annual Leave",
      status: "Pending",
      RequestStatus: RequestStatus.PENDING,
    },
  });

  console.log("Database has been seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
