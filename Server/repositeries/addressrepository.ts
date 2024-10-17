import { Prisma, PrismaClient, Address } from "@prisma/client";
import { error } from "console";
import { PrismaSingleton } from "./prismasingleton";

class AddressRepository {
  private prisma = PrismaSingleton.getInstance();
  constructor() {
    this.prisma = PrismaSingleton.getInstance();
  }

  async queryAddresses(search: string): Promise<Address[]> {
    try {
      const searchArray = search.split(",");
      const Array = searchArray.map((item) => `${item}${"%"}`);
      console.log(Array);
      console.log("in query", searchArray);
      const res = await this.prisma.$queryRaw<
        Address[]
      >`SELECT "addressID","postalCode","Locality","addressNo","streetName" FROM "Address"
                WHERE "addressNo" LIKE  ANY (array[${Array}])
                UNION
                SELECT "addressID","postalCode","Locality","addressNo","streetName" FROM "Address"
                WHERE "streetName" LIKE ANY (array[${Array}])
                UNION
                SELECT "addressID","postalCode","Locality","addressNo","streetName" FROM "Address"
                WHERE "postalCode" LIKE  ANY (array[${Array}])
                UNION
                SELECT "addressID","postalCode","Locality","addressNo","streetName" FROM "Address"
                WHERE "Locality" LIKE  ANY (array[${Array}])
                ;`;
      console.log("this is what was queried", res);

      return res || null;
    } catch (error) {
      console.log("unable to query", error);
      return [];
    }
  }
  async getAddress(addressID: number): Promise<string | null> {
    try {
      const res = await this.prisma.address.findUnique({
        where: {
          addressID: addressID,
        },
        select: {
          addressNo: true,
          streetName: true,
          Locality: true,
          postalCode: true,
        },
      });
      if (res) {
        const addressResult = `${res.addressNo ? `${res.addressNo}, ` : ""} ${
          res.streetName ? `${res.streetName}, ` : ""
        } ${res.Locality ? `${res.Locality}, ` : ""} ${res.postalCode}`;
        return addressResult;
      } else {
        return "";
      }
    } catch {
      console.error(error);
      return "";
    }
  }

  async getDestPostalCode(addressID: number): Promise<string | null> {
    try {
      const destPostalCode = await this.prisma.address.findUnique({
        where: {
          addressID: addressID,
        },
        select: {
          postalCode: true,
        },
      });
      return destPostalCode?.postalCode || null;
    } catch (error) {
      return null;
    }
  }

  async addAddress(
    addressNo: string,
    streetName: string,
    Locality: string,
    postalCode: string
  ): Promise<boolean> {
    try {
      const res = await this.prisma.address.create({
        data: {
          addressNo: addressNo,
          streetName: streetName,
          Locality: Locality,
          postalCode: postalCode,
          verified: false,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Get all unverified addresses for a given postman
  async getUnverifiedAddresses(employeeID: string): Promise<any[]> {
    try {
      const uniqueAddresses = await this.prisma.$queryRaw<any[]>`
        SELECT
            a."addressID", 
            a."addressNo",
            a."streetName",
            a."Locality",
            ar."areaName"
        FROM "Address" AS a
        JOIN "Area" AS ar ON a."areaID" = ar."areaID"
        JOIN "Employee" AS e ON ar."employeeID" = e."employeeID"
        WHERE e."employeeID" = ${employeeID}
        AND a."verified" = false
        ORDER BY a."addressNo"
      `;

      console.log("Unverified addresses fetched:", uniqueAddresses);
      return uniqueAddresses;
    } catch (error) {
      console.error("Error fetching unverified addresses:", error);
      throw error;
    }
  }
}
export { AddressRepository };
