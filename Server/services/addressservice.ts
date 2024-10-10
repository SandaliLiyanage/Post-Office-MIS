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
}
export default AddressService