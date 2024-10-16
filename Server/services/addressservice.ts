import {AddressRepository} from "../repositeries/addressrepository"

class AddressService{
    private addressRepository: AddressRepository;
    constructor(addressRepository: AddressRepository){
        this.addressRepository = addressRepository;
    }
    async searchSuggestions(search: string):Promise<{ [key: string]: number}> {
        const hashMap: { [key: string]: number} = {}
        const res = await this.addressRepository.queryAddresses(search);
        if(res){
        res.forEach((address) => {
            const concString = `${address.addressNo? `${address.addressNo}, `: ""  } ${address.streetName? `${address.streetName}, `: ""  } ${address.Locality? `${address.Locality}, `: ""  } ${address.postalCode}`
            const addressID = address.addressID
            hashMap[concString] = addressID
        })}
        return hashMap
    }
    async addAddress(addressNo: string, streetName: string, Locality: string, postalCode: string):Promise<boolean>{
        const res = await this.addressRepository.addAddress(addressNo, streetName, Locality, postalCode);
        console.log("In the address service", res)
        return res
    }
}
export default AddressService