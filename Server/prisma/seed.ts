import {
  PrismaClient,
  Role,
  PostOfficeCategory,
  LeaveType,
  RequestStatus,
  MailStatus,
  MailType,
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

  // Seed Post Offices

  await prisma.postOffice.createMany({
    data: [
      {
        postalCode: "00100",
        postOfficeCategory: "HEAD_OFFICE",
        postOfficeName: "Colombo Main",
        headOfficeID: "00100",
        latitude: 6.9271,
        longitude: 79.8612,
      },
      {
        postalCode: "20000",
        postOfficeCategory: "HEAD_OFFICE",
        postOfficeName: "Kandy",
        headOfficeID: "20000",
        latitude: 6.9271,
        longitude: 80.8612,
      },
      {
        postalCode: "10250",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Nugegoda",
        headOfficeID: "00100",
        latitude: 6.9271,
        longitude: 81.8612,
      },
      {
        postalCode: "80000",
        postOfficeCategory: "HEAD_OFFICE",
        postOfficeName: "Galle",
        headOfficeID: "80000",
        latitude: 6.9271,
        longitude: 82.8612,
      },
      {
        postalCode: "11500",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Negombo",
        headOfficeID: "00100",
        latitude: 6.9271,
        longitude: 83.8612,
      },
      {
        postalCode: "40000",
        postOfficeCategory: "HEAD_OFFICE",
        postOfficeName: "Jaffna",
        headOfficeID: "40000",
        latitude: 6.9271,
        longitude: 84.8612,
      },
      {
        postalCode: "10300",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Mount Lavinia",
        headOfficeID: "00100",
        latitude: 6.9271,
        longitude: 85.8612,
      },
      {
        postalCode: "11000",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Maharagama",
        headOfficeID: "00100",
        latitude: 6.9271,
        longitude: 86.8612,
      },
      {
        postalCode: "30600",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Kurunegala",
        headOfficeID: "30000",
        latitude: 6.9271,
        longitude: 87.8612,
      },
      {
        postalCode: "60100",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Matara",
        headOfficeID: "80000",
        latitude: 6.9271,
        longitude: 88.8612,
      },
      {
        postalCode: "41000",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Anuradhapura",
        headOfficeID: "40000",
        latitude: 6.9271,
        longitude: 89.8612,
      },
      {
        postalCode: "50100",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Batticaloa",
        headOfficeID: "50000",
        latitude: 6.9271,
        longitude: 78.8612,
      },
      {
        postalCode: "10640",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Kaduwela",
        headOfficeID: "50000",
        latitude: 6.93365203450841,
        longitude: 79.9835312139157,
      },
    ],
  });

  // Seed Employees
  const employee1 = await prisma.employee.create({
    data: {
      employeeID: "0001",
      employeeName: "John Doe",
      email: "john.doe@gmail.com",
      telephone: "123456789",
      role: Role.POSTMASTER,
      postalCode: "00100",
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
      postalCode: "10640",
      password: "password123",
    },
  });

  const employee3 = await prisma.employee.create({
    data: {
      employeeID: "0003",
      employeeName: "Jane Smith",
      email: "abc@gmail.com",
      telephone: "987654321",
      role: Role.SUPERVISOR,
      postalCode: "00100",
      password: "password123",
    },
  });
  const employee4 = await prisma.employee.create({
    data: {
      employeeID: "0004",
      employeeName: "Jane Smith",
      email: "bcd@gmail.com",
      telephone: "987654321",
      role: Role.RECEPTIONIST,
      postalCode: "00100",
      password: "password123",
    },
  });
  const employee5 = await prisma.employee.create({
    data: {
      employeeID: "0005",
      employeeName: "Jane Smith",
      email: "cde@gmail.com",
      telephone: "987654321",
      role: Role.DISPATCHER,
      postalCode: "00100",
      password: "password123",
    },
  });

  // Seed Areas
  await prisma.area.create({
    data: {
      areaID: 1,
      areaName: "Area01",
      postalCode: "10640",
      employeeID: employee2.employeeID,
    },
  });

  // Seed Addresses
  const address1 = await prisma.address.create({
    data: {
      postalCode: "00100",
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
      postalCode: "00100",
      addressNo: "456",
      streetName: "Market St",
      Locality: "Suburbia",
      latitude: 34.0522,
      longitude: -118.2437,
      areaID: 1,
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
  const bundle1 = await prisma.bundle.create({
    data: {
      bundleID: 1,
      destPostalCode: "00100",
      currentPostCode: "40000",
    },
  });

  // Seed Mail
  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.NORMAL_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.NORMAL_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.NORMAL_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.NORMAL_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.NORMAL_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.NORMAL_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.NORMAL_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.REGISTERED_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.REGISTERED_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.REGISTERED_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.REGISTERED_MAIL,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.COURIER,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.COURIER,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.COURIER,
      weight: 1.2,
      price: 6.0,
      mailstatus: MailStatus.IN_TRANSIT,
    },
  });

  await prisma.mail.create({
    data: {
      recepientName: "Bob Williams",
      recepientAddressID: address2.addressID,
      postalCode: "00100",
      bundleID: bundle1.bundleID,
      transactionID: transaction.transactionID,
      mailType: MailType.REGISTERED_MAIL,
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
