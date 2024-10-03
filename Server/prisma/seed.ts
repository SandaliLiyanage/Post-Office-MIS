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
  await prisma.employee.deleteMany({});
  await prisma.postOffice.deleteMany({});

  // Seed Post Offices
  await prisma.postOffice.createMany({
    data : [
      {
        postalCode: "00100",
        postOfficeCategory: "HEAD_OFFICE",
        postOfficeName: "Colombo",
        headOfficeID: "00100",
        latitude: 6.9271,
        longitude: 79.8612,
      },
      {
        postalCode: "20000",
        postOfficeCategory: "HEAD_OFFICE",
        postOfficeName: "Kandy",
        headOfficeID: "20000",
        latitude: 7.2906,
        longitude: 80.6337,
      },
      {
        postalCode: "10250",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Nugegoda",
        headOfficeID: "00100",
        latitude: 6.8649,
        longitude: 79.8997,
      },
      {
        postalCode: "80000",
        postOfficeCategory: "HEAD_OFFICE",
        postOfficeName: "Galle",
        headOfficeID: "80000",
        latitude: 6.0535,
        longitude: 80.2210,
      },
      {
        postalCode: "80520",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Ahangama",
        headOfficeID: "80000",
        latitude: 5.9722,
        longitude: 80.3680,
      },
      {
        postalCode: "11500",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Negombo",
        headOfficeID: "00100",
        latitude: 7.2008,
        longitude: 79.8737,
      },
      {
        postalCode: "40000",
        postOfficeCategory: "HEAD_OFFICE",
        postOfficeName: "Anuradhapura",
        headOfficeID: "40000",
        latitude: 8.3114,
        longitude: 80.4037,
      },
      {
        postalCode: "10300",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Mount Lavinia",
        headOfficeID: "00100",
        latitude: 6.8319,
        longitude: 79.8641,
      },
      {
        postalCode: "11000",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Maharagama",
        headOfficeID: "00100",
        latitude: 6.8468,
        longitude: 79.9287,
      },
      {
        postalCode: "30600",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Kurunegala",
        headOfficeID: "30000",
        latitude: 7.4863,
        longitude: 80.3624,
      },
      {
        postalCode: "60100",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Matara",
        headOfficeID: "80000",
        latitude: 5.9485,
        longitude: 80.5353,
      },
      {
        postalCode: "41000",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Anuradhapura",
        headOfficeID: "40000",
        latitude: 8.3458,
        longitude: 80.3884,
      },
      {
        postalCode: "50100",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Batticaloa",
        headOfficeID: "50000",
        latitude: 7.7102,
        longitude: 81.6778,
      },
      {
        postalCode: "10640",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Kaduwela",
        headOfficeID: "50000",
        latitude: 6.9337,
        longitude: 79.9835,
      },
      // Adding the new post offices:
      {
        postalCode: "20850",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Akurana",
        headOfficeID: "20000",
        latitude: 7.3667,
        longitude: 80.6176,
      },
      {
        postalCode: "20400",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Peradeniya",
        headOfficeID: "20000",
        latitude: 7.2598,
        longitude: 80.5968,
      },
      {
        postalCode: "20500",
        postOfficeCategory: "HEAD_OFFICE",
        postOfficeName: "Gampola",
        headOfficeID: "20000",
        latitude: 7.1649,
        longitude: 80.5747,
      },
      {
        postalCode: "10370",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Mount Lavinia",
        headOfficeID: "00100",
        latitude: 6.8375,
        longitude: 79.8637,
      },
      {
        postalCode: "11640",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Ambatale",
        headOfficeID: "00100",
        latitude: 6.9369,
        longitude: 79.9695,
      },
      {
        postalCode: "10120",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Battaramulla",
        headOfficeID: "00100",
        latitude: 6.9189,
        longitude: 79.9282,
      },
      {
        postalCode: "80280",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Ginthota",
        headOfficeID: "80000",
        latitude: 6.0387,
        longitude: 80.2360,
      },
      {
        postalCode: "80142",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Opatha",
        headOfficeID: "80000",
        latitude: 6.0954,
        longitude: 80.2535,
      },
      {
        postalCode: "80650",
        postOfficeCategory: "SUB_OFFICE",
        postOfficeName: "Ahangama",
        headOfficeID: "80000",
        latitude: 5.9722,
        longitude: 80.3680,
      }
    ]
    
  });

  // Seed Employees
  await prisma.employee.createMany({
    data : [
      {
        employeeID: "0001",
        employeeName: "John Doe",
        email: "john.doe@gmail.com",
        telephone: "123456789",
        role: Role.POSTMASTER,
        postalCode: "00100",
        password: "password1",
      },
      {
        employeeID: "0002",
        employeeName: "Jane Smith",
        email: "jane.smith@gmail.com",
        telephone: "987654321",
        role: Role.POSTMAN,
        postalCode: "10640",
        password: "password2",
      },
      {
        employeeID: "0003",
        employeeName: "Jane Smith",
        email: "abc@gmail.com",
        telephone: "987654321",
        role: Role.SUPERVISOR,
        postalCode: "00100",
        password: "password3",
      },
      {
        employeeID: "0004",
        employeeName: "Jane Smith",
        email: "bcd@gmail.com",
        telephone: "987654321",
        role: Role.RECEPTIONIST,
        postalCode: "00100",
        password: "password4",
      },
      {
        employeeID: "0005",
        employeeName: "sahan Smith",
        email: "sahan@gmail.com",
        telephone: "987654321",
        role: Role.DISPATCHER,
        postalCode: "00100",
        password: "password5",
      },
      {
        employeeID: "0006",
        employeeName: "Sanuda",
        email: "sanuda@gmail.com",
        telephone: "987654321",
        role: Role.SUPERVISOR,
        postalCode: "10640",
        password: "password6",
      },
      {
        employeeID: "0007",
        employeeName: "Malith",
        email: "Malith@gmail.com",
        telephone: "987654321",
        role: Role.POSTMASTER,
        postalCode: "10640",
        password: "password7",
      },
      {
        employeeID: "0008",
        employeeName: "Sahan",
        email: "Sahan@gmail.com",
        telephone: "987654321",
        role: Role.RECEPTIONIST,
        postalCode: "10640",
        password: "password8",
      },
      {
        employeeID: "0009",
        employeeName: "Gamini",
        email: "sandli@gmail.com",
        telephone: "0769445455",
        role: Role.POSTMAN,
        postalCode: "10120",
        password: "password9",
      },
      {
        employeeID: "0010",
        employeeName: "Gamini",
        email: "sandlik@gmail.com",
        telephone: "0769445455",
        role: Role.POSTMAN,
        postalCode: "10640",
        password: "password10",
      },
      {
        employeeID: "0011",
        employeeName: "Sudath",
        email: "sudath@gmail.com",
        telephone: "0771234564",
        role: Role.POSTMAN,
        postalCode: "10640",
        password: "password11",
      },
      {
        employeeID: "0012",
        employeeName: "Namal",
        email: "namal@gmail.com",
        telephone: "0712344658",
        role: Role.POSTMAN,
        postalCode: "10640",
        password: "password12",
      },
      {
        employeeID: "0013",
        employeeName: "kamal",
        email: "kamal@gmail.com",
        telephone: "0712345655",
        role: Role.POSTMAN,
        postalCode: "10640",
        password: "password13",
      },
      {
        employeeID: "0014",
        employeeName: "Nuwan",
        email: "Nuwan@gmail.com",
        telephone: "0712345655",
        role: Role.POSTMASTER,
        postalCode: "20850",
        password: "password14",
      },
      {
        employeeID: "0015",
        employeeName: "Sunil",
        email: "Sunil@gmail.com",
        telephone: "0712345655",
        role: Role.SUPERVISOR,
        postalCode: "20850",
        password: "password14",
      },
      {
        employeeID: "0016",
        employeeName: "Saman",
        email: "Saman@gmail.com",
        telephone: "0712345655",
        role: Role.RECEPTIONIST,
        postalCode: "20850",
        password: "password14",
      },
    ]
    
  });

  // Seed Areas
  await prisma.area.createMany({
    data: [
      {
        areaID: 1,
        areaName: "Kaduwela-South",
        postalCode: "10640",
        employeeID: "0010",
      },
      {
        areaID: 2,
        areaName: "Kaduwela North",
        postalCode: "10640",
        employeeID: "0012",
      },
      {
        areaID: 3,
        areaName: "Kaduwela West",
        postalCode: "10640",
        employeeID: "0002",
      },
      {
        areaID: 4,
        areaName: "Kaduwela East",
        postalCode: "10640",
        employeeID: "0013",
      },
      {
        areaID: 5,
        areaName: "Colombo East",
        postalCode: "00100",
        employeeID: "0013",
      },
      
    ]
    
  });

  // Seed Addresses
  await prisma.address.createMany({
    data: [
      {
        addressID: 26,
        postalCode: "10640",
        addressNo: "123",
        streetName: "Jaya St",
        Locality: "Kaduwela",
        latitude: 6.932900155314793,
        longitude: 79.98257295440071,
        areaID: 1,
      },
      {
        addressID: 27,
        postalCode: "10640",
        addressNo: "124",
        streetName: "Wijaya St",
        Locality: "Kaduwela",
        latitude: 6.931829673826147,
        longitude: 79.98283733773043,
        areaID: 1,
      },
      {
        addressID: 28,
        postalCode: "10640",
        addressNo: "125",
        streetName: "3rd St",
        Locality: "Arangala",
        latitude: 6.926691701903446,
        longitude: 79.98007013891583,
        areaID: 1,
      },
      {
        addressID: 29,
        postalCode: "10640",
        addressNo: "126",
        streetName: "4th St",
        Locality: "Kaduwela North",
        latitude: 6.921379683015376,
        longitude: 79.9748551127648,
        areaID: 1,
      },
      {
        addressID: 30,
        postalCode: "10640",
        addressNo: "127",
        streetName: "5th St",
        Locality: "Kaduwela",
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
        streetName: "Daham Mw",
        Locality: "Kaduwela",
        latitude: 6.936511594394954,
        longitude: 79.97497555414972,
        areaID: 1,
      },
      {
        addressID: 33,
        postalCode: "10640",
        addressNo: "130",
        streetName: "8th Rd",
        Locality: "Kaduwela",
        latitude: 6.936982597575644,
        longitude: 79.97664553759417,
        areaID: 1,
      },
      {
        addressID: 34,
        postalCode: "10640",
        addressNo: "131",
        streetName: "9th Rd",
        Locality: "Talahena",
        latitude: 6.936934494539469,
        longitude: 79.98072335547656,
        areaID: 1,
      },
      {
        addressID: 35,
        postalCode: "10640",
        addressNo: "132",
        streetName: "Molpe Mw",
        Locality: "Kaduwla",
        latitude: 6.9359585237643095,
        longitude: 79.98390472475725,
        areaID: 1,
      },
      {
        addressID: 36,
        postalCode: "10640",
        addressNo: "132",
        streetName: "10th St",
        Locality: "Kadwela",
        latitude: 6.925986987017987,
        longitude: 79.97453528966999,
        areaID: 1,
      },
      {
        addressID: 37,
        postalCode: "00100",
        addressNo: "123",
        streetName: "Main St",
        Locality: "Colombo",
        latitude: 40.7128,
        longitude: -74.006,
        areaID: 5,
      },
      {
        addressID: 38,
        postalCode: "00100",
        addressNo: "123",
        streetName: "Opatha Mawatha",
        Locality: "Colombo6",
        latitude: 5.993564,
        longitude: 80.376049,
      },
      {
        addressID: 39,
        postalCode: "00100",
        addressNo: "123",
        streetName: "Bauddhaloka Rd",
        Locality: "Colombo5",
        latitude: 5.997070,
        longitude: 80.377324,
        areaID: 5,
      },
      // Newly added addresses without areaID
      {
        addressID: 40,
        postalCode: "00100",
        addressNo: "1",
        streetName: "D R Wijewardena Mw",
        Locality: "Colombo",
        latitude: 6.9322,
        longitude: 79.8572,
      },
      {
        addressID: 41,
        postalCode: "20000",
        addressNo: "10",
        streetName: "Temple St",
        Locality: "Kandy",
        latitude: 7.2931,
        longitude: 80.6413,
      },
      {
        addressID: 42,
        postalCode: "80000",
        addressNo: "20",
        streetName: "Wakwella Rd",
        Locality: "Galle",
        latitude: 6.0535,
        longitude: 80.2105,
      },
      {
        addressID: 43,
        postalCode: "20850",
        addressNo: "55",
        streetName: "Matale Rd",
        Locality: "Akurana",
        latitude: 7.3854,
        longitude: 80.5468,
      },
      {
        addressID: 44,
        postalCode: "20400",
        addressNo: "8",
        streetName: "Galaha Rd",
        Locality: "Peradeniya",
        latitude: 7.2567,
        longitude: 80.5946,
      },
      {
        addressID: 45,
        postalCode: "20850",
        addressNo: "15",
        streetName: "Nuwara Rd",
        Locality: "Akurana",
        latitude: 7.3858,
        longitude: 80.5472,
      },
      {
        addressID: 46,
        postalCode: "10370",
        addressNo: "12",
        streetName: "Hotel Rd",
        Locality: "Mount Lavinia",
        latitude: 6.8292,
        longitude: 79.8654,
      },
      {
        addressID: 47,
        postalCode: "11640",
        addressNo: "45",
        streetName: "Ambatale Rd",
        Locality: "Ambatale",
        latitude: 6.9396,
        longitude: 79.9435,
      },
      {
        addressID: 48,
        postalCode: "10120",
        addressNo: "440",
        streetName: "Dutugemunu Mw",
        Locality: "Battaramulla",
        latitude: 6.9061,
        longitude: 79.9393,
      },
      {
        addressID: 49,
        postalCode: "80280",
        addressNo: "33",
        streetName: "Galle Rd",
        Locality: "Ginthota",
        latitude: 6.0712,
        longitude: 80.2016,
      },
      {
        addressID: 50,
        postalCode: "80142",
        addressNo: "25",
        streetName: "Opatha Rd",
        Locality: "Opatha",
        latitude: 5.9937,
        longitude: 80.3762,
      },
      {
        addressID: 51,
        postalCode: "80650",
        addressNo: "10",
        streetName: "Matara Rd",
        Locality: "Ahangama",
        latitude: 6.0329,
        longitude: 80.3753,
      },
      {
        addressID: 52,
        postalCode: "10640",
        addressNo: "10",
        streetName: "Temple Rd",
        Locality: "Kaduwela",
        latitude: 6.945,
        longitude: 78.98390472475725,
        areaID: 2,
      },
      {
        addressID: 53,
        postalCode: "10640",
        addressNo: "68/5",
        streetName: "Temple Rd",
        Locality: "Kaduwela",
        latitude: 6.8646,
        longitude: 34.98390472475725,
        areaID: 3,
      },
      {
        addressID: 54,
        postalCode: "10640",
        addressNo: "81/7",
        streetName: "Flower Rd",
        Locality: "Kaduwela",
        latitude: 6.9359585237643095,
        longitude: 56.98390472475725,
        areaID: 3,
      },
    ]
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
        currentPostCode: "00100",
        bundleStatus: BundleStatus.DISTRIBUTED,
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
