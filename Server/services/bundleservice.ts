import { BundleRepository } from "../repositeries/bundlerepository";
import { AddressRepository } from "../repositeries/addressrepository";
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
                const bundleID = await bundleRepository.createBundle(10, destPostalCode, sourcePostalCode );
                console.log("this is the newly found bundle" , bundleID)
                return bundleID
            }
        }
        return "dest Postal Code not found"
    }
    }

export default BundleService 