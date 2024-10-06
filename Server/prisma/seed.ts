import {
  PrismaClient,
  Role,
  PostOfficeCategory,
  LeaveType,
  RequestStatus,
  MailStatus,
  MailType,
  BundleStatus,
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
  await prisma.feedback.deleteMany({});
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
      {
        postalCode: "20850",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Akurana",
        headOfficeID: "20000",
        latitude: 6.9271,
        longitude: 80.8612,
      },
    ],
  });

  // Seed Employees
  await prisma.employee.createMany({
    data: [
      {
        employeeID: "0001",
        employeeName: "John Doe",
        email: "john.doe@gmail.com",
        telephone: "123456789",
        role: Role.POSTMASTER,
        postalCode: "00100",
        password: "password234",
      },
      {
        employeeID: "0002",
        employeeName: "Jane Smith",
        email: "jane.smith@gmail.com",
        telephone: "987654321",
        role: Role.POSTMAN,
        postalCode: "10640",
        password: "password123",
      },
      {
        employeeID: "0003",
        employeeName: "Jane Smith",
        email: "abc@gmail.com",
        telephone: "987654321",
        role: Role.SUPERVISOR,
        postalCode: "00100",
        password: "password123",
      },
      {
        employeeID: "0004",
        employeeName: "Jane Smith",
        email: "bcd@gmail.com",
        telephone: "987654321",
        role: Role.RECEPTIONIST,
        postalCode: "00100",
        password: "password123",
      },
      {
        employeeID: "0005",
        employeeName: "Pathum Liyanage",
        email: "cde@gmail.com",
        telephone: "987654321",
        role: Role.DISPATCHER,
        postalCode: "10640",
        password: "password123",
      },
      {
        employeeID: "0006",
        employeeName: "Amal Dissanayake",
        email: "cdefgh@gmail.com",
        telephone: "987654321",
        role: Role.DISPATCHER,
        postalCode: "20850",
        password: "password123",
      },
    ],
  });

  // Seed Areas
  await prisma.area.createMany({
    data: [
      {
        areaID: 1,
        areaName: "Area001",
        postalCode: "10640",
        employeeID: "0002",
      },
      {
        areaID: 658,
        areaName: "Area658",
        postalCode: "00100",
        employeeID: "0005",
      },
    ],
  });

  // Seed Addresses
  await prisma.address.createMany({
    data: [
      {
        addressID: 26,
        postalCode: "10640",
        addressNo: "123",
        streetName: "Main St",
        Locality: "Central City",
        latitude: 6.932900155314793,
        longitude: 79.98257295440071,
        areaID: 1,
      },
      {
        addressID: 27,
        postalCode: "10640",
        addressNo: "124",
        streetName: "2nd St",
        Locality: "Central City",
        latitude: 6.931829673826147,
        longitude: 79.98283733773043,
        areaID: 1,
      },
      {
        addressID: 28,
        postalCode: "10640",
        addressNo: "125",
        streetName: "3rd St",
        Locality: "Central City",
        latitude: 6.926691701903446,
        longitude: 79.98007013891583,
        areaID: 1,
      },
      {
        addressID: 29,
        postalCode: "10640",
        addressNo: "126",
        streetName: "4th St",
        Locality: "Central City",
        latitude: 6.921379683015376,
        longitude: 79.9748551127648,
        areaID: 1,
      },
      {
        addressID: 30,
        postalCode: "10640",
        addressNo: "127",
        streetName: "5th St",
        Locality: "Central City",
        latitude: 6.92625283379399,
        longitude: 79.97224505313936,
        areaID: 1,
      },
      {
        addressID: 31,
        postalCode: "10640",
        addressNo: "128",
        streetName: "6th St",
        Locality: "Central City",
        latitude: 6.930090869184906,
        longitude: 79.97488263874345,
        areaID: 1,
      },
      {
        addressID: 32,
        postalCode: "10640",
        addressNo: "129",
        streetName: "7th St",
        Locality: "Central City",
        latitude: 6.936511594394954,
        longitude: 79.97497555414972,
        areaID: 1,
      },
      {
        addressID: 33,
        postalCode: "10640",
        addressNo: "130",
        streetName: "8th St",
        Locality: "Central City",
        latitude: 6.936982597575644,
        longitude: 79.97664553759417,
        areaID: 1,
      },
      {
        addressID: 34,
        postalCode: "10640",
        addressNo: "131",
        streetName: "9th St",
        Locality: "Central City",
        latitude: 6.936934494539469,
        longitude: 79.98072335547656,
        areaID: 1,
      },
      {
        addressID: 35,
        postalCode: "10640",
        addressNo: "132",
        streetName: "10th St",
        Locality: "Central City",
        latitude: 6.9359585237643095,
        longitude: 79.98390472475725,
        areaID: 1,
      },
      {
        addressID: 36,
        postalCode: "10640",
        addressNo: "132",
        streetName: "10th St",
        Locality: "Central City",
        latitude: 6.925986987017987,
        longitude: 79.97453528966999,
        areaID: 1,
      },
      {
        addressID: 37,
        postalCode: "00100",
        addressNo: "123",
        streetName: "Main St",
        Locality: "Central City",
        latitude: 40.7128,
        longitude: -74.006,
        areaID: 658,
      },
    ],
  });

  // Seed Transactions
  await prisma.transaction.createMany({
    data: [
      {
        transactionID: 1,
        customerName: "Alice Johnson",
        customerTelephone: "555123456",
        customerAddressID: 36,
        date: new Date(),
        amount: 10.5,
      },
    ],
  });

  // Seed Bundles
  await prisma.bundle.createMany({
    data: [
      {
        bundleID: 1,
        destPostalCode: "10640",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "11000", "30600", "10640"],
      },
      {
        bundleID: 20,
        destPostalCode: "10640",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "30600", "10640"],
      },
      {
        bundleID: 21,
        destPostalCode: "10250",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "10640", "30600", "10250"],
      },
      {
        bundleID: 22,
        destPostalCode: "10250",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "10640", "30600", "10250"],
      },
      {
        bundleID: 23,
        destPostalCode: "10250",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "10640", "11500", "10250"],
      },
      {
        bundleID: 24,
        destPostalCode: "10250",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.CREATED,
        route: ["10640", "11500", "10250"],
      },
      {
        bundleID: 25,
        destPostalCode: "10250",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.CREATED,
        route: ["10640", "11500", "30600", "10250"],
      },
      {
        bundleID: 26,
        destPostalCode: "10250",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.CREATED,
        route: ["10640", "11500", "10250"],
      },
      {
        bundleID: 27,
        destPostalCode: "10250",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.CREATED,
        route: ["10640", "11500", "30600", "10250"],
      },
      {
        bundleID: 28,
        destPostalCode: "10250",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "10640", "30600", "10250"],
      },
      {
        bundleID: 32,
        destPostalCode: "10640",
        currentPostCode: "10640",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["20850", "00100", "10640"],
      },
      {
        bundleID: 68,
        destPostalCode: "10640",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "20850", "30600", "10640"],
      },
      {
        bundleID: 69,
        destPostalCode: "10640",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "30600", "20850"],
      },
      {
        bundleID: 70,
        destPostalCode: "10250",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "10640", "20850", "10250"],
      },
      {
        bundleID: 71,
        destPostalCode: "10250",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "10640", "20850", "10250"],
      },
      {
        bundleID: 72,
        destPostalCode: "10250",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "20850", "11500", "10250"],
      },
      {
        bundleID: 73,
        destPostalCode: "10250",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.CREATED,
        route: ["20850", "11500", "10250"],
      },
      {
        bundleID: 67,
        destPostalCode: "10250",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.CREATED,
        route: ["10640", "11500", "20850", "10250"],
      },
      {
        bundleID: 75,
        destPostalCode: "10250",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.CREATED,
        route: ["20850", "11500", "10250"],
      },
      {
        bundleID: 76,
        destPostalCode: "10250",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.CREATED,
        route: ["10640", "20850", "30600", "10250"],
      },
      {
        bundleID: 77,
        destPostalCode: "10250",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.ARRIVED,
        route: ["00100", "10640", "20850", "10250"],
      },
      {
        bundleID: 64,
        destPostalCode: "10640",
        currentPostCode: "20850",
        bundleStatus: BundleStatus.CREATED,
        route: ["20850", "00100", "10640"],
      },
    ],
  });

  // Seed Mail
  await prisma.mail.createMany({
    data: [
      {
        mailID: 268,
        recepientName: "Bob Williams",
        recepientAddressID: 26,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.NORMAL_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 269,
        recepientName: "Bob Williams",
        recepientAddressID: 27,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.NORMAL_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 270,
        recepientName: "Bob Williams",
        recepientAddressID: 28,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.NORMAL_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 271,
        recepientName: "Bob Williams",
        recepientAddressID: 29,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.NORMAL_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 272,
        recepientName: "Bob Williams",
        recepientAddressID: 30,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.NORMAL_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 273,
        recepientName: "Bob Williams",
        recepientAddressID: 31,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.REGISTERED_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 274,
        recepientName: "Bob Williams",
        recepientAddressID: 32,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.REGISTERED_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 275,
        recepientName: "Bob Williams",
        recepientAddressID: 33,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.REGISTERED_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 276,
        recepientName: "Bob Williams",
        recepientAddressID: 34,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.COURIER,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 277,
        recepientName: "Bob Williams",
        recepientAddressID: 35,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.COURIER,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 278,
        recepientName: "Bob Williams",
        recepientAddressID: 29,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.NORMAL_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 279,
        recepientName: "Bob Williams",
        recepientAddressID: 35,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.NORMAL_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 280,
        recepientName: "Bob Williams",
        recepientAddressID: 32,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.REGISTERED_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 281,
        recepientName: "Bob Williams",
        recepientAddressID: 36,
        postalCode: "00100",
        bundleID: 1,
        transactionID: 1,
        mailType: MailType.NORMAL_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 282,
        recepientName: "Akila Perera",
        recepientAddressID: 26,
        postalCode: "20850",
        bundleID: 32,
        transactionID: 1,
        mailType: MailType.NORMAL_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
      {
        mailID: 283,
        recepientName: "Akila Perera",
        recepientAddressID: 26,
        postalCode: "20850",
        bundleID: 32,
        transactionID: 1,
        mailType: MailType.REGISTERED_MAIL,
        weight: 1.2,
        price: 6.0,
        mailstatus: MailStatus.IN_TRANSIT,
      },
    ],
  });

  // Seed Leaves
  await prisma.leave.createMany({
    data: [
      {
        employeeID: "0003",
        leaveType: LeaveType.FULL_DAY,
        startDate: new Date("2024-09-10"),
        endDate: new Date("2024-09-11"),
        description: "Annual Leave",
        status: "Pending",
        RequestStatus: RequestStatus.PENDING,
      },
    ],
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
