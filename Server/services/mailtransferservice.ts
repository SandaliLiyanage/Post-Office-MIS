import { BundleRepository } from "../repositeries/bundlerepository";
import { AddressRepository } from "../repositeries/addressrepository";
import PostOfficeRepository from "../repositeries/postofficerepository";

class MailTransferService {
  private postOfficeRepository: PostOfficeRepository;
  private bundleRepository: BundleRepository;
  private addressRepository: AddressRepository;
  constructor(postOfficeRepository: PostOfficeRepository, bundleRepository: BundleRepository, addressRepository: AddressRepository) {
    this.postOfficeRepository = postOfficeRepository;
    this.bundleRepository = bundleRepository;
    this.addressRepository = addressRepository
  }
  async bundleValidation(
    addressID: number,
    sourcePostalCode: string
  ): Promise<number | string | null> {
    console.log("in bundle validation");
    const destPostalCode = await this.addressRepository.getDestPostalCode(addressID);
    if (destPostalCode) {
      const bundle = await this.bundleRepository.findBundle(
        destPostalCode,
        sourcePostalCode
      );
      if (bundle?.length != 0 && bundle) {
        console.log("bundle found");
        for (const element of bundle) {
          console.log("element", element);
          console.log(
            " this is the dest post code of the bundle",
            element.bundleID
          );
          if (element.destPostalCode == destPostalCode) {
            console.log(" this is the destination postal code", destPostalCode);
            const bundleID = element.bundleID;
            console.log("yhh bundle found");
            return bundleID;
          }
        }
      } else if (destPostalCode == sourcePostalCode) {
        return null;
      } else {
        console.log("bundle not found. creating a new bundle");
        const bundleRoute = await this.bundleRouteCreation(
          destPostalCode,
          sourcePostalCode
        );
        const bundleID = await this.bundleRepository.createBundle(
          destPostalCode,
          sourcePostalCode,
          bundleRoute
        );
        console.log("this is the newly found bundle", bundleID);
        return bundleID;
      }
    }
    return "dest Postal Code not found";
  }

  async bundleRouteCreation(destPostalCode: string, sourcePostalCode: string) {
    const sourceHeadOffice = await this.postOfficeRepository.getHeadOffice(
      sourcePostalCode
    );
    const destHeadOffice = await this.postOfficeRepository.getHeadOffice(
      destPostalCode
    );
    let bundleRoute: string[] = [sourcePostalCode];
    if (sourceHeadOffice && destHeadOffice) {
      if (sourcePostalCode === destPostalCode) {
        return bundleRoute;
      }

      if (sourceHeadOffice !== sourcePostalCode) {
        bundleRoute.push(sourceHeadOffice);
      }

      if (destHeadOffice !== sourceHeadOffice) {
        bundleRoute.push(destHeadOffice);
      }

      if (destPostalCode !== destHeadOffice) {
        bundleRoute.push(destPostalCode);
      }

      return bundleRoute;
    }

    return bundleRoute;
  }

  async getCreatedBundles(postalCode: string) {
    const bundles = await this.bundleRepository.getCreatedBundles(postalCode);
    let routeNameArray: string[] = [];
    if (bundles) {
      for (const bundle of bundles) {
        const destPostalName = await this.postOfficeRepository.getPostOfficeName(
          bundle.destPostalCode
        );
        for (const code of bundle.route) {
          const postalName = await this.postOfficeRepository.getPostOfficeName(code);
          if (postalName) {
            routeNameArray.push(`${postalName.postOfficeName}`);
          }
        }
        bundle.destPostalCode = `${destPostalName?.postOfficeName}`;
        bundle.route = routeNameArray;
        routeNameArray = [];
      }

      return bundles;
    }
  }

  async getDeliveryBundles(postalCode: string) {
    const bundles = await this.bundleRepository.getDeliveryBundles(postalCode);
    let routeNameArray: string[] = [];
    if (bundles) {
      for (const bundle of bundles) {
        const destPostalName = await this.postOfficeRepository.getPostOfficeName(
          bundle.destPostalCode
        );
        for (const code of bundle.route) {
          const postalName = await this.postOfficeRepository.getPostOfficeName(code);
          if (postalName) {
            routeNameArray.push(`${postalName.postOfficeName}`);
          }
        }
        bundle.destPostalCode = `${destPostalName?.postOfficeName}`;
        bundle.route = routeNameArray;
        routeNameArray = [];
      }

      return bundles;
    }
  }

  async updateStatus(bundleID: number) {
    const res = await this.bundleRepository.updateBundle(bundleID);
    return res;
  }
}

export default MailTransferService;
