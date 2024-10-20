import { Prisma, PrismaClient, Bundle, BundleStatus } from "@prisma/client";
import { PrismaSingleton } from "./prismasingleton";

class BundleRepository {
  private prisma = PrismaSingleton.getInstance();
  constructor() {
    this.prisma = PrismaSingleton.getInstance();
  }
  async getCreatedBundles(postalCode: string): Promise<Bundle[] | null> {
    console.log("get bundles", postalCode);
    if (postalCode) {
      try {
        const res = await this.prisma.bundle.findMany({
          where: {
            currentPostCode: postalCode,
            bundleStatus: BundleStatus.CREATED,
          },
          include: {
            mail: true,
          },
        });
        console.log("Bundles queried", res);
        return res;
      } catch (error) {
        console.error("Error getting bundles:", error);
        throw error;
      }
    }
    return null;
  }

  async getDeliveryBundles(postalCode: string): Promise<Bundle[] | null> {
    console.log("get bundles in delivery", postalCode);
    if (postalCode) {
      try {
        const res = await this.prisma.bundle.findMany({
          where: {
            destPostalCode: postalCode,
            bundleStatus: BundleStatus.ARRIVED,
            currentPostCode: postalCode,
          },
        });
        console.log("Bundles queried", res);
        return res;
      } catch (error) {
        console.error("Error getting bundles:", error);
        throw error;
      }
    }
    return null;
  }

  async getArrivedBundles(employeeID: string): Promise<Bundle[] | null> {
    console.log("get bundles", employeeID);
    if (employeeID) {
      try {
        // First, fetch the employee's postal code using the employeeID
        const employee = await this.prisma.employee.findUnique({
          where: {
            employeeID: employeeID,
          },
          select: {
            postalCode: true, // Select only the postal code
          },
        });

        if (!employee || !employee.postalCode) {
          console.log("No postal code found for employee");
          return null;
        }

        // Then, fetch the bundles where the bundle status is ARRIVED and the current postal code matches the employee's postal code
        const res = await this.prisma.bundle.findMany({
          where: {
            currentPostCode: employee.postalCode, // Match the postal code of the employee
            bundleStatus: BundleStatus.ARRIVED, // Bundle status is ARRIVED
          },
        });
        console.log("Arrived Bundles List:", res);
        return res;
      } catch (error) {
        console.error("Error getting bundles:", error);
        throw error;
      }
    }
    return null;
  }

  async getCreatedBundles2(employeeID: string): Promise<Bundle[] | null> {
    console.log("get bundles", employeeID);
    if (employeeID) {
      try {
        // First, fetch the employee's postal code using the employeeID
        const employee = await this.prisma.employee.findUnique({
          where: {
            employeeID: employeeID,
          },
          select: {
            postalCode: true, // Select only the postal code
          },
        });

        if (!employee || !employee.postalCode) {
          console.log("No postal code found for employee");
          return null;
        }

        // Then, fetch the bundles where the bundle status is CREATED and the current postal code matches the employee's postal code
        const res = await this.prisma.bundle.findMany({
          where: {
            currentPostCode: employee.postalCode, // Match the postal code of the employee
            bundleStatus: BundleStatus.CREATED, // Bundle status is CREATED
          },
        });
        console.log("Created Bundles List:", res);
        return res;
      } catch (error) {
        console.error("Error getting bundles:", error);
        throw error;
      }
    }
    return null;
  }

  async getDispatchedBundles(employeeID: string): Promise<Bundle[] | null> {
    console.log("get bundles", employeeID);
    if (employeeID) {
      try {
        // First, fetch the employee's postal code using the employeeID
        const employee = await this.prisma.employee.findUnique({
          where: {
            employeeID: employeeID,
          },
          select: {
            postalCode: true, // Select only the postal code
          },
        });

        if (!employee || !employee.postalCode) {
          console.log("No postal code found for employee");
          return null;
        }

        // Then, fetch the bundles where the bundle status is ARRIVED and the current postal code matches the employee's postal code
        const res = await this.prisma.bundle.findMany({
          where: {
            currentPostCode: employee.postalCode, // Match the postal code of the employee
            bundleStatus: BundleStatus.DISPATCHED, // Bundle status is ARRIVED
          },
        });
        console.log("Dispatched Bundles List:", res);
        return res;
      } catch (error) {
        console.error("Error getting bundles:", error);
        throw error;
      }
    }
    return null;
  }

  async getDistributedBundles(employeeID: string): Promise<Bundle[] | null> {
    console.log("get bundles", employeeID);
    if (employeeID) {
      try {
        // First, fetch the employee's postal code using the employeeID
        const employee = await this.prisma.employee.findUnique({
          where: {
            employeeID: employeeID,
          },
          select: {
            postalCode: true, // Select only the postal code
          },
        });

        if (!employee || !employee.postalCode) {
          console.log("No postal code found for employee");
          return null;
        }

        // Then, fetch the bundles where the bundle status is ARRIVED and the current postal code matches the employee's postal code
        const res = await this.prisma.bundle.findMany({
          where: {
            currentPostCode: employee.postalCode, // Match the postal code of the employee
            bundleStatus: BundleStatus.DISTRIBUTED, // Bundle status is ARRIVED
          },
        });
        console.log("Distributed Bundles List:", res);
        return res;
      } catch (error) {
        console.error("Error getting bundles:", error);
        throw error;
      }
    }
    return null;
  }

  async findBundle(
    postalCode: string,
    sourcePostalCode: string
  ): Promise<Bundle[]> {
    console.log("in find bundle");
    console.log(sourcePostalCode, "source");
    try {
      const res = await this.prisma.bundle.findMany({
        where: {
          destPostalCode: postalCode,
          currentPostCode: sourcePostalCode,
        },
      });
      console.log("bundle found", res);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async findBundle2(bundleID: number): Promise<Bundle[]> {
    console.log("in find bundle");
    try {
      const res = await this.prisma.bundle.findUnique({
        where: {
          bundleID: bundleID,
        },
      });
      console.log("bundle found", res);
      return res ? [res] : [];
    } catch (error) {
      throw error;
    }
  }

  async createBundle(
    destPostalCode: string,
    sourcePostalCode: string,
    bundleRoute: string[]
  ): Promise<number | null> {
    console.log("in create bundle");
    try {
      const res = await this.prisma.bundle.create({
        data: {
          destPostalCode: destPostalCode,
          currentPostCode: sourcePostalCode,
          route: bundleRoute,
          date: new Date(),
          bundleStatus: BundleStatus.CREATED,
        },
      });
      console.log("bundle created", res);
      return res.bundleID;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateBundle(bundleID: number) {
    console.log("in create bundle");
    try {
      const res = await this.prisma.bundle.update({
        where: { bundleID: bundleID },
        data: { bundleStatus: BundleStatus.DISTRIBUTED },
      });
      console.log("bundle created", res);
      return res.bundleID;
    } catch (error) {
      return null;
    }
  }

  updateBundleStatus = async (bundleID: number, newStatus: BundleStatus) => {
    return await this.prisma.bundle.update({
      where: { bundleID },
      data: { bundleStatus: newStatus },
    });
  };

  updateAsArrived = async (bundleID: number, newStatus: BundleStatus) => {
    try {
      // Retrieve the current route and currentPostCode of the bundle
      const bundle = await this.prisma.bundle.findUnique({
        where: { bundleID },
        select: {
          currentPostCode: true,
          route: true, // Assuming route is stored as an array of postcodes
        },
      });

      if (!bundle) {
        throw new Error("Bundle not found");
      }

      const { currentPostCode, route } = bundle;

      // Find the index of the currentPostCode in the route array
      const currentIndex = route.indexOf(currentPostCode);

      // Get the next postcode in the route, if available
      const nextPostCode =
        currentIndex !== -1 && currentIndex < route.length - 1
          ? route[currentIndex + 1]
          : currentPostCode; // If no next post code, keep the current one

      // Update the bundle's status and currentPostCode
      return await this.prisma.bundle.update({
        where: { bundleID },
        data: {
          bundleStatus: newStatus,
          currentPostCode: nextPostCode, // Set the next post code in the route
        },
      });
    } catch (error) {
      console.error("Error updating bundle:", error);
      throw new Error("Failed to update bundle");
    }
  };
}
export { BundleRepository };
