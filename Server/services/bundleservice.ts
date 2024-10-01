import { BundleRepository } from "../repositeries/bundlerepository";
import { AddressRepository } from "../repositeries/addressrepository";
import PostOfficeRepository from "../repositeries/postofficerepository";

const postOfficeRepository = new PostOfficeRepository();
const bundleRepository = new BundleRepository();
const addressrepository = new AddressRepository();
class BundleService {
    async bundleValidation(addressID: number, sourcePostalCode: string) : Promise <number| string | null> {
        console.log("in bundle validation")
        const destPostalCode = await addressrepository.getDestPostalCode(addressID);
        if(destPostalCode){
            const bundle = await bundleRepository.findBundle(destPostalCode);
            if(bundle?.length != 0 && bundle){
                console.log("bundle found");
                for (const element of bundle) {
                    console.log("element" , element)
                    console.log(" this is the dest post code of the bundle", element.bundleID)
                    if(element.destPostalCode == destPostalCode){
                        console.log(" this is the destination postal code", destPostalCode)
                        const bundleID = element.bundleID
                        console.log("yhh bundle found")
                        return bundleID
                    }
                };
                
            }else{
                console.log("bundle not found. creating a new bundle")
                const bundleRoute = await this.bundleRouteCreation( destPostalCode, sourcePostalCode)
                const bundleID = await bundleRepository.createBundle(destPostalCode, sourcePostalCode, bundleRoute );
                console.log("this is the newly found bundle" , bundleID)
                return bundleID
            }
        }
        return "dest Postal Code not found"
    }

    async bundleRouteCreation(destPostalCode: string, sourcePostalCode: string){

            const sourceHeadOffice = await postOfficeRepository.getHeadOffice(sourcePostalCode);
            const destHeadOffice = await postOfficeRepository.getHeadOffice(destPostalCode);
            let bundleRoute:string[] = [sourcePostalCode]
            if (sourceHeadOffice && destHeadOffice) {
                if (sourcePostalCode === destPostalCode) {
                  return bundleRoute;
                }
              
                if (sourceHeadOffice !== sourcePostalCode) {
                  bundleRoute.push(sourceHeadOffice);
                }
              
                if (destHeadOffice !== destPostalCode) {
                  bundleRoute.push(destHeadOffice); 
                }
              
                if (destPostalCode !== destHeadOffice) {
                  bundleRoute.push(destPostalCode);
                }
              
                return bundleRoute;
              }
        
          return bundleRoute
    }

    async getCreatedBundles(postalCode: string){
        const bundles = await bundleRepository.getCreatedBundles(postalCode)
        let routeNameArray: string[] = []
        if(bundles){
            for(const bundle of bundles){
                const destPostalName = await postOfficeRepository.getPostOfficeName(bundle.destPostalCode)
                for(const code of bundle.route){
                    const postalName = await postOfficeRepository.getPostOfficeName(code)
                    if(postalName){
                        routeNameArray.push(`${postalName.postOfficeName}`)
    
                    }
                }
                bundle.destPostalCode = `${destPostalName?.postOfficeName}`
                bundle.route = routeNameArray
                routeNameArray = []
            }
            
            return bundles
        }
     
    }

    async getDeliveryBundles(postalCode: string){
        const bundles = await bundleRepository.getDeliveryBundles(postalCode)
        let routeNameArray: string[] = []
        if(bundles){
            for(const bundle of bundles){
                const destPostalName = await postOfficeRepository.getPostOfficeName(bundle.destPostalCode)
                for(const code of bundle.route){
                    const postalName = await postOfficeRepository.getPostOfficeName(code)
                    if(postalName){
                        routeNameArray.push(`${postalName.postOfficeName}`)
    
                    }
                }
                bundle.destPostalCode = `${destPostalName?.postOfficeName}`
                bundle.route = routeNameArray
                routeNameArray = []
            }
            
            return bundles
        }
     
    }

    async updateStatus(bundleID: number){
        const res = await bundleRepository.updateBundle(bundleID);
        return res
    }
}

export default BundleService 