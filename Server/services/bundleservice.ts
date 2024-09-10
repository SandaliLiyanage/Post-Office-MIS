import { BundleRepository } from "../repositeries/bundlerepository";
const bundleRepository = new BundleRepository();
class BundleService {
    async bundleValidation(destPostCode : string) : Promise <number> {
        const bundle = await bundleRepository.findBundle(destPostCode);
        return 1
    }
}

export default BundleService 