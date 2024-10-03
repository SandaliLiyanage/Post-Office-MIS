import {AddressRepository} from "../repositeries/addressrepository"

const addressRepostiory = new AddressRepository;
class AddressService{
    async searchSuggestions(search: string):Promise<{ [key: string]: number}> {
        const hashMap: { [key: string]: number} = {}
        const res = await addressRepostiory.queryAddresses(search);
        const addressResult = res.map((address) => {
            const concString = `${address.addressNo? `${address.addressNo}, `: ""  } ${address.streetName? `${address.streetName}, `: ""  } ${address.Locality? `${address.Locality}, `: ""  } ${address.postalCode}`
            const addressID = address.addressID
            hashMap[concString] = addressID
        })
        
        // console.log(addressResult);
        // return(addressResult)
        return hashMap
    }
}

export default AddressService