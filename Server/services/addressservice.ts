import {AddressRepository} from "../repositeries/addressrepository"

const addressRepostiory = new AddressRepository;
class AddressService{
    async searchSuggestions(search: string):Promise<string[]> {
        const res = await addressRepostiory.queryAddresses(search);
        const concString = res.map((address) => {
            return `${address.addressNo? `${address.addressNo}, `: ""  } ${address.streetName? `${address.streetName}, `: ""  } ${address.Locality? `${address.Locality}, `: ""  } ${address.postalCode}`
        })
        console.log(concString);
        return(concString)
    }
}

export default AddressService