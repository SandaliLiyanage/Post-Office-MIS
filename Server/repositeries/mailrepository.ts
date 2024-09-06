import { PrismaClient } from "@prisma/client"; // Import your Prisma client

const prisma = new PrismaClient();

const getMailItemsByPostman = async (employeeID: number) => {
  try {
    // Fetch the sub-area IDs for the given postman
    const subAreas = await prisma.postman.findMany({
      where: {
        employeeID: employeeID,
      },
      select: {
        sub_area_id: true,
      },
    });
    const subAreaIds = subAreas.map((subArea) => subArea.sub_area_id);
    // Fetch the count of mail items for each category where the recipient address ID is in the sub-area of the relevant postman
    const mailCounts = await prisma.mail_item_category.findMany({
      select: {
        category_name: true,
        _count: {
          select: {
            mail_item: {
              where: {
                delivery: {
                  address: {
                    sub_area_id: {
                      in: subAreaIds,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return mailCounts;
  } catch (error) {
    console.error("Error fetching mail counts by postman:", error);
    throw error;
  }
};

export { getMailItemsByPostman };
