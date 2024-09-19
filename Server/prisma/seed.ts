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
  async function seedPostOffices() {
    await prisma.postOffice.createMany({
      data: [
        {
          postalCode: '00100',
          postOfficeCategory: 'HEAD_OFFICE',
          postOfficeName: 'Colombo Main',
          headOfficeID: '00100',
        },
        {
          postalCode: '20000',
          postOfficeCategory: 'HEAD_OFFICE',
          postOfficeName: 'Kandy',
          headOfficeID: '20000',
        },
        {
          postalCode: '10250',
          postOfficeCategory: 'SUB_OFFICE',
          postOfficeName: 'Nugegoda',
          headOfficeID: '00100',
        },
        {
          postalCode: '80000',
          postOfficeCategory: 'HEAD_OFFICE',
          postOfficeName: 'Galle',
          headOfficeID: '80000',
        },
        {
          postalCode: '11500',
          postOfficeCategory: 'SUB_OFFICE',
          postOfficeName: 'Negombo',
          headOfficeID: '00100',
        },
        {
          postalCode: '40000',
          postOfficeCategory: 'HEAD_OFFICE',
          postOfficeName: 'Jaffna',
          headOfficeID: '40000',
        },
        {
          postalCode: '10300',
          postOfficeCategory: 'SUB_OFFICE',
          postOfficeName: 'Mount Lavinia',
          headOfficeID: '00100',
        },
        {
          postalCode: '11000',
          postOfficeCategory: 'SUB_OFFICE',
          postOfficeName: 'Maharagama',
          headOfficeID: '00100',
        },
        {
          postalCode: '30600',
          postOfficeCategory: 'SUB_OFFICE',
          postOfficeName: 'Kurunegala',
          headOfficeID: '30000',
        },
        {
          postalCode: '60100',
          postOfficeCategory: 'SUB_OFFICE',
          postOfficeName: 'Matara',
          headOfficeID: '80000',
        },
        {
          postalCode: '41000',
          postOfficeCategory: 'SUB_OFFICE',
          postOfficeName: 'Anuradhapura',
          headOfficeID: '40000',
        },
        {
          postalCode: '50100',
          postOfficeCategory: 'SUB_OFFICE',
          postOfficeName: 'Batticaloa',
          headOfficeID: '50000',
        },
      ],
    });
  }
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
