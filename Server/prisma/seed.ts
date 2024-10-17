import {
  PrismaClient,
  Role,
  PostOfficeCategory,
  LeaveType,
  RequestStatus,
  MailStatus,
  MailType,
  BundleStatus,
  OTP,
} from "@prisma/client";
import BCryptService from "../services/cryptservice";

const prisma = new PrismaClient();
const cryptservice = new BCryptService();

async function main() {
  // Clear existing data
  await prisma.mail.deleteMany({});
  await prisma.bundle.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.area.deleteMany({});
  await prisma.leave.deleteMany({});
  await prisma.oTP.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.postOffice.deleteMany({});
  await prisma.oTP.deleteMany({});


  // Seed Post Offices
  await prisma.postOffice.createMany({
    data: [
      { postalCode: "00100", postOfficeCategory: "HEAD_OFFICE",  postOfficeName: "Colombo",       headOfficeID: "00100", latitude: 6.9271, longitude: 79.8612 },
      { postalCode: "20000", postOfficeCategory: "HEAD_OFFICE",  postOfficeName: "Kandy",         headOfficeID: "20000", latitude: 7.2906, longitude: 80.6337 },
      { postalCode: "10250", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Nugegoda",      headOfficeID: "00100", latitude: 6.8649, longitude: 79.8997 },
      { postalCode: "80000", postOfficeCategory: "HEAD_OFFICE",  postOfficeName: "Galle",         headOfficeID: "80000", latitude: 6.0535, longitude: 80.2210 },
      { postalCode: "80520", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Ahangama",      headOfficeID: "80000", latitude: 5.9722, longitude: 80.3680 },
      { postalCode: "11500", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Negombo",       headOfficeID: "00100", latitude: 7.2008, longitude: 79.8737 },
      { postalCode: "40000", postOfficeCategory: "HEAD_OFFICE",  postOfficeName: "Anuradhapura",  headOfficeID: "40000", latitude: 8.3114, longitude: 80.4037 },
      { postalCode: "10300", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Mount Lavinia", headOfficeID: "00100", latitude: 6.8319, longitude: 79.8641 },
      { postalCode: "11000", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Maharagama",    headOfficeID: "00100", latitude: 6.8468, longitude: 79.9287 },
      { postalCode: "30600", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Kurunegala",    headOfficeID: "30000", latitude: 7.4863, longitude: 80.3624 },
      { postalCode: "60100", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Matara",        headOfficeID: "80000", latitude: 5.9485, longitude: 80.5353 },
      { postalCode: "41000", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Anuradhapura",  headOfficeID: "40000", latitude: 8.3458, longitude: 80.3884 },
      { postalCode: "50100", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Batticaloa",    headOfficeID: "50000", latitude: 7.7102, longitude: 81.6778 },
      { postalCode: "10640", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Kaduwela",      headOfficeID: "50000", latitude: 6.9337, longitude: 79.9835 },
      { postalCode: "20850", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Akurana",       headOfficeID: "20000", latitude: 7.3667, longitude: 80.6176 },
      { postalCode: "20400", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Peradeniya",    headOfficeID: "20000", latitude: 7.2598, longitude: 80.5968 },
      { postalCode: "20500", postOfficeCategory: "HEAD_OFFICE",  postOfficeName: "Gampola",       headOfficeID: "20000", latitude: 7.1649, longitude: 80.5747 },
      { postalCode: "10370", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Mount Lavinia", headOfficeID: "00100", latitude: 6.8375, longitude: 79.8637 },
      { postalCode: "11640", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Ambatale",      headOfficeID: "00100", latitude: 6.9369, longitude: 79.9695 },
      { postalCode: "10120", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Battaramulla",  headOfficeID: "00100", latitude: 6.9189, longitude: 79.9282 },
      { postalCode: "80280", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Ginthota",      headOfficeID: "80000", latitude: 6.0387, longitude: 80.2360 },
      { postalCode: "80142", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Opatha",        headOfficeID: "80000", latitude: 6.0954, longitude: 80.2535 },
      { postalCode: "80650", postOfficeCategory: "SUB_OFFICE",   postOfficeName: "Ahangama",      headOfficeID: "80000", latitude: 5.9722, longitude: 80.3680 },
    ],
  });
 
  
  // Seed Employees
  const employeeCreate = async () => {
    const data = [
      { employeeID: "0001", employeeName: "John Doe",    email: "john.doe@gmail.com",   telephone: "123456789",  role: Role.POSTMASTER,   postalCode: "00100", password: "password1" },
      { employeeID: "0002", employeeName: "Jane Smith",  email: "jane.smith@gmail.com", telephone: "987654321",  role: Role.POSTMAN,      postalCode: "10640", password: "password2" },
      { employeeID: "0003", employeeName: "Jane Smith",  email: "abc@gmail.com",        telephone: "987654321",  role: Role.SUPERVISOR,   postalCode: "00100", password: "password3" },
      { employeeID: "0004", employeeName: "Jane Smith",  email: "bcd@gmail.com",        telephone: "987654321",  role: Role.RECEPTIONIST, postalCode: "00100", password: "password4" },
      { employeeID: "0005", employeeName: "sahan Smith", email: "sahan@gmail.com",      telephone: "987654321",  role: Role.DISPATCHER,   postalCode: "00100", password: "password5" },
      { employeeID: "0006", employeeName: "Sanuda",      email: "sanuda@gmail.com",     telephone: "987654321",  role: Role.SUPERVISOR,   postalCode: "10640", password: "password6" },
      { employeeID: "0007", employeeName: "Malith",      email: "Malith@gmail.com",     telephone: "987654321",  role: Role.POSTMASTER,   postalCode: "10640", password: "password7" },
      { employeeID: "0008", employeeName: "Sahan",       email: "Sahan@gmail.com",      telephone: "987654321",  role: Role.RECEPTIONIST, postalCode: "10640", password: "password8" },
      { employeeID: "0009", employeeName: "Gamini",      email: "sandli@gmail.com",     telephone: "0769445455", role: Role.POSTMAN,      postalCode: "10120", password: "password9" },
      { employeeID: "0010", employeeName: "Gamini",      email: "sandlik@gmail.com",    telephone: "0769445455", role: Role.POSTMAN,      postalCode: "10640", password: "password10" },
      { employeeID: "0011", employeeName: "Sudath",      email: "sudath@gmail.com",     telephone: "0771234564", role: Role.POSTMAN,      postalCode: "10640", password: "password11" },
      { employeeID: "0012", employeeName: "Namal",       email: "namal@gmail.com",      telephone: "0712344658", role: Role.POSTMAN,      postalCode: "10640", password: "password12" },
      { employeeID: "0013", employeeName: "kamal",       email: "kamal@gmail.com",      telephone: "0712345655", role: Role.POSTMAN,      postalCode: "10640", password: "password13" },
      { employeeID: "0014", employeeName: "Nuwan",       email: "Nuwan@gmail.com",      telephone: "0712345655", role: Role.POSTMASTER,   postalCode: "20850", password: "password14" },
      { employeeID: "0015", employeeName: "Sunil",       email: "Sunil@gmail.com",      telephone: "0712345655", role: Role.SUPERVISOR,   postalCode: "20850", password: "password13" },
      { employeeID: "0016", employeeName: "Saman",       email: "Saman@gmail.com",      telephone: "0712345655", role: Role.RECEPTIONIST, postalCode: "20850", password: "password16" },
    ];
    
    const hashedData = await Promise.all(
      data.map(async (employee) => {
        const hashedPassword = await cryptservice.hashPassword(
          employee.password
        ); // Call your hashing function
        return {
          ...employee,
          password: hashedPassword, // Replace the plain text password with the hashed one
        };
      })
    );
    await prisma.employee.createMany({
      data: hashedData,
    });
  };
  await employeeCreate();


  // Seed Areas
  await prisma.area.createMany({
    data: [
      { areaID: 1, areaName: "Kaduwela-South", postalCode: "10640", employeeID: "0010" },
      { areaID: 2, areaName: "Kaduwela North", postalCode: "10640", employeeID: "0012" },
      { areaID: 3, areaName: "Kaduwela West", postalCode: "10640", employeeID: "0002" },
      { areaID: 4, areaName: "Kaduwela East", postalCode: "10640", employeeID: "0013" },
      { areaID: 5, areaName: "Colombo East", postalCode: "00100", employeeID: "0014" },
    ],
  });


  // Seed Addresses
  await prisma.address.createMany({
    data: [
      { addressID: 26, postalCode: "10640", addressNo: "123", streetName: "Jaya St", Locality: "Kaduwela", latitude: 6.932900155314793, longitude: 79.98257295440071, areaID: 1, verified: true },
      { addressID: 27, postalCode: "10640", addressNo: "124", streetName: "Wijaya St", Locality: "Kaduwela", latitude: 6.931829673826147, longitude: 79.98283733773043, areaID: 1, verified: true },
      { addressID: 28, postalCode: "10640", addressNo: "125", streetName: "3rd St", Locality: "Arangala", latitude: 6.926691701903446, longitude: 79.98007013891583, areaID: 1, verified: true },
      { addressID: 29, postalCode: "10640", addressNo: "126", streetName: "4th St", Locality: "Kaduwela North", latitude: 6.921379683015376, longitude: 79.9748551127648, areaID: 1, verified: true },
      { addressID: 30, postalCode: "10640", addressNo: "127", streetName: "5th St", Locality: "Kaduwela", latitude: 6.92625283379399, longitude: 79.97224505313936, areaID: 1, verified: true },
      { addressID: 31, postalCode: "10640", addressNo: "128", streetName: "6th St", Locality: "Central City", latitude: 6.930090869184906, longitude: 79.97488263874345, areaID: 1, verified: true },
      { addressID: 32, postalCode: "10640", addressNo: "129", streetName: "Daham Mw", Locality: "Kaduwela", latitude: 6.936511594394954, longitude: 79.97497555414972, areaID: 1, verified: true },
      { addressID: 33, postalCode: "10640", addressNo: "130", streetName: "8th Rd", Locality: "Kaduwela", latitude: 6.936982597575644, longitude: 79.97664553759417, areaID: 1, verified: true },
      { addressID: 34, postalCode: "10640", addressNo: "131", streetName: "9th Rd", Locality: "Talahena", latitude: 6.936934494539469, longitude: 79.98072335547656, areaID: 1, verified: true },
      { addressID: 35, postalCode: "10640", addressNo: "132", streetName: "Molpe Mw", Locality: "Kaduwla", latitude: 6.9359585237643095, longitude: 79.98390472475725, areaID: 1, verified: true },
      { addressID: 36, postalCode: "10640", addressNo: "132", streetName: "10th St", Locality: "Kadwela", latitude: 6.925986987017987, longitude: 79.97453528966999, areaID: 1, verified: true },
      { addressID: 37, postalCode: "00100", addressNo: "123", streetName: "Main St", Locality: "Colombo", latitude: 40.7128, longitude: -74.006, areaID: 5, verified: true },
      { addressID: 38, postalCode: "00100", addressNo: "123", streetName: "Opatha Mawatha", Locality: "Colombo6", latitude: 5.993564, longitude: 80.376049, verified: true },
      { addressID: 39, postalCode: "00100", addressNo: "123", streetName: "Bauddhaloka Rd", Locality: "Colombo5", latitude: 5.99707, longitude: 80.377324, areaID: 5, verified: true },
      { addressID: 40, postalCode: "00100", addressNo: "1", streetName: "D R Wijewardena Mw", Locality: "Colombo", latitude: 6.9322, longitude: 79.8572, verified: true },
      { addressID: 41, postalCode: "20000", addressNo: "10", streetName: "Temple St", Locality: "Kandy", latitude: 7.2931, longitude: 80.6413, verified: true },
      { addressID: 42, postalCode: "80000", addressNo: "20", streetName: "Wakwella Rd", Locality: "Galle", latitude: 6.0535, longitude: 80.2105, verified: true },
      { addressID: 43, postalCode: "20850", addressNo: "55", streetName: "Matale Rd", Locality: "Akurana", latitude: 7.3854, longitude: 80.5468, verified: true },
      { addressID: 44, postalCode: "20400", addressNo: "8", streetName: "Galaha Rd", Locality: "Peradeniya", latitude: 7.2567, longitude: 80.5946, verified: true },
      { addressID: 45, postalCode: "20850", addressNo: "15", streetName: "Nuwara Rd", Locality: "Akurana", latitude: 7.3858, longitude: 80.5472, verified: true },
      { addressID: 46, postalCode: "10370", addressNo: "12", streetName: "Hotel Rd", Locality: "Mount Lavinia", latitude: 6.8292, longitude: 79.8654, verified: true },
      { addressID: 47, postalCode: "11640", addressNo: "45", streetName: "Ambatale Rd", Locality: "Ambatale", latitude: 6.9396, longitude: 79.9435, verified: true },
      { addressID: 48, postalCode: "10120", addressNo: "440", streetName: "Dutugemunu Mw", Locality: "Battaramulla", latitude: 6.9061, longitude: 79.9393, verified: true },
      { addressID: 49, postalCode: "80280", addressNo: "33", streetName: "Galle Rd", Locality: "Ginthota", latitude: 6.0712, longitude: 80.2016, verified: true },
      { addressID: 50, postalCode: "80142", addressNo: "25", streetName: "Opatha Rd", Locality: "Opatha", latitude: 5.9937, longitude: 80.3762, verified: true },
      { addressID: 51, postalCode: "80650", addressNo: "10", streetName: "Matara Rd", Locality: "Ahangama", latitude: 6.0329, longitude: 80.3753, verified: true },
      { addressID: 52, postalCode: "10640", addressNo: "10", streetName: "Temple Rd", Locality: "Kaduwela", latitude: 6.945, longitude: 78.98390472475725, areaID: 2, verified: true },
      { addressID: 53, postalCode: "10640", addressNo: "68/5", streetName: "Temple Rd", Locality: "Kaduwela", latitude: 6.8646, longitude: 34.98390472475725, areaID: 3, verified: true },
      { addressID: 54, postalCode: "10640", addressNo: "81/7", streetName: "Flower Rd", Locality: "Kaduwela", latitude: 6.9359585237643095, longitude: 56.98390472475725, areaID: 3, verified: true },
      { addressID: 55, postalCode: "10640", addressNo: "123", streetName: "Jaya St", Locality: "Kaduwela", latitude: 6.932900155314793, longitude: 79.98257295440071, areaID: 3, verified: false },
      { addressID: 56, postalCode: "10640", addressNo: "124", streetName: "Wijaya St", Locality: "Kaduwela", latitude: 6.931829673826147, longitude: 79.98283733773043, areaID: 3, verified: false },
      { addressID: 57, postalCode: "10640", addressNo: "123", streetName: "Jaya St", Locality: "Kaduwela", latitude: 6.932900155314793, longitude: 79.98257295440071, areaID: 3, verified: false },
      { addressID: 58, postalCode: "10640", addressNo: "124", streetName: "Wijaya St", Locality: "Kaduwela", latitude: 6.931829673826147, longitude: 79.98283733773043, areaID: 3, verified: false },
    ]
  });


  // Seed Transactions
  await prisma.transaction.createMany({
    data: [
      { transactionID: 3, customerName: "Alice Johnson", customerTelephone: "555123456", customerAddressID: 36, date: "2024-09-03T07:08:57.492Z", amount: 10.5, },
      { transactionID: 4, customerName: "Alice Johnson", customerTelephone: "555123456", customerAddressID: 36, date: "2024-08-03T07:08:57.492Z", amount: 10.5,},
    ],
  });


  // Seed Mail
  await prisma.mail.createMany({
    data: [
      { mailID: 1, recepientName: "Alice Johnson",     recepientAddressID: 26, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 0.5,   price: 65.0, mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 2, recepientName: "Bob Smith",          recepientAddressID: 27, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 13,    price: 110.0, mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 3, recepientName: "Charlie Brown",     recepientAddressID: 28, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 56,    price: 120,   mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 4, recepientName: "David Wilson",      recepientAddressID: 26, postalCode: "10640", transactionID: 4, mailType: MailType.NORMAL_MAIL, weight: 1.5,   price: 7.0,   mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 5, recepientName: "Emma Davis",        recepientAddressID: 27, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 200,   price: 120.0, mailstatus: MailStatus.DELIVERED },
      { mailID: 6, recepientName: "Frank Miller",      recepientAddressID: 28, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 100,   price: 45.0,  mailstatus: MailStatus.DELIVERED },
      { mailID: 7, recepientName: "Grace Lee",         recepientAddressID: 53, postalCode: "10640", transactionID: 4, mailType: MailType.NORMAL_MAIL, weight: 1.1,   price: 6.5,   mailstatus: MailStatus.DELIVERED },
      { mailID: 8, recepientName: "Henry Taylor",      recepientAddressID: 54, postalCode: "10640", transactionID: 4, mailType: MailType.NORMAL_MAIL, weight: 78,    price: 65.0,  mailstatus: MailStatus.DELIVERED },
      { mailID: 9, recepientName: "Irene Thomas",      recepientAddressID: 52, postalCode: "10640", transactionID: 4, mailType: MailType.COURIER,      weight: 92.0,  price: 5.2,   mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 10, recepientName: "Jack White",       recepientAddressID: 32, postalCode: "10640", transactionID: 4, mailType: MailType.COURIER,      weight: 200,   price: 92.0,  mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 11, recepientName: "Kathy Harris",     recepientAddressID: 33, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 56,    price: 65.0,  mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 12, recepientName: "Liam Clark",       recepientAddressID: 34, postalCode: "10640", transactionID: 4, mailType: MailType.REGISTERED_MAIL, weight: 40,   price: 57.0,  mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 13, recepientName: "Mia Robinson",     recepientAddressID: 35, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 34,    price: 82.0,  mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 14, recepientName: "Noah Jackson",     recepientAddressID: 52, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 68,    price: 45.0,  mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 15, recepientName: "Bob Williams",     recepientAddressID: 26, postalCode: "10640", transactionID: 4, mailType: MailType.NORMAL_MAIL, weight: 20,    price: 30.0,  mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 16, recepientName: "Bob Williams",     recepientAddressID: 27, postalCode: "10640", transactionID: 4, mailType: MailType.NORMAL_MAIL, weight: 20,    price: 30.0,  mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 17, recepientName: "Bob Williams",     recepientAddressID: 28, postalCode: "10640", transactionID: 4, mailType: MailType.COURIER,      weight: 2000,  price: 400.0, mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 18, recepientName: "Bob Williams",     recepientAddressID: 29, postalCode: "10640", transactionID: 4, mailType: MailType.NORMAL_MAIL, weight: 80,    price: 100.0, mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 19, recepientName: "Bob Williams",     recepientAddressID: 30, postalCode: "10640", transactionID: 3, mailType: MailType.REGISTERED_MAIL, weight: 82, price: 35.0,  mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 20, recepientName: "Bob Williams",     recepientAddressID: 31, postalCode: "10640", transactionID: 4, mailType: MailType.REGISTERED_MAIL, weight: 50,   price: 100.0, mailstatus: MailStatus.DELIVERED },
      { mailID: 21, recepientName: "Bob Williams",     recepientAddressID: 32, postalCode: "10640", transactionID: 4, mailType: MailType.REGISTERED_MAIL, weight: 300.0, price: 1000.0, mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 22, recepientName: "Bob Williams",     recepientAddressID: 33, postalCode: "10640", transactionID: 4, mailType: MailType.REGISTERED_MAIL, weight: 400,   price: 300.0, mailstatus: MailStatus.DELIVERED },
      { mailID: 23, recepientName: "Bob Williams",     recepientAddressID: 34, postalCode: "10640", transactionID: 3, mailType: MailType.COURIER,      weight: 2000,  price: 1000.0, mailstatus: MailStatus.DELIVERED },
      { mailID: 24, recepientName: "Bob Williams",     recepientAddressID: 35, postalCode: "10640", transactionID: 4, mailType: MailType.COURIER,      weight: 800,   price: 950.0, mailstatus: MailStatus.DELIVERED },
      { mailID: 25, recepientName: "Bob Williams",     recepientAddressID: 29, postalCode: "10640", transactionID: 4, mailType: MailType.NORMAL_MAIL, weight: 45,   price: 120.0, mailstatus: MailStatus.DELIVERED },
      { mailID: 26, recepientName: "Bob Williams",     recepientAddressID: 35, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 1.2, price: 6.0,   mailstatus: MailStatus.DELIVERED },
      { mailID: 27, recepientName: "Bob Williams",     recepientAddressID: 32, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 200,   price: 92.0,  mailstatus: MailStatus.IN_TRANSIT },
      { mailID: 28, recepientName: "Bob Williams",     recepientAddressID: 36, postalCode: "10640", transactionID: 3, mailType: MailType.NORMAL_MAIL, weight: 1.2, price: 6.0, mailstatus: MailStatus.DELIVERED,
      },
    ],
  });


  // Seed Leaves
  await prisma.leave.createMany({
    data: [
      { employeeID: "0003", leaveType: LeaveType.FULL_DAY, startDate: new Date("2024-09-10"), endDate: new Date("2024-09-11"), description: "Annual Leave", RequestStatus: RequestStatus.PENDING, requstedDate: new Date("2024-09-03"), },
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
