import AddressService from '../../services/addressservice';
import { AddressRepository } from '../../repositeries/addressrepository';

// Mocking the AddressRepository
jest.mock('../../repositeries/addressrepository');

describe('searchSuggestions', () => {
    let addressService: AddressService;
    let mockRepository: AddressRepository;

    beforeEach(() => {
        // Create a mock of AddressRepository
        mockRepository = new AddressRepository();

        // Pass the mockRepository into the AddressService constructor
        addressService = new AddressService(mockRepository);
    });

    it('should return a hashmap of address strings to address IDs', async () => {
        // Mocking the queryAddresses method to return expected results
        mockRepository.queryAddresses = jest.fn().mockResolvedValue([
            { 
                addressNo: '123', 
                streetName: 'Main St', 
                Locality: 'Downtown', 
                postalCode: '12345', 
                addressID: 1, 
                latitude: null,     
                longitude: null,    
                areaID: null        
            },
            { 
                addressNo: '123', 
                streetName: 'Second St', 
                Locality: 'Uptown', 
                postalCode: '67890', 
                addressID: 2, 
                latitude: null,    
                longitude: null,    
                areaID: null        
            }
        ]);

        const result = await addressService.searchSuggestions('123');

        expect(result).toEqual({
            "123,  Main St,  Downtown,  12345": 1,
      "123,  Second St,  Uptown,  67890": 2,
        });
    });

    it('should handle addresses with missing fields', async () => {
        // Mocking queryAddresses with missing fields
        mockRepository.queryAddresses = jest.fn().mockResolvedValue([
            { 
                addressNo: '23', 
                streetName: 'Main St', 
                Locality: null, 
                postalCode: '12345', 
                addressID: 1, 
                latitude: null,    
                longitude: null,   
                areaID: null       
            }
        ]);

        const result = await addressService.searchSuggestions('Main');

        expect(result).toEqual({
            '23,  Main St,   12345': 1
        });
    });

    it('should return an empty hashmap if no addresses are found', async () => {
        // Mocking an empty result set
        mockRepository.queryAddresses = jest.fn().mockResolvedValue([]);

        const result = await addressService.searchSuggestions('Nonexistent');

        // Expect the result to be an empty object
        expect(result).toEqual({});
    });
});
